
package com.novi.DiabloDemoDrop.controller;

import com.novi.DiabloDemoDrop.model.Comment;
import com.novi.DiabloDemoDrop.model.FileModel;
import com.novi.DiabloDemoDrop.model.User;
import com.novi.DiabloDemoDrop.repository.CommentRepository;
import com.novi.DiabloDemoDrop.repository.FileRepository;
import com.novi.DiabloDemoDrop.repository.UserRepository;
import com.novi.DiabloDemoDrop.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommentController {
    
    //Directs to the CommentRepository to use the CRUD from Jpa
    @Autowired
    CommentRepository repo;
   
    @Autowired
    UserRepository userRepo;
    
    @Autowired
    FileRepository fileRepo;
    
    @Autowired
    UserService service;
   
    //CRUD
    @GetMapping(path = {"/all"})
    public List findAll(){
        return repo.findAll();
    }
    
    @PostMapping
    public Comment create(@RequestBody Comment comment){
        return repo.save(comment);
    }
    
    @PostMapping("/api/comment/upload")
    public String uploadMultipartFile(@RequestParam("fileId") Long fileId, @RequestParam("body") String body){
        try {
            
            // save file to MySQL
            FileModel fileModel = fileRepo.findFileById(fileId);
            Comment comment = new Comment(body, fileModel);
            comment.setFilemodel(fileModel);
            repo.save(comment);
            service.sendCommentMail(fileModel.getUser().getEmail(), fileModel.getUserName(), fileModel.getName(), comment.getBody());
            return "Comment Uploaded";
        } catch (Exception e) {
            return "FAIL! Comment NOT uploaded" +e;
        }
    }
    
    
 
    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Comment> findById(@PathVariable long id){
        return repo.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping(value="/{id}")
    public ResponseEntity<Comment> update(@PathVariable("id") long id, @RequestBody Comment comment){
       return repo.findById(id)
                .map(record -> {
                    record.setBody(comment.getBody());
                    
                    Comment updated = repo.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
  
    }

    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        return repo.findById(id)
                .map(record -> {
                    repo.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
    


}
