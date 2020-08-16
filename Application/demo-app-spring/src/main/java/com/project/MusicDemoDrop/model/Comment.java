
package com.project.MusicDemoDrop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

@Entity
public class Comment {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max = 500)
    private String body;
    
    //linken aan filemodel
    @JsonBackReference
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "filemodel_id")
    private FileModel filemodel;
   
    
    public Comment(){}

    public Comment(String body, FileModel filemodel) {
        this.body = body;
        this.filemodel = filemodel;
        
    }

    public Comment(FileModel file, String body, String userName) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public FileModel getFilemodel() {
        return filemodel;
    }

    public void setFilemodel(FileModel filemodel) {
        this.filemodel = filemodel;
    }

    @Override
    public String toString() {
        return "Comment{" + "id=" + id + ", body=" + body + ", filemodel=" + filemodel + '}';
    }

    
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 67 * hash + Objects.hashCode(this.id);
        hash = 67 * hash + Objects.hashCode(this.body);
        hash = 67 * hash + Objects.hashCode(this.filemodel);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Comment other = (Comment) obj;
        if (!Objects.equals(this.body, other.body)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.filemodel, other.filemodel)) {
            return false;
        }
        return true;
    }

    
}
