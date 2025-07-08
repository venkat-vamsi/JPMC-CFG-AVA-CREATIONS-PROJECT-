package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userFeedbacks")
public class UserFeedback {
    @Id
    private String id;
    private String userId;
    private String productType;
    private String category;
    private String comments;
}
