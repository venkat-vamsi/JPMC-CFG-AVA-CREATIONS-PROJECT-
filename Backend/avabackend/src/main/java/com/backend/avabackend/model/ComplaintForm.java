package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "complaintForms")
public class ComplaintForm {
    @Id
    private String complaintId;
    private String complaintTitle;
    private String complaintDescription;
    private String image; // base64 encoded image string
    private String status;
    private String response;
}
