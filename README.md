# 🚀 User Management System (NestJS + MongoDB)

A high-performance REST API built with **NestJS**, designed to handle large datasets efficiently. On startup, the system automatically populates the database with **2,000,000 random user records**.

---

## 🛠 Tech Stack

- **Runtime:** Node.js v22+
- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** MongoDB
- **ORM:** Mongoose
- **Authentication:** JWT (Passport.js)
- **Data Generation:** Faker.js

---

## 🚀 Getting Started

### 1️⃣ Setup Environment

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_super_secret_key_here
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-management
```

2️⃣ Installation & Launch

```Bash
# Install dependencies
npm install

# Start MongoDB instance via Docker
docker-compose up -d

# Start application in development mode
npm run start:dev
```

## 📡 API Endpoints

🔐 Authentication
The add-user endpoint is protected. You must provide a JWT Token in the header:

## Authorization: Bearer <your_token>

### 👤 User Management

| Method   | Endpoint               | Description                        | Auth |
| :------- | :--------------------- | :--------------------------------- | :--: |
| **POST** | `/api/v1/add-user`     | Create a new user & log to console |  ✅  |
| **GET**  | `/api/v1/get-users`    | Get paginated users with filters   |  ❌  |
| **GET**  | `/api/v1/get-user/:id` | Get specific user by ID            |  ❌  |

---

**Query Parameters for `GET /api/v1/get-users`:**

- **page**: Page number (default: 1)
- **limit**: Records per page (default: 10)
- **search**: Filter by **name**, **email**, or **phone** (case-insensitive)

---

## ⚡ Database Seeding

On the first application launch, an automated **Seeding Process** kicks in:

- **Target**: 2,000,000 records.
- **Method**: Batch processing using `insertMany` for maximum performance.
- **Fields**: Full Name, Email, Phone Number, and Birthday.
- **Performance**: Optimized with database indexes on searchable fields (name, email, phone).

---

## 📂 Project Structure

The project follows a modular architecture, keeping authentication and user logic separated:

```text
src/
├── auth/           # JWT Strategy, Guards and Module
├── users/          # Users logic: Controller, Service and DB Schema
│   └── schemas/    # Mongoose User Schema definitions
├── app.module.ts   # Root module (app orchestration)
└── main.ts         # Application entry point (Bootstrap)

```

## 🐳 Quick Start with Docker

Run the entire application (API + MongoDB) with a single command:

```bash
docker-compose up --build
```

Once started, the API will be available at:
👉 http://localhost:3000/api/v1/get-users

Note: The database seeding (2M users) starts automatically. Please wait a moment for the logs to confirm completion.
