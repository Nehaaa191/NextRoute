package com.nextroute.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.nextroute.model.User;
import com.nextroute.model.UserDevice;
import com.nextroute.repository.UserDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final UserDeviceRepository userDeviceRepository;

    public NotificationService(UserDeviceRepository userDeviceRepository) {
        this.userDeviceRepository = userDeviceRepository;
    }

    public void sendNotificationToUser(User user, String title, String body) {
        List<UserDevice> devices = userDeviceRepository.findByUserOrderByLastLoginAtAsc(user);
        if (devices.isEmpty()) {
            return;
        }

        for (UserDevice device : devices) {
            try {
                Message message = Message.builder()
                        .setToken(device.getFcmToken())
                        .setNotification(Notification.builder()
                                .setTitle(title)
                                .setBody(body)
                                .build())
                        .build();

                String response = FirebaseMessaging.getInstance().send(message);
                System.out.println("Successfully sent message: " + response);
            } catch (Exception e) {
                System.err.println("Error sending FCM message to token: " + device.getFcmToken());
                e.printStackTrace();
            }
        }
    }

    public void sendLogoutCommand(String fcmToken) {
        try {
            Message message = Message.builder()
                    .setToken(fcmToken)
                    .putData("action", "LOGOUT")
                    .build();

            FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent LOGOUT command to token: " + fcmToken);
        } catch (Exception e) {
            System.err.println("Error sending LOGOUT command to token: " + fcmToken);
            e.printStackTrace();
        }
    }
}
