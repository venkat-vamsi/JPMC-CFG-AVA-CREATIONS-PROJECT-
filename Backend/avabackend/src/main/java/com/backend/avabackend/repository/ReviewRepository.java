package com.backend.avabackend.repository;

import com.backend.avabackend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    // Finds all reviews for a specific product
    List<Review> findByWebsiteProductId(String websiteProductId);
}