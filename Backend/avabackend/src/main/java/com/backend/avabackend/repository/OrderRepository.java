package com.backend.avabackend.repository;

import com.backend.avabackend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    // Finds all orders placed by a specific customer
    List<Order> findByCustomerId(String customerId);
}