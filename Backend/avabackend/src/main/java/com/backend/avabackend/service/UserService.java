package com.backend.avabackend.service;

import com.backend.avabackend.model.User;
import com.backend.avabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> addUsers(List<User> users) {
        return userRepository.saveAll(users);
    }

    public Double getBankBalanceByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        if (user != null && user.getKycDetails() != null) {
            return user.getBankBalance();
        }
        return null;
    }
}
