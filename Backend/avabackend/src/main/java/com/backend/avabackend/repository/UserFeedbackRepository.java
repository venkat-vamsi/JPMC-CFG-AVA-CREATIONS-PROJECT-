package com.backend.avabackend.repository;

import com.backend.avabackend.model.UserFeedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedbackRepository extends MongoRepository<UserFeedback, String> {
}
