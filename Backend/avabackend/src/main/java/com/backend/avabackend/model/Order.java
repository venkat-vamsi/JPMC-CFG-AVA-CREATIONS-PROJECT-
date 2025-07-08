package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String customerId;
    private Date orderDate = new Date();
    private List<LineItem> lineItems;
    private double totalAmount;
    private Address shippingAddress;
    private PaymentDetails paymentDetails;
    private String orderStatus; // PENDING_PAYMENT, PROCESSING, SHIPPED, DELIVERED
    private ArtisanPayout artisanPayout;

    @Data
    public static class LineItem {
        private String websiteProductId;
        private String productTitle;
        private int quantity;
        private double priceAtPurchase;
    }

    @Data
    public static class Address {
        private String street;
        private String city;
        private String pincode;
        private String state;
    }

    @Data
    public static class PaymentDetails {
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String razorpaySignature;
        private String method = "Razorpay";
        private String status; // PENDING, PAID, FAILED
    }

    @Data
    public static class ArtisanPayout {
        private String artisanId;
        private double amount;
        private String status; // PENDING, PAID
    }
}