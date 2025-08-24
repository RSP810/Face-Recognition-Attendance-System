package com.smartattendance.repository;

import java.util.*;

import com.smartattendance.model.Login;
import com.smartattendance.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, UUID>{
    Optional<Registration> findByLogin(Login login);

}
