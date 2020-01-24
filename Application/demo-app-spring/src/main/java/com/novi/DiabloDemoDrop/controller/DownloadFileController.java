package com.novi.DiabloDemoDrop.controller;

import com.novi.DiabloDemoDrop.model.Comment;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.novi.DiabloDemoDrop.model.FileModel;
import com.novi.DiabloDemoDrop.model.User;
import com.novi.DiabloDemoDrop.repository.FileRepository;
import com.novi.DiabloDemoDrop.repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/file")
@RestController
public class DownloadFileController {
	
	@Autowired
	FileRepository fileRepository;
        
        @Autowired
	UserRepository userRepository;

	/*
	 * List All Files
	 */
    //@JsonView(View.FileInfo.class)
	@GetMapping("/all")
	public List<FileModel> getListFiles() {
		return fileRepository.findAll();
	}
        
        @PostMapping("/usersongs")
	public List<FileModel> getListFilesFromUser(@RequestParam("userName") String userName) {
            
                User currentUser = userRepository.findByName(userName);
            
                List<FileModel> userFiles = currentUser.getFileModel();
                
                return userFiles;
	}

        
        @PostMapping("/comments")
        public List<Comment> getCommentsFromFile(@RequestParam("fileId") Long fileId){
            
            FileModel fileModel = fileRepository.findFileById(fileId);
            List<Comment> comments = fileModel.getComments();
            return comments;
        }
	
        
    /*
     * Download Files
     */
        
        
        
        //Download the file by the file id
	@GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Optional<FileModel> fileOptional = fileRepository.findById(id);

        if (fileOptional.isPresent()) {
            FileModel file = fileOptional.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(file.getAudiofile());
        }

        return ResponseEntity.status(404).body(null);
    }

    // Deleting files by ID | Does not yety work. function deleteById is not being called??
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        return fileRepository.findById(id)
                
                .map(record -> {
                    System.out.println("repo id: "+record.getId()+" name: "+record.getName());
                    fileRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());

    }
    /*In the putt body give the value true to softdelete the file.--> { "softedelete": "true" }*/
    @PutMapping(value="/softdelete/{id}")
    public ResponseEntity<FileModel> softedelete(@PathVariable("id") long id,
                                          @RequestBody FileModel filemodel){
        return fileRepository.findById(id)
                .map(record -> {
                    record.setSoftdeleted(filemodel.isSoftdeleted());
                    FileModel updated = fileRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
        
    }
    /*In the put body give the value true to process the file.--> { "processed": "true" }*/
    @PutMapping(value="/processed/{id}")
    public ResponseEntity<FileModel> processed(@PathVariable("id") long id,
                                          @RequestBody FileModel filemodel){
        return fileRepository.findById(id)
                .map(record -> {
                    record.setProcessed(filemodel.isProcessed());
                    FileModel updated = fileRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
        
    }
        
}
