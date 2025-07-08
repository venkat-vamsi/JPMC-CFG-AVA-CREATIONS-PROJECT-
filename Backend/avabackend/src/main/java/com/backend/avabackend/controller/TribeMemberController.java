package com.backend.avabackend.controller;

import com.backend.avabackend.model.TribeMember;
import com.backend.avabackend.service.TribeMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tribe-members")
public class TribeMemberController {
    private final TribeMemberService tribeMemberService;

    @Autowired
    public TribeMemberController(TribeMemberService tribeMemberService) {
        this.tribeMemberService = tribeMemberService;
    }

    @PostMapping
    public ResponseEntity<TribeMember> addTribeMember(@RequestBody TribeMember tribeMember) {
        TribeMember saved = tribeMemberService.addTribeMember(tribeMember);
        return ResponseEntity.ok(saved);
    }
}
