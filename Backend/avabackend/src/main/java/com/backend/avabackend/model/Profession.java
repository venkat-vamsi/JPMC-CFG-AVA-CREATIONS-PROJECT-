package com.backend.avabackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "professions")
public class Profession {
    @Id
    private String id;
    private String name;
    private String description;
    private List<MonitoringFactor> monitoringFactors;

    @Data
    public static class MonitoringFactor {
        private String factorName;
        private String unit;
        private Map<String, Object> criticalThreshold;
        private String alertMessageTemplate;
    }
}
