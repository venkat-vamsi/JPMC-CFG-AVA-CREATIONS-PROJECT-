package com.backend.avabackend.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "websiteProducts")
public class WebsiteProduct {
    @Id
    private String id;
    private String title;
    private String story;
    private Price price;
    private String category;
    private String productType;
    private String image;
    private int stockLevel;
    private boolean isVisible = true;
    private ArtisanInfo artisanInfo;
    private List<String> sourceProductIds;
    private Date updatedAt = new Date();

    @Data
    public static class Price {
        private double amount;
        private String currency;
    }

    @Data
    public static class ArtisanInfo {
        private String artisanId;
        private String artisanName;
        private String village;
    }
}
