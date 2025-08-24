package com.smartattendance.dto.requests;

public record FaceUploadRequest(String userId, byte[] faceImage) {
    
}
