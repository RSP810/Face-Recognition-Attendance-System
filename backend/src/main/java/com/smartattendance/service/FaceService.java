package com.smartattendance.service;

import com.smartattendance.dto.requests.FaceUploadRequest;
import com.smartattendance.dto.response.FaceUploadResponse;
import com.smartattendance.model.FaceData;
import com.smartattendance.repository.FaceDataRepository;
import com.smartattendance.repository.RegistrationRepository;
import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class FaceService {
    private final FaceDataRepository faceRepo;
    private final RegistrationRepository regRepo;

    public FaceService(FaceDataRepository f, RegistrationRepository r){
        this.faceRepo=f;
        this.regRepo=r; 
    }

    public FaceUploadResponse upload(FaceUploadRequest req) {
        var user = regRepo.findById(UUID.fromString(req.userId()))
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        var face = new FaceData();
        face.setUser(user);
        face.setFaceImage(req.faceImage());
    
        var saved = faceRepo.save(face);
    
        return new FaceUploadResponse(
            saved.getFaceId().toString(),
            saved.getUser().getUserId().toString()
        );
    }
    
}
