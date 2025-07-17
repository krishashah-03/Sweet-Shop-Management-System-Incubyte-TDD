# 🍬 Sweet Shop Management System (TDD + MongoDB)

A backend application for managing a sweet shop's inventory, built with **Test-Driven Development** using **Node.js, Express, and MongoDB**. Includes CRUD operations, purchase/restock logic, filtering, sorting, and a full Jest test suite.

## 🚀 Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript runtime |
| Express.js | API routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| Jest | Test framework |
| Supertest | HTTP integration testing |
| dotenv | Manage environment variables |

## 📁 Project Structure

```
backend/
├── app.js                  # Main server entry point
├── db.js                   # MongoDB connection
├── .env                    # Environment variables
├── jest.setup.js           # Test DB setup/teardown
├── package.json            # Scripts & metadata
├── controllers/
│   └── sweetController.js  # Business logic
├── models/
│   └── Sweet.js            # Mongoose schema
├── routes/
│   └── sweets.js           # Express routes
└── tests/
    ├── api.test.js
    ├── inventory.test.js
    ├── search.test.js
    ├── sort.test.js
    ├── sweets.test.js
    └── validation.test.js
```

## ✅ Features

- Add new sweets with validation
- Delete sweets by ID
- Purchase sweets (decrease quantity)
- Restock sweets (increase quantity)
- Filter by name, category, and price range
- Sort by price or quantity
- Jest + Supertest test suite connected to MongoDB

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/sweet-shop-backend.git
cd sweet-shop-backend/backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the project root:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/sweetshop
NODE_ENV=test
```

> ✅ Make sure MongoDB is running locally.

## 🧪 Running Tests

```bash
npm test
```

This runs all test files:

- `api.test.js`
- `inventory.test.js`
- `search.test.js`
- `sort.test.js`
- `sweets.test.js`
- `validation.test.js`

✅ All test cases are connected to MongoDB and teardown properly.

## 🚀 Start the Server

```bash
npm start
```

Visit in browser:

```
http://localhost:8080/health
```

Expected output:

```json
{ "status": "API is healthy" }
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API health |
| GET | `/sweets` | Get all sweets |
| POST | `/sweets` | Add new sweet |
| DELETE | `/sweets/:id` | Delete sweet by ID |
| POST | `/sweets/purchase` | Purchase sweet (reduce quantity) |
| POST | `/sweets/restock` | Restock sweet (increase quantity) |
| GET | `/sweets/search` | Filter by name/category/price |
| GET | `/sweets/sort` | Sort sweets by price or quantity |


## 👨‍💻 Author

**Krisha Shah**   
🔗 GitHub: [github.com/krishashah-03](https://github.com/krishashah-03)
