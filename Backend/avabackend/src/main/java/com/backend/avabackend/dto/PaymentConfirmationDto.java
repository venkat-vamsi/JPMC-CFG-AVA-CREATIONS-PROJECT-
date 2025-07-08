package com.backend.avabackend.dto;

import lombok.Data;

@Data
public class PaymentConfirmationDto {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private String internalOrderId;
}