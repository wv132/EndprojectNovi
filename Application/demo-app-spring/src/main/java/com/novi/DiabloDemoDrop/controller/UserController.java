/**
 * @author wouterverveer 
 */
package com.novi.DiabloDemoDrop.controller;

import com.novi.DiabloDemoDrop.model.User;
import com.novi.DiabloDemoDrop.repository.UserRepository;
import com.novi.DiabloDemoDrop.service.UserService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/user")
@RestController
public class UserController {

    private final UserRepository repo;
    private final UserService service;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    

    @Autowired
    public UserController(UserRepository repo, UserService service, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.repo = repo;
        this.service = service;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // CRUD methods here
    @GetMapping
    public List findAll(){
        return repo.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<User> findById(@PathVariable long id){
        return repo.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping(path = {"getrole/{name}"})
    public String getUserRole(@PathVariable("name") String userName){
        System.out.println(userName);
        User n = repo.findByName(userName);
        String userRole = n.getRole();
        return userRole;
    }
    
    
    
    @PostMapping
    public String create(@RequestBody User user,  BindingResult result){
        String newName = user.getName();
        User n = repo.findByName(newName);
        String newEmail = user.getEmail();
        User e = repo.findByEmail(newEmail);
        if (n == null && e == null){
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRole("producer");
            user.setFave(false);
            repo.save(user);
            service.sendWelcomeMail(newEmail, newName);
            return "Succesfull registration";
        }else if (n!= null){
            return "Name already exists!";
        }else if (e!= null){
            return "Email already exists!";
        }else{
            return "Registration NOT successfull";
        }
    }
    
    
    @PutMapping(path = {"/setinfo"})
    public List setAbout(@RequestParam("userName") String userName, @RequestParam("about") String about, @RequestParam("djName") String djName, @RequestParam("musicStyle") String musicStyle, @RequestParam("instagram") String instagram, @RequestParam("soundcloud") String soundcloud){
        User user = repo.findByName(userName);
            user.setAbout(about);
            user.setDjName(djName);
            user.setMusicStyle(musicStyle);
            user.setInstagram(instagram);
            user.setSoundcloud(soundcloud);
            repo.save(user);
            List<String> info = new ArrayList<>();
            info.add(user.getAbout());
            info.add(user.getDjName());
            info.add(user.getMusicStyle());
            info.add(user.getInstagram());
            info.add(user.getSouncloud());
            return info;
    }
    
    @PostMapping(path = {"/getinfo"})
    public List getAbout(@RequestParam("userName") String userName){
        User user = repo.findByName(userName);
            List<String> info = new ArrayList<>();
            info.add(user.getAbout());
            info.add(user.getDjName());
            info.add(user.getMusicStyle());
            info.add(user.getInstagram());
            info.add(user.getSouncloud());
            return info;
    }
    

    @PostMapping(path = {"/getfave"})
    public boolean getFavourite(@RequestParam("userName") String userName){
        User user = repo.findByName(userName);
        return user.getFave();
    }
    
    @PutMapping(value="/setfave")
    public ResponseEntity<User> deactive(@RequestParam("userName") String userName){
        
        Long idOfUser = repo.findByName(userName).getId();
        return repo.findById(idOfUser)
                .map(record -> {
                    if (record.getFave()){
                        record.setFave(false);
                    }else{
                        record.setFave(true);
                    }
                    User updated = repo.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }
    
    /*
    @PutMapping(path = {"/setfave"})
    public void setFavourite(@RequestParam("userName") String userName){
        User user = repo.findByName(userName);
        if (user.getFave()){
            user.setFave(false);
        }else{
            user.setFave(true);
        }
    } */

    @PostMapping(path = {"/login"})
    public boolean login(@RequestBody User user){
        User p = repo.findByName(user.getName());
        String hashedPassword = p.getPassword();
        if(p.isActive()){
            boolean result =  bCryptPasswordEncoder.matches(user.getPassword(), hashedPassword);
            return result;}
        return false;
    }
    /* Activate and deactivate User. 
    Set in the body of the API --> active: true or false 
    */
    @PutMapping(value="/active/{id}")
    public ResponseEntity<User> deactive(@PathVariable("id") long id,
                                          @RequestBody User user){
        return repo.findById(id)
                .map(record -> {
                    record.setActive(user.isActive());
                    User updated = repo.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
        
    }
    
    @PutMapping(value="/{id}")
    public ResponseEntity<User> update(@PathVariable("id") long id,
                                          @RequestBody User user){
        return repo.findById(id)
                .map(record -> {
                    record.setName(user.getName());                   
                    record.setEmail(user.getEmail());
                    record.setActive(user.isActive());
                    User updated = repo.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
        
    }
    
    @PutMapping(value="/role")
    public ResponseEntity<User> changeRole(@RequestParam("userName") String userName){
        User currentUser = repo.findByName(userName);
        Long currentUserId = currentUser.getId();
        return repo.findById(currentUserId)
                .map(record -> {
                    record.setRole("backoffice");
                    User updated = repo.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }
    
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        return repo.findById(id)
                .map(record -> {
                    repo.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
    

}