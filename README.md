# SWE Backend Project

A comprehensive backend system demonstrating role-based access control (RBAC) and secure cross-service communication using TypeScript, Express, and MongoDB.

## Project Overview

This project consists of two independent backend services:
- **User Backend**: Handles user authentication and note management
- **Admin Backend**: Manages administrative operations with privileged access

### Key Features

- Role-based access control (RBAC)
- Secure cross-backend communication
- JWT authentication
- MongoDB data sharing
- TypeScript implementation
- Comprehensive error handling

## Architecture

### Database Structure
- **Users Collection**: Shared between both backends
  - Shared fields: _id, name, email
  - Private fields: password hash, preferences
- **Notes Collection**: Accessible by both backends
  - Shared fields: _id, title, status
  - Private fields: description, userId
- **Audit Logs**: Admin backend exclusive

### Security Features
- JWT-based authentication
- Role-based access control
- Secure API endpoints
- Input validation
- Error handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- TypeScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NareshChaudhary27/swe-backend-assignment.git
cd swe-backend