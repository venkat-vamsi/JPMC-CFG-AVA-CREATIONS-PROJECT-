package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "governmentSchemes")
public class GovernmentScheme {
    @Id
    private String id;
    private String name;
    private String description;
}
