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

### 1. Setup Environment

Create a `.env` file in the root directory and define your variables:

```env
JWT_SECRET=your_super_secret_key_here
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-management2. InstallationBash# Install dependencies
npm install
3. Run with DockerThe easiest way to start the MongoDB instance:Bashdocker-compose up -d
4. Start ApplicationBash# Development mode
npm run start:dev
📡 API Endpoints🔐 AuthenticationThe add-user endpoint is protected. You must provide a JWT Token in the header:Authorization: Bearer <your_token>👤 User ManagementMethodEndpointDescriptionAuthPOST/api/v1/add-userCreate a new user & log to console✅GET/api/v1/get-usersGet paginated users with filters❌GET/api/v1/get-user/:idGet specific user by ID❌Query Parameters for GET /api/v1/get-users:page: Page number (default: 1)limit: Records per page (default: 10)search: Optional filter by name, email, or phone (case-insensitive)⚡ Database SeedingOn the first application launch, an automated Seeding Process kicks in:Target: 2,000,000 records.Method: Batch processing using insertMany for high performance.Fields: Full Name, Email, Phone Number, and Birthday.Performance: Optimized with database indexes on searchable fields.📂 Project StructurePlaintextsrc/
├── auth/           # JWT Strategy, Guards and Module
├── users/          # Users logic, Controller, Service and Schema
│   └── schemas/    # Mongoose User Schema
├── app.module.ts   # Main Application Module
└── main.ts         # Entry point
📝 Linting & FormattingThe project follows strict ESLint (Flat Config) and Prettier rules:Bash# Run linting check
npm run lint

# Auto-fix formatting issues
npm run lint -- --fix

---
```
