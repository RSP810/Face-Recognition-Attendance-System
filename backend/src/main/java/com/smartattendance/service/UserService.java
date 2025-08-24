package com.smartattendance.service;

import com.smartattendance.dto.requests.LoginRequest;
import com.smartattendance.dto.requests.RegisterRequest;
import com.smartattendance.dto.response.LoginResponse;
import com.smartattendance.dto.response.RegistrationResponse;
import com.smartattendance.model.Login;
import com.smartattendance.model.Registration;
import com.smartattendance.model.Role;
import com.smartattendance.repository.LoginRepository;
import com.smartattendance.repository.RegistrationRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final LoginRepository loginRepo;
    private final RegistrationRepository regRepo;
    private final PasswordEncoder encoder;

    public UserService(LoginRepository l, RegistrationRepository r, PasswordEncoder e) {
        this.loginRepo = l;
        this.regRepo = r;
        this.encoder = e;
    }

    @Transactional
    public RegistrationResponse register(RegisterRequest req) {
        final String email = req.email().trim().toLowerCase();

        if (loginRepo.findByStudentMail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        var login = new Login();
        login.setStudentMail(email);
        login.setPasswordHash(encoder.encode(req.password()));
        login = loginRepo.save(login);

        Role role;
        try {
            role = (req.role() == null)
                ? Role.STUDENT
                : Role.valueOf(req.role().trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            role = Role.STUDENT;
        }

        var reg = new Registration();
        reg.setLogin(login);
        reg.setFullName(req.fullName());
        reg.setRole(role);
        reg = regRepo.save(reg);
        
        return new RegistrationResponse(
            reg.getUserId().toString(),
            login.getStudentMail(),
            reg.getFullName(),
            reg.getRole().name()
        );
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest req) {
        final String email = req.email().trim().toLowerCase();

        var login = loginRepo.findByStudentMail(email)
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.password(), login.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        var reg = regRepo.findByLogin(login)
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        return new LoginResponse(
            reg.getUserId().toString(),
            reg.getFullName(),
            reg.getRole().name()
        );
    }
}
