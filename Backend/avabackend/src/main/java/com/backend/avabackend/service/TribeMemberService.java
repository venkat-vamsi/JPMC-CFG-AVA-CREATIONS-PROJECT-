package com.backend.avabackend.service;

import com.backend.avabackend.model.TribeMember;
import com.backend.avabackend.repository.TribeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TribeMemberService {
    private final TribeMemberRepository tribeMemberRepository;

    @Autowired
    public TribeMemberService(TribeMemberRepository tribeMemberRepository) {
        this.tribeMemberRepository = tribeMemberRepository;
    }

    public TribeMember addTribeMember(TribeMember tribeMember) {
        return tribeMemberRepository.save(tribeMember);
    }
}
