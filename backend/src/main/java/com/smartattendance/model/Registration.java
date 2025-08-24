package com.smartattendance.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "registration")
public class Registration{
    @Id
    @GeneratedValue
    @Column(name = "user_id", columnDefinition = "UUID")
    private UUID userId;

    @OneToOne
    @JoinColumn(name = "login_id", nullable = false, unique = true)
    private Login login;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}

