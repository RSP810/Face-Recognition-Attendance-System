package com.smartattendance.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.smartattendance.dto.requests.LoginRequest;
import com.smartattendance.dto.requests.RegisterRequest;
import com.smartattendance.dto.response.LoginResponse;
import com.smartattendance.dto.response.RegistrationResponse;
import com.smartattendance.service.UserService;

import jakarta.validation.*;

@RestController @RequestMapping("/user/*")
public class UserController {
    private final UserService user;
    public UserController(UserService u){
        this.user = u;
    }
    
    @PostMapping("/register")
    public RegistrationResponse register(@RequestBody @Valid RegisterRequest req){
        return user.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest req){
        return user.login(req); 
    }

}
