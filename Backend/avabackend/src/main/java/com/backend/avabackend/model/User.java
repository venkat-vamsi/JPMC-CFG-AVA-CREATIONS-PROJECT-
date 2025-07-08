package com.backend.avabackend.model;

import lombok.Data;
import lombok.Getter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "users")
@Getter
public class User {
    @Id
    private String id;
    private String name;
    private String email; // For admins and customers
    private String phone; // Primarily for artisans
    private String password; // For admins and customers
    private Location location; // For artisans
    private List<String> professionIds;
    private KycDetails kycDetails;
    private Double bankBalance;
    private List<Map<String, Object>> assets;
    private List<String> roles; // e.g., "ROLE_ARTISAN", "ROLE_ADMIN", "ROLE_CUSTOMER"
    private Date createdAt = new Date();

    @Data
    public static class Location {
        private String village;
        private String district;
        private String state;
    }

    @Data
    public static class KycDetails {
        private DocumentStatus aadhar;
        private DocumentStatus pan;
    }

    @Data
    public static class DocumentStatus {
        private String status; // PENDING, VERIFIED, REJECTED
        private String imageUrl;
    }

    public Double getBankBalance() {
        return bankBalance;
    }

    public void setBankBalance(Double bankBalance) {
        this.bankBalance = bankBalance;
    }
}