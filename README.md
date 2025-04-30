# Ard-backEnd

A robust, scalable backend service powering the Ard platform.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg)
![Express](https://img.shields.io/badge/Express-4.x-000000.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248.svg)

## 📋 Overview

This repository contains the server-side codebase for the Ard platform, providing a secure, high-performance API with database integration, authentication, and business logic implementation.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/WesamAzbaidy/Ard-backEnd.git

# Navigate to project directory
cd Ard-backEnd

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start dev
```

The API will be available at [http://localhost:3500](http://localhost:3500) by default.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Nest** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication

## 📁 Project Structure

```
Ard-backEnd/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── validators/          # Input validation
│   ├── app.js               # Express app setup
│   └── server.js            # Entry point
├── tests/                   # Test files
│   ├── integration/         # Integration tests
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker compose setup
└── config files (.env, package.json, etc.)
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm start` | Start production server |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint codebase |
| `npm run seed` | Seed database with initial data |

## 🔒 API Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Obtain a token via `/api/auth/login`
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer your_token_here
   ```

## 📊 Database

- MongoDB connection is configured in `src/config/database.js`
- Mongoose models are defined in `src/models/`
- Default database connection string can be overridden in `.env`

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

```


## 📞 Contact

- **Wesam Azbaidy** - w.azbaidy1999@gmail.com
---
