package com.backend.avabackend.repository;

import com.backend.avabackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // Finds a user by their email, used for login
    Optional<User> findByEmail(String email);

    // Finds all users with a specific role (e.g., all artisans)
    List<User> findByRoles(String role);

    // Finds a user by their phone number
    User findByPhone(String phone);

    // Finds a user by their name
    User findByName(String name);
}