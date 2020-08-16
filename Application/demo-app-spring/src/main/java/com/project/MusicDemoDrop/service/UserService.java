
package com.project.MusicDemoDrop.service;

import org.springframework.stereotype.Service;

import com.project.MusicDemoDrop.utility.JavaMailUtil;

@Service
public class UserService {
    
    // Email confirmation for entering a new Demo.
    public void sendMailNotify(String email){
        try {
            JavaMailUtil.sendMail(email);
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
    
    public void sendWelcomeMail(String email, String name){
        try {
            JavaMailUtil.sendWelcomeMail(email,name);
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
    
    public void sendCommentMail(String email, String name, String demoname, String comment){
        try {
            JavaMailUtil.sendCommentMail(email,name, demoname, comment);
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
}
