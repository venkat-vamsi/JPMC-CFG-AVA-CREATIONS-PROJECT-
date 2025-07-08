package com.backend.avabackend.controller;

import com.backend.avabackend.model.GovernmentScheme;
import com.backend.avabackend.service.GovernmentSchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class GovernmentSchemeController {
    private final GovernmentSchemeService governmentSchemeService;

    @Autowired
    public GovernmentSchemeController(GovernmentSchemeService governmentSchemeService) {
        this.governmentSchemeService = governmentSchemeService;
    }

    @PostMapping
    public ResponseEntity<GovernmentScheme> addScheme(@RequestBody GovernmentScheme scheme) {
        GovernmentScheme saved = governmentSchemeService.addScheme(scheme);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<GovernmentScheme>> addSchemes(@RequestBody List<GovernmentScheme> schemes) {
        List<GovernmentScheme> saved = governmentSchemeService.addSchemes(schemes);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/public")
    public ResponseEntity<List<SchemeSummary>> getAllSchemeSummaries() {
        List<GovernmentScheme> schemes = governmentSchemeService.getAllSchemes();
        List<SchemeSummary> summaries = schemes.stream()
            .map(s -> new SchemeSummary(s.getName(), s.getDescription()))
            .toList();
        return ResponseEntity.ok(summaries);
    }

    public static class SchemeSummary {
        private String name;
        private String description;
        public SchemeSummary(String name, String description) {
            this.name = name;
            this.description = description;
        }
        public String getName() { return name; }
        public String getDescription() { return description; }
    }
}
