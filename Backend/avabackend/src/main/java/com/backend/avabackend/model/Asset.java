package com.backend.avabackend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Asset {
    private String assetName;
    private int quantity;
    private Integer estimatedValue;
    private String unit;
}
