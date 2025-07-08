package com.backend.avabackend.service;

import com.backend.avabackend.model.UserFeedback;
import com.backend.avabackend.repository.UserFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFeedbackService {
    private final UserFeedbackRepository userFeedbackRepository;

    @Autowired
    public UserFeedbackService(UserFeedbackRepository userFeedbackRepository) {
        this.userFeedbackRepository = userFeedbackRepository;
    }

    public UserFeedback addFeedback(UserFeedback feedback) {
        return userFeedbackRepository.save(feedback);
    }

    public List<UserFeedback> addFeedbacks(List<UserFeedback> feedbacks) {
        return userFeedbackRepository.saveAll(feedbacks);
    }

    public List<UserFeedback> getAllFeedback() {
        return userFeedbackRepository.findAll();
    }
}
