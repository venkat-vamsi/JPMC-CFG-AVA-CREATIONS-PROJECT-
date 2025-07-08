package com.backend.avabackend.controller;

import com.backend.avabackend.model.User;
import com.backend.avabackend.service.UserService;
import com.backend.avabackend.util.NumberToWordsConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User saved = userService.addUser(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<User>> addUsers(@RequestBody List<User> users) {
        List<User> saved = userService.addUsers(users);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/balance/{phone}")
    public ResponseEntity<?> getBankBalanceByPhone(@PathVariable String phone) {
        Double balance = userService.getBankBalanceByPhone(phone);
        if (balance != null) {
            long rounded = Math.round(balance);
            String inWords = NumberToWordsConverter.convert(rounded) + " rupees";
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Your bank balance is " + inWords);
            }});
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
