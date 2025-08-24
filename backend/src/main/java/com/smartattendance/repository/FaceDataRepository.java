package com.smartattendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartattendance.model.FaceData;
import java.util.*;

public interface FaceDataRepository extends JpaRepository<FaceData, UUID> {
    List<FaceData> findByUser_UserId(UUID userId);
}
