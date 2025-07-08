package com.backend.avabackend.service;

import com.backend.avabackend.model.Order;
import com.backend.avabackend.model.User;
import com.backend.avabackend.repository.OrderRepository;
import com.backend.avabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional
    public Order addOrder(Order order) {
        // Optionally, calculate total or validate order here
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserName(String name) {
        User user = userRepository.findByName(name);
        if (user != null) {
            return orderRepository.findByCustomerId(user.getId());
        }
        return List.of();
    }
}