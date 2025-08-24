package com.smartattendance.dto.requests;

public record RegisterRequest(String email, String fullName, String password, String role) {
    
}
