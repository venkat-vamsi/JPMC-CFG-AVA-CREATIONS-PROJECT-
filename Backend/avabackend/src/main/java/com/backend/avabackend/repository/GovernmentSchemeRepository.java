package com.backend.avabackend.repository;

import com.backend.avabackend.model.GovernmentScheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovernmentSchemeRepository extends MongoRepository<GovernmentScheme, String> {
}
