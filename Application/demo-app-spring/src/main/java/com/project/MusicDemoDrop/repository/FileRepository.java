package com.project.MusicDemoDrop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.MusicDemoDrop.model.FileModel;


@Repository
@Transactional
public interface FileRepository extends JpaRepository<FileModel, Long>{	

    public List<FileModel> findByUserId(Long UserId);
    
    public FileModel findFileById(Long id);
    
}