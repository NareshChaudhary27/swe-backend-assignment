# User Backend Service

Handles user accounts and notes.

## Features
- User signup and login
- Create and manage notes
- Secure data access

## API Endpoints

### User Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`

### Notes
- Get all notes: `GET /notes`
- Create note: `POST /notes`
- Update note: `PATCH /notes/:id`
- Delete note: `DELETE /notes/:id`

## How to Use

1. Start the service:
```bash
npm run dev