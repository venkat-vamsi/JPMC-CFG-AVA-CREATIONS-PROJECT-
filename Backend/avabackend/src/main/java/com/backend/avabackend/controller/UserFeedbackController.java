package com.backend.avabackend.controller;

import com.backend.avabackend.model.UserFeedback;
import com.backend.avabackend.service.UserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class UserFeedbackController {
    private final UserFeedbackService userFeedbackService;

    @Autowired
    public UserFeedbackController(UserFeedbackService userFeedbackService) {
        this.userFeedbackService = userFeedbackService;
    }

    @PostMapping
    public ResponseEntity<UserFeedback> addFeedback(@RequestBody UserFeedback feedback) {
        UserFeedback saved = userFeedbackService.addFeedback(feedback);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<UserFeedback>> addFeedbacks(@RequestBody List<UserFeedback> feedbacks) {
        List<UserFeedback> saved = userFeedbackService.addFeedbacks(feedbacks);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<UserFeedback>> getAllFeedback() {
        List<UserFeedback> feedbacks = userFeedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbacks);
    }
}
