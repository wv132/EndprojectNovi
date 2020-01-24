
package com.novi.DiabloDemoDrop.repository;

import com.novi.DiabloDemoDrop.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{



}
