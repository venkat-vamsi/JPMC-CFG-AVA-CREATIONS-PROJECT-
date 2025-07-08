package com.backend.avabackend.model;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class FamilyDetails {
    private String spouseName;
    private int childrenCount;
    private List<String> dependents;
}
