package com.nextroute.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account-file:}")
    private String serviceAccountPath;

    // For Railway/production: paste the entire JSON as an env var
    @Value("${FIREBASE_SERVICE_ACCOUNT_JSON:}")
    private String serviceAccountJson;

    private final ResourceLoader resourceLoader;

    public FirebaseConfig(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @PostConstruct
    public void initialize() {
        try {
            if (!FirebaseApp.getApps().isEmpty()) {
                return;
            }

            InputStream serviceAccount = null;

            // Priority 1: Use the JSON environment variable (for Railway/production)
            if (serviceAccountJson != null && !serviceAccountJson.trim().isEmpty()) {
                serviceAccount = new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8));
                System.out.println("Firebase: Using service account from FIREBASE_SERVICE_ACCOUNT_JSON env var.");
            }
            // Priority 2: Use the file path (for local development)
            else if (serviceAccountPath != null && !serviceAccountPath.trim().isEmpty()) {
                Resource resource = resourceLoader.getResource(serviceAccountPath);
                if (resource.exists()) {
                    serviceAccount = resource.getInputStream();
                    System.out.println("Firebase: Using service account from file: " + serviceAccountPath);
                }
            }

            if (serviceAccount == null) {
                System.err.println("Firebase: No service account found. Push notifications will be disabled.");
                System.err.println("  - Set FIREBASE_SERVICE_ACCOUNT_JSON env var (for production)");
                System.err.println("  - Or place firebase-service-account.json in src/main/resources/ (for local dev)");
                return;
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("Firebase Admin SDK initialized successfully.");

        } catch (Exception e) {
            System.err.println("Failed to initialize Firebase Admin SDK");
            e.printStackTrace();
        }
    }
}
