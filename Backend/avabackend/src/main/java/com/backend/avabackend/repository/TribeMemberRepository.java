package com.backend.avabackend.repository;

import com.backend.avabackend.model.TribeMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TribeMemberRepository extends MongoRepository<TribeMember, String> {
}
