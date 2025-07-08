package com.backend.avabackend.service;

import com.backend.avabackend.dto.DashboardStatsResponse;
import com.backend.avabackend.model.Order;
import com.backend.avabackend.repository.OrderRepository;
import com.backend.avabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final UserRepository userRepository;

    public DashboardStatsResponse getDashboardStats() {
        List<Order> allOrders = orderRepository.findAll();

        long artisansSupported = allOrders.stream()
                .filter(order -> order.getArtisanPayout() != null && order.getArtisanPayout().getArtisanId() != null)
                .map(order -> order.getArtisanPayout().getArtisanId())
                .distinct()
                .count();

        BigDecimal totalRevenue = allOrders.stream()
                .filter(order -> "PAID".equals(order.getPaymentDetails().getStatus()))
                .map(order -> BigDecimal.valueOf(order.getTotalAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long productsSoldCount = allOrders.stream()
                .filter(order -> "PAID".equals(order.getPaymentDetails().getStatus()))
                .mapToLong(order -> order.getLineItems().size())
                .sum();

        long registeredArtisans = userRepository.findByRoles("ROLE_ARTISAN").size();

        // Placeholder for a more complex top-selling product query
        String topSellingProduct = "Eri Silk Shawl";

        return new DashboardStatsResponse(
                totalRevenue,
                productsSoldCount,
                registeredArtisans,
                artisansSupported,
                topSellingProduct
        );
    }
}