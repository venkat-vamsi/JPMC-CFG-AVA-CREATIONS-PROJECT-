package com.backend.avabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardStatsResponse {
    private BigDecimal totalRevenue;
    private long productsSoldCount;
    private long totalRegisteredArtisans;
    private long artisansBenefitted; // Artisans who have received payouts
    private String topSellingProduct; // Placeholder for a more complex feature
}