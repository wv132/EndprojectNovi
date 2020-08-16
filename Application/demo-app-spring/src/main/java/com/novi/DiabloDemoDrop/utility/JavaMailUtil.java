
package com.novi.DiabloDemoDrop.utility;

import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class JavaMailUtil {
    
    public static void sendMail(String recepient) throws Exception {
        System.out.println("Preparing to send email");
        Properties properties = new Properties();
     
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        
        //real account credentials not in public repository
        String myAccountEmail = "dummy";
        String password = "dummy";
                
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });       
        
        Message message = prepareMessage(session, myAccountEmail, recepient);
        
        Transport.send(message);
        System.out.println("Message sent successfully");
    }
    
    private static Message prepareMessage(Session session, String myAccountEmail, String recepient) {
        try {
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(myAccountEmail));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
        message.setSubject("New Demo Drop!!");
        
        String htmlCode = "<h1>New Demo Drop</h1> <br/> <h2><b>Hi team, check the new demo now!!</b></h2>"
                + " <br/> <a href=\"https://www.dondiablo.com/\" target=\"_blank\"><h2><b>Check Demo</b></h2></a>";
        
        message.setContent(htmlCode, "text/html");
        return message;
        } catch (Exception ex) {
            // ....
        }
        return null;
    }
    public static void sendWelcomeMail(String recepient, String name) throws Exception {
        System.out.println("Preparing to send email");
        Properties properties = new Properties();
     
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        
        
        String myAccountEmail = "demodropapp@gmail.com";
        String password = "aH5C$bK*9lK";
                
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });       
        
        Message message = prepareWelcomeMessage(session, myAccountEmail, recepient, name);
        
        Transport.send(message);
        System.out.println("Message sent successfully");
    }
    
    private static Message prepareWelcomeMessage(Session session, String myAccountEmail, String recepient, String name) {
        try {
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(myAccountEmail));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
        message.setSubject("Welcome " +name);
        
        String htmlCode = "<h1>Welcome</h1> <br/> <h2><b>Hi "+name+", Welcome to the Don Diablo Family</b></h2>"
                + " <br/> <a href=\"http://localhost:3000/login/\" target=\"_blank\"><h2><b>Go to Login</b></h2></a>";
        
        message.setContent(htmlCode, "text/html");
        return message;
        } catch (Exception ex) {
            // ....
        }
        return null;
    }
    
    public static void sendCommentMail(String recepient, String name, String demoname, String comment) throws Exception {
        System.out.println("Preparing to send email");
        Properties properties = new Properties();
     
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        
        
        String myAccountEmail = "demodropapp@gmail.com";
        String password = "aH5C$bK*9lK";
                
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });       
        
        Message message = prepareCommentMessage(session, myAccountEmail, recepient, name, demoname, comment);
        
        Transport.send(message);
        System.out.println("Message sent successfully");
    }
    
    private static Message prepareCommentMessage(Session session, String myAccountEmail, String recepient, String name, String demoname, String comment) {
        try {
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(myAccountEmail));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
        message.setSubject("Hi " +name+" there is a new comment on your file");
        
        String htmlCode = "<h1>Comment</h1> <br/> <h2><b>Hi "+name+", </b>You have send us a Demo: "+demoname +"<br></h2>"
                + "Here is wat we have to say about your Demo: "+comment+" <br/><br> Sincerly, <br> The Don Diablo Team";
        
        message.setContent(htmlCode, "text/html");
        return message;
        } catch (Exception ex) {
            // ....
        }
        return null;
    }
}
