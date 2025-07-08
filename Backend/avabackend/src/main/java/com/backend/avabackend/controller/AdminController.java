package com.backend.avabackend.controller;

import com.backend.avabackend.dto.DashboardStatsResponse;
import com.backend.avabackend.model.WebsiteProduct;
import com.backend.avabackend.repository.WebsiteProductRepository;
import com.backend.avabackend.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminDashboardService adminDashboardService;
    private final WebsiteProductRepository websiteProductRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {
        return ResponseEntity.ok(adminDashboardService.getDashboardStats());
    }

    @PostMapping("/website-products")
    public ResponseEntity<WebsiteProduct> addOrUpdateProduct(@RequestBody WebsiteProduct product) {
        // This is a simplified logic. A real app might have a more complex update logic.
        WebsiteProduct savedProduct = websiteProductRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }
}