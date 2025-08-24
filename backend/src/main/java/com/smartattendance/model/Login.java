package com.smartattendance.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor 
@Entity @Table(name = "login")
public class Login {
    @Id @GeneratedValue
    @Column(name = "login_id", columnDefinition = "UUID")
    private UUID loginId;

    @Column(name = "student_mail", nullable = false, unique = true)
    private String studentMail;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();
}