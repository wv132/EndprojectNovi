package com.novi.DiabloDemoDrop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

@Entity
@Table(name = "file_model")
public class FileModel {
    
    public FileModel() {
        }

    @Id
    @GeneratedValue
    @Column(name = "id")
    @JsonView(View.FileInfo.class)
    private Long id;

    @Column(name = "name")
    @JsonView(View.FileInfo.class)
    private String name;

    @Column(name = "datatype")
    private String datatype;

    @Column(name = "Description")
    private String description;
    
    @Column(name = "userName")
    private String userName;
    
    private boolean processed = false;

    private boolean softdeleted = false;
    
    @Lob
    @Column(name = "audiofile")
    @JsonView(View.FileInfo.class)
    private byte[] audiofile;

    
    @JsonBackReference
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "filemodel")
    @Size(min=0, max=10)
    private List<Comment> comment = new ArrayList<>();
    

    public FileModel(String name, String datatype, byte[] audiofile, String description, String userName) {
        this.name = name;
        this.datatype = datatype;
        this.audiofile = audiofile;
        this.description = description;
        this.userName = userName;
    }

    public boolean isProcessed() {
        return processed;
    }

    public void setProcessed(boolean processed) {
        this.processed = processed;
    }

    public boolean isSoftdeleted() {
        return softdeleted;
    }

    public void setSoftdeleted(boolean softdeleted) {
        this.softdeleted = softdeleted;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    
    public String getDatatype() {
        return this.datatype;
    }

    public void setDatatype(String datatype) {
        this.datatype = datatype;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comment;
    }

    public void setComments(List<Comment> comment) {
        this.comment = comment;
    }

    public byte[] getAudiofile() {
        return this.audiofile;
    }

    public void setAudiofile(byte[] audiofile) {
        this.audiofile = audiofile;
    }
}
