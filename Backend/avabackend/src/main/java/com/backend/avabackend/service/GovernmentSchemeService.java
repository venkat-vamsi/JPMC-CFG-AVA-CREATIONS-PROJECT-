package com.backend.avabackend.service;

import com.backend.avabackend.model.GovernmentScheme;
import com.backend.avabackend.repository.GovernmentSchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GovernmentSchemeService {
    private final GovernmentSchemeRepository governmentSchemeRepository;

    @Autowired
    public GovernmentSchemeService(GovernmentSchemeRepository governmentSchemeRepository) {
        this.governmentSchemeRepository = governmentSchemeRepository;
    }

    public GovernmentScheme addScheme(GovernmentScheme scheme) {
        return governmentSchemeRepository.save(scheme);
    }

    public List<GovernmentScheme> addSchemes(List<GovernmentScheme> schemes) {
        return governmentSchemeRepository.saveAll(schemes);
    }

    public List<GovernmentScheme> getAllSchemes() {
        return governmentSchemeRepository.findAll();
    }
}
