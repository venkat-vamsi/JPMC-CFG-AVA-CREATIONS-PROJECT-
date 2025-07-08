package com.backend.avabackend.repository;

import com.backend.avabackend.model.WebsiteProduct;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WebsiteProductRepository extends MongoRepository<WebsiteProduct, String> {
    // Finds all products that are marked as visible for the e-commerce store
    List<WebsiteProduct> findByIsVisible(boolean isVisible);

    List<WebsiteProduct> findProductsByCategory(String category);
}