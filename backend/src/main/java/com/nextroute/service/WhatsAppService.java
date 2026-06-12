package com.nextroute.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @Value("${twilio.whatsapp_number}")
    private String fromWhatsAppNumber;

    @PostConstruct
    public void init() {
        if (!"YOUR_ACCOUNT_SID".equals(accountSid) && accountSid != null) {
            Twilio.init(accountSid, authToken);
        }
    }

    public void sendBookingConfirmation(String toPhoneNumber, String bookingDetails) {
        if ("YOUR_ACCOUNT_SID".equals(accountSid) || accountSid == null) {
            System.out.println("[Mock WhatsApp Service] Skipped sending real message because Twilio keys are not configured.");
            System.out.println("Message intended for: " + toPhoneNumber + " -> " + bookingDetails);
            return;
        }

        try {
            // Twilio requires phone numbers to be in E.164 format and prefixed with "whatsapp:"
            String formattedToNumber = "whatsapp:" + (toPhoneNumber.startsWith("+") ? toPhoneNumber : "+" + toPhoneNumber);
            String formattedFromNumber = fromWhatsAppNumber.startsWith("whatsapp:") ? fromWhatsAppNumber : "whatsapp:" + fromWhatsAppNumber;
            
            Message message = Message.creator(
                    new PhoneNumber(formattedToNumber),
                    new PhoneNumber(formattedFromNumber),
                    bookingDetails
            ).create();

            System.out.println("WhatsApp message sent successfully. SID: " + message.getSid());
        } catch (Exception e) {
            System.err.println("Failed to send WhatsApp message: " + e.getMessage());
        }
    }
}
