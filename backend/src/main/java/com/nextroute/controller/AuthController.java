package com.nextroute.controller;

import com.nextroute.dto.AuthDTO.*;
import com.nextroute.model.User;
import com.nextroute.model.UserDevice;
import com.nextroute.repository.UserDeviceRepository;
import com.nextroute.repository.UserRepository;
import com.nextroute.service.NotificationService;
import com.nextroute.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final NotificationService notificationService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Value("${app.max-devices:3}")
    private int maxDevices;

    public AuthController(UserRepository userRepository, UserDeviceRepository userDeviceRepository, NotificationService notificationService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.notificationService = notificationService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name is required"));
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email is already registered"));
        }

        User user = new User(
            request.getName().trim(),
            request.getEmail().trim().toLowerCase(),
            encoder.encode(request.getPassword()),
            User.Role.USER
        );
        userRepository.save(user);

        String sessionId = UUID.randomUUID().toString();
        registerDeviceSession(user, sessionId, request.getFcmToken());

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getName(), user.getRole().name(), sessionId);

        UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, userInfo));
    }

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optUser = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (optUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        User user = optUser.get();

        if (!encoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        String sessionId = UUID.randomUUID().toString();
        registerDeviceSession(user, sessionId, request.getFcmToken());

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getName(), user.getRole().name(), sessionId);

        UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(token, userInfo));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "No token provided"));
        }

        try {
            String token = authHeader.substring(7);
            Long userId = jwtUtil.getUserId(token);
            String sessionId = jwtUtil.getSessionId(token);

            // Check if this session is still valid (not kicked out by another device)
            if (sessionId == null || !userDeviceRepository.existsBySessionId(sessionId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Session expired. You have been logged out because the device limit was reached."));
            }

            Optional<User> optUser = userRepository.findById(userId);

            if (optUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User not found"));
            }

            User user = optUser.get();
            UserInfo userInfo = new UserInfo(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid token"));
        }
    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String token = authHeader.substring(7);
            String sessionId = jwtUtil.getSessionId(token);
            if (sessionId != null) {
                userDeviceRepository.deleteBySessionId(sessionId);
            }
        } catch (Exception e) {
            // Token might be invalid, ignore
        }

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/session-check")
    public ResponseEntity<?> sessionCheck(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("valid", false, "error", "No token"));
        }
        try {
            String token = authHeader.substring(7);
            String sessionId = jwtUtil.getSessionId(token);
            if (sessionId != null && userDeviceRepository.existsBySessionId(sessionId)) {
                return ResponseEntity.ok(Map.of("valid", true));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("valid", false, "error", "Session expired. You have been logged out because the device limit was reached."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("valid", false, "error", "Invalid token"));
        }
    }

    private void registerDeviceSession(User user, String sessionId, String fcmToken) {
        List<UserDevice> activeDevices = userDeviceRepository.findByUserOrderByLastLoginAtAsc(user);

        if (activeDevices.size() >= maxDevices) {
            int devicesToRemove = activeDevices.size() - maxDevices + 1;
            for (int i = 0; i < devicesToRemove; i++) {
                UserDevice oldestDevice = activeDevices.get(i);
                // Try to send a push logout command if the device has an FCM token
                if (oldestDevice.getFcmToken() != null && !oldestDevice.getFcmToken().isEmpty()) {
                    notificationService.sendLogoutCommand(oldestDevice.getFcmToken());
                }
                userDeviceRepository.delete(oldestDevice);
            }
        }

        UserDevice newDevice = new UserDevice(user, sessionId);
        if (fcmToken != null && !fcmToken.trim().isEmpty()) {
            newDevice.setFcmToken(fcmToken);
        }
        userDeviceRepository.save(newDevice);
    }
}
