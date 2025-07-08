package com.backend.avabackend.repository;

import com.backend.avabackend.model.Profession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfessionRepository extends MongoRepository<Profession, String> {
}