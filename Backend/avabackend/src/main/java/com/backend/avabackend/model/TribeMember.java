package com.backend.avabackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@Document(collection = "tribe_member")
public class TribeMember {
    @Id
    private String id;
    private String name;
    private String phone;
    private Location location;
    private FamilyDetails familyDetails;
    private List<Asset> assets;
    private List<String> professionIds;
    private Double bankBalance;
    private Date createdAt;
}
