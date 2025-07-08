# AvaCreations Backend

This is the backend for the AvaCreations project (Team 30). It is a Spring Boot application using MongoDB as the database.

## How to Run

1. Build the project:
   ```sh
   ./mvnw clean package
   # or
   mvn clean package
   ```
2. Run the JAR:
   ```sh
   java -jar target/avabackend-0.0.1-SNAPSHOT.jar
   ```
3. The backend will be available at `http://localhost:8080` (or your configured port).

## PublicProduct APIs

All endpoints are prefixed with `/api/products`.

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | `/api/products`                 | Get all visible products                    |
| GET    | `/api/products/{id}`            | Get a product by its ID                     |
| GET    | `/api/products/category/{category}` | Get products by category                |
| GET    | `/api/products/{id}/reviews`    | Get all reviews for a product               |
| POST   | `/api/products/{id}/reviews`    | Add a review to a product                   |
| POST   | `/api/products`                 | Add a new public product                    |
| POST   | `/api/products/bulk`            | Add multiple public products                |

## Example JSON for Adding a Product

```
{
  "title": "Handcrafted Basket",
  "story": "Made by local artisans using traditional techniques.",
  "price": { "amount": 299.99, "currency": "INR" },
  "category": "Handicrafts",
  "images": ["https://example.com/basket1.jpg"],
  "stockLevel": 10,
  "isVisible": true,
  "artisanInfo": {
    "artisanId": "artisan123",
    "artisanName": "Devi",
    "village": "Siripuram"
  },
  "sourceProductIds": ["product123"]
}
```

## Example JSON for GET /api/products (Response)

```
[
  {
    "id": "665f1a2b3c4d5e6f7g8h9i0j",
    "title": "Handcrafted Basket",
    "story": "Made by local artisans using traditional techniques.",
    "price": { "amount": 299.99, "currency": "INR" },
    "category": "Handicrafts",
    "images": ["https://example.com/basket1.jpg"],
    "stockLevel": 10,
    "isVisible": true,
    "artisanInfo": {
      "artisanId": "artisan123",
      "artisanName": "Devi",
      "village": "Siripuram"
    },
    "sourceProductIds": ["product123"],
    "updatedAt": "2025-06-29T10:00:00.000+00:00"
  },
  {
    "id": "665f1a2b3c4d5e6f7g8h9i1k",
    "title": "Clay Pot",
    "story": "Traditional clay pot made by skilled potters.",
    "price": { "amount": 149.99, "currency": "INR" },
    "category": "Pottery",
    "images": ["https://example.com/pot1.jpg"],
    "stockLevel": 20,
    "isVisible": true,
    "artisanInfo": {
      "artisanId": "artisan456",
      "artisanName": "Raju",
      "village": "Adilabad"
    },
    "sourceProductIds": [],
    "updatedAt": "2025-06-29T10:00:00.000+00:00"
  }
]
```

---

For more details, see the code or contact the backend team.
