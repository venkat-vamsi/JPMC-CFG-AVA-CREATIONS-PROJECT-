package com.backend.avabackend.service;

import com.backend.avabackend.model.ComplaintForm;
import com.backend.avabackend.repository.ComplaintFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class ComplaintFormService {
    private final ComplaintFormRepository complaintFormRepository;

    @Autowired
    public ComplaintFormService(ComplaintFormRepository complaintFormRepository) {
        this.complaintFormRepository = complaintFormRepository;
    }

    public ComplaintForm addComplaint(ComplaintForm complaint) {
        if (complaint.getImage() != null && !complaint.getImage().isEmpty()) {
            // If not already base64, encode it (assume plain string if not base64)
            try {
                Base64.getDecoder().decode(complaint.getImage());
            } catch (IllegalArgumentException e) {
                String encoded = Base64.getEncoder().encodeToString(complaint.getImage().getBytes(StandardCharsets.UTF_8));
                complaint.setImage(encoded);
            }
        }
        return complaintFormRepository.save(complaint);
    }

    public List<ComplaintForm> addComplaints(List<ComplaintForm> complaints) {
        for (ComplaintForm complaint : complaints) {
            if (complaint.getImage() != null && !complaint.getImage().isEmpty()) {
                try {
                    Base64.getDecoder().decode(complaint.getImage());
                } catch (IllegalArgumentException e) {
                    String encoded = Base64.getEncoder().encodeToString(complaint.getImage().getBytes(StandardCharsets.UTF_8));
                    complaint.setImage(encoded);
                }
            }
        }
        return complaintFormRepository.saveAll(complaints);
    }
}
