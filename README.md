# Support Ticket Management Backend

A RESTful API for managing customer support tickets, built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack

- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT Authentication (access + refresh tokens)
- bcryptjs for password hashing
- Cookie-based token storage

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_SECRET=your_access_token_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_ACCESS_TOKEN_MAX_AGE=9000
COOKIE_REFRESH_MAX_AGE=604800000
```

### Scripts

```bash
npm run dev      # Development with hot reload (tsx watch)
npm run build    # Build for production (tsup)
npm run start    # Run production build
```

## API Reference

Base URL: `/api/v1`

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive tokens |
| POST | `/auth/refresh-token` | Refresh access token |

### Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/user` | Staff | Get all users |

### Tickets

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/ticket` | Customer | Create a ticket |
| GET | `/ticket` | Customer, Staff | Get all tickets |
| GET | `/ticket/:id` | Customer, Staff | Get ticket by ID |
| PATCH | `/ticket/:id` | Customer | Update a ticket |
| DELETE | `/ticket/:id` | Customer | Delete a ticket |
| PATCH | `/ticket/:id/assign` | Staff | Assign ticket to staff |
| POST | `/ticket/:id/comments` | Customer, Staff | Add a comment |
| GET | `/ticket/:id/comments` | Customer, Staff | Get ticket comments |

## Roles

- `Customer` — can create, update, and delete their own tickets, and add comments
- `Staff` — can view all tickets, assign tickets, and add comments

## Ticket Schema

```
title       String
description String
status      "Open" | "In Progress" | "Resolved" | "Closed"
priority    "Low" | "Medium" | "High"
customer    ObjectId (ref: User)
assignedTo  ObjectId (ref: User) — optional
```

## Deployment

This project is configured for deployment on [Vercel](https://support-ticket-management-backend.vercel.app) via `vercel.json`.
