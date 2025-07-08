package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;
    private String websiteProductId;
    private String customerId;
    private String customerName;
    private int rating; // 1 to 5
    private String comment;
    private Date createdAt = new Date();
}
