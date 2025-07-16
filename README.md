🍬 Sweet Shop Management System — Backend
This is the backend implementation of a Sweet Shop Management System, built with Node.js, Express, MongoDB, and Mongoose. It follows a Test-Driven Development (TDD) workflow and offers CRUD operations, inventory management, search, sorting, and robust validation.

🧰 Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Jest + Supertest for automated testing

Dotenv for environment configuration
```
backend/
│
├── models/
│   └── Sweet.js            # Mongoose schema for sweets
│
├── controllers/
│   └── sweetController.js  # Logic for CRUD, search, sort, purchase, restock
│
├── routes/
│   └── sweets.js           # Express router for sweets endpoints
│
├── tests/
│   ├── api.test.js         # Health + 404
│   ├── validation.test.js  # Field validation errors
│   ├── search.test.js      # Search by name, category, price
│   ├── sort.test.js        # Sort by price or quantity
│   ├── inventory.test.js   # Purchase & restock logic
│
├── app.js                  # Entry point, routes and middleware
├── db.js                   # MongoDB connection logic
├── .env                    # Database URI and config
```
🧪 Testing Strategy (TDD)
All routes are covered by automated tests:

✔️ Sweet creation and validation

✔️ Deletion with error handling

✔️ Search queries (case-insensitive, filtered)

✔️ Sort operations

✔️ Inventory adjustments

✔️ Health check and bad routes

Each test file inserts fixed static data using POST /sweets so that tests run cleanly without direct Mongoose calls.

🛢️ Mongoose Usage
Sweet schema includes:

id (unique, required)

name (required, trimmed)

category (validated from enum)

price and quantity (non-negative, required)

Custom error responses are defined for:

Duplicate IDs

Invalid categories

Negative values

Non-existent documents

