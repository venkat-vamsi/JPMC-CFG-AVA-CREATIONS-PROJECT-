package com.backend.avabackend.repository;

import com.backend.avabackend.model.ComplaintForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintFormRepository extends MongoRepository<ComplaintForm, String> {
}
