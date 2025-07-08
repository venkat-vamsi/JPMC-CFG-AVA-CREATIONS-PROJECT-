package com.backend.avabackend.controller;

import com.backend.avabackend.model.Order;
import com.backend.avabackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order saved = orderService.addOrder(order);
        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Order>> getOrdersByUserName(@PathVariable String name) {
        List<Order> orders = orderService.getOrdersByUserName(name);
        return ResponseEntity.ok(orders);
    }
    
}
