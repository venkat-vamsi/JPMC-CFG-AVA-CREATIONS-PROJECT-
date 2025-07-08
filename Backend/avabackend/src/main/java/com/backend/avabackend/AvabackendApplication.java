package com.backend.avabackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class AvabackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AvabackendApplication.class, args);
	}

}
