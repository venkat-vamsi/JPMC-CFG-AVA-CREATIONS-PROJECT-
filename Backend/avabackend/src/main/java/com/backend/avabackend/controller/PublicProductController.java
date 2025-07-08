package com.backend.avabackend.controller;

import com.backend.avabackend.model.Review;
import com.backend.avabackend.model.WebsiteProduct;
import com.backend.avabackend.repository.ReviewRepository;
import com.backend.avabackend.repository.WebsiteProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class PublicProductController {
    @Autowired
    private final WebsiteProductRepository websiteProductRepository;
    @Autowired
    private final ReviewRepository reviewRepository;

    @GetMapping
    public List<WebsiteProduct> getAllVisibleProducts() {
        return websiteProductRepository.findByIsVisible(true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WebsiteProduct> getProductById(@PathVariable String id) {
        return websiteProductRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<WebsiteProduct>> getProductsByCategory(@PathVariable String category) {
        List<WebsiteProduct> products = websiteProductRepository.findProductsByCategory(category);
        if (products == null || products.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(products);
        }
    }

    @GetMapping("/{id}/reviews")
    public List<Review> getProductReviews(@PathVariable String id) {
        return reviewRepository.findByWebsiteProductId(id);
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Review> addReview(@PathVariable String id, @RequestBody Review review) {
        review.setWebsiteProductId(id);
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @PostMapping
    public ResponseEntity<WebsiteProduct> addWebsiteProduct(@RequestBody WebsiteProduct product) {
        WebsiteProduct saved = websiteProductRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<WebsiteProduct>> addWebsiteProducts(@RequestBody List<WebsiteProduct> products) {
        List<WebsiteProduct> saved = websiteProductRepository.saveAll(products);
        return ResponseEntity.ok(saved);
    }
}