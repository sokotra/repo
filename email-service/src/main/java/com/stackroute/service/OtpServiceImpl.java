package com.stackroute.service;

import com.stackroute.model.Email;
import com.stackroute.repository.EmailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService{

    @Autowired
    private EmailRepo emailRepo;

    @Override
    public boolean sendOtp(String emailId) {


        boolean flag = false;

        String from = "carentz70@gmail.com";
        String subject = "Otp Generated";

        Random random = new Random();
        int otp = random.nextInt(999999);

        Email email1 = new Email(emailId,otp);
        emailRepo.save(email1);

        String body = ""
                + "<div style='background-color: #CDD1E4;width: 50rem;margin-top:60px;text-align: center;margin-left: 100px;margin:15rm;height: 30rem;border-radius: 3rem;'>"
                + "<h1 style='color: teal; position: relative;margin: 0;left: 17rem;top: 3rem;'>CaRentz</h1>"
                + "<div style='background-color: #EAFFFD; text-align: center;margin-left:120px; margin-top:50px;width: 50%;padding: 5rem;position: relative;left: 20%;top: 30% ;border-radius: 3rem;'>"
                + "<h4 style='margin: 0;font-size: 15px;'>Hi,</h4>"
                + "<br> <br>"
                + "<h4 style='margin: 0;font-size: 15px;'>Please use the following OTP</h4>"
                + "<h1 style='color: blue; padding-left: 2rem;margin-left: 1rem'>" + otp + "</h1>"
                + "</div>"
                + "</div>";

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
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(emailId));

            //Subject
            mimeMessage.setSubject(subject);

            // Message text
            mimeMessage.setContent(body,"text/html");

            //Send the email
            Transport.send(mimeMessage);

            flag = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean verifyOtp(String emailId, int otp) {

        boolean flag = false;

        Email emailId_inRepo = emailRepo.findById(emailId).get();

        int otp_InRepo = emailId_inRepo.getOtp();

        if(otp_InRepo == otp){
            flag = true;
            emailRepo.deleteById(emailId);
        }
        else{
            flag = false;
        }
        return flag;
    }
}
