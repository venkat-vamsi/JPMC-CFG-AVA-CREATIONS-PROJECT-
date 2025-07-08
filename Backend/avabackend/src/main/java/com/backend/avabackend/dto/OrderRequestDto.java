package com.backend.avabackend.dto;

import com.backend.avabackend.model.Order;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDto {
    private String customerId;
    private List<Order.LineItem> items;
    private Order.Address shippingAddress;
}