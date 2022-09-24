package com.stackroute.service;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
    @Override
    public boolean sendEmail(String to,String body) {

        boolean flag = false;

        String from = "carentz70@gmail.com";
        String subject = "CaRentz Booking Details";

        String removeQuotes = body.replace("\"", "");
        String removeBracket = removeQuotes.replace("}","");
        String[] bodyAttributes = removeBracket.split(",");

        body = "Hello, \n\nCongratulations!! Your Ride is successfully booked with CaRentz.\nPlease find your Booking details\n\n"+
                "Booking Id : " + bodyAttributes[0].split(":")[1]+ " " +
                "\nVehicle No. : " + bodyAttributes[2].split(":")[1] + " " +
                "\nFrom Date : " + bodyAttributes [3].split(":")[1] + " " +
                "\nTo Date : " + bodyAttributes[4].split(":")[1] + " " +
                "\nTotal fare : Rs. "  + bodyAttributes[5].split(":")[1]+"/-" ;

        String host = "smtp.gmail.com";

        //Get the system properties
        Properties properties = System.getProperties();

        //Setting the properties
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", true);
        properties.put("mail.smtp.auth", true);

        // Step 1. Get the session object
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, "alnrqtdkuterwquj");
            }
        });

        session.setDebug(true);

        // Compose the message

        MimeMessage mimeMessage = new MimeMessage(session);
        try {
            //from
            mimeMessage.setFrom(from);

            //to
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            //Subject
            mimeMessage.setSubject(subject);

            // Message text
            mimeMessage.setText(body);

            //Send the email
            Transport.send(mimeMessage);

            flag = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }
}
