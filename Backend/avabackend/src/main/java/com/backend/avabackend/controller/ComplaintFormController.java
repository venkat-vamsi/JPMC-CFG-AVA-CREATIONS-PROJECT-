package com.backend.avabackend.controller;

import com.backend.avabackend.model.ComplaintForm;
import com.backend.avabackend.service.ComplaintFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintFormController {
    private final ComplaintFormService complaintFormService;

    @Autowired
    public ComplaintFormController(ComplaintFormService complaintFormService) {
        this.complaintFormService = complaintFormService;
    }

    @PostMapping
    public ResponseEntity<ComplaintForm> addComplaint(@RequestBody ComplaintForm complaint) {
        ComplaintForm saved = complaintFormService.addComplaint(complaint);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<ComplaintForm>> addComplaints(@RequestBody List<ComplaintForm> complaints) {
        List<ComplaintForm> saved = complaintFormService.addComplaints(complaints);
        return ResponseEntity.ok(saved);
    }
}
