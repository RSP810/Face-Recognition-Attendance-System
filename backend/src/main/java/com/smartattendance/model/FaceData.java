package com.smartattendance.model;

import java.time.Instant;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "face_data")
public class FaceData{
    @Id
    @GeneratedValue
    @Column(name = "face_id", columnDefinition = "UUID")
    private UUID faceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Registration user;

    @Lob
    @Column(name = "face_image", nullable = false)
    private byte[] faceImage;

    @Column(name = "collected_at")
    private Instant collectedAt = Instant.now();

}

