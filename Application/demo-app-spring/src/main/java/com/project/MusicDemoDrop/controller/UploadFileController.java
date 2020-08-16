package com.project.MusicDemoDrop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.MusicDemoDrop.model.FileModel;
import com.project.MusicDemoDrop.repository.FileRepository;
import com.project.MusicDemoDrop.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UploadFileController {

    @Autowired
    FileRepository fileRepository;
    
    @Autowired
    UserRepository userRepository;

    /*
     * MultipartFile Upload
     */
    @PostMapping("/api/file/upload")
    public String uploadMultipartFile(@RequestParam("file") MultipartFile file, @RequestParam("description") String description, @RequestParam("userName") String userName){
        try {


            // TODO Implement the .wav and .ogg audio file to .mp3 audio file converter of AudioMP3ConverterUtil.java in the UploadFileController

            // save file to MySQL
            FileModel filemode = new FileModel(file.getOriginalFilename(), file.getContentType(), file.getBytes(), description, userName);
            filemode.setUser(userRepository.findByName(userName));
            
            fileRepository.save(filemode);
            return "File uploaded successfully! -> \nFilename = " + file.getOriginalFilename()+"\nDescription: "+description;
        } catch (Exception e) {
            return "FAIL! Maybe You had uploaded the file before or the file's size > 15MB\n ErrorMSG: "+e;
        }
    }
}
