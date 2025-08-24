package com.smartattendance.controller;

import com.smartattendance.dto.requests.FaceUploadRequest;
import com.smartattendance.dto.response.FaceUploadResponse;
import com.smartattendance.service.FaceService;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/face")
public class FaceController {
    private final FaceService face;
    public FaceController(FaceService f){ this.face=f; }

    @PostMapping("/upload")
    public FaceUploadResponse upload(@RequestBody FaceUploadRequest req){ return face.upload(req); }
}