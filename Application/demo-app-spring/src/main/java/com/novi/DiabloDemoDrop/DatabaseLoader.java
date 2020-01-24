
package com.novi.DiabloDemoDrop;

import com.novi.DiabloDemoDrop.model.User;
import com.novi.DiabloDemoDrop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userrepository;

    public DatabaseLoader(UserRepository userrepository) {
        this.userrepository = userrepository;
    }

    @Override
    public void run(String... args) {

        // add users and roles
        addUserAndRole();
    }

    private void addUserAndRole() {
        
        String userName = "Administrator";
        String email = "demodropapp@gmail.com";
        //Password
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String secret = encoder.encode("NOVIFullStackDeveloper");
        
        //Create New Administrator User
        User administrator = new User(userName, email);
        User e = userrepository.findByEmail(email);
        if(e == null){
        administrator.setPassword(secret);
        administrator.setRole("administrator");
        userrepository.save(administrator);
        }
        else{
            System.out.println("Administrator already exists. id: "+userrepository.findByEmail(email).getId());
                }
    }
}