package com.smartattendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartattendance.model.Login;
import java.util.*;

public interface LoginRepository extends JpaRepository<Login, UUID> {
    Optional<Login> findByStudentMail(String studentMail);
    
}
