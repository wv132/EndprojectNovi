
package com.novi.DiabloDemoDrop.service;

import com.novi.DiabloDemoDrop.utility.JavaMailUtil;

import org.springframework.stereotype.Service;

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
