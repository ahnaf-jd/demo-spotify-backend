# demo-spotify-backend

A demo Spotify-style backend built with Node.js, Express, MongoDB, and ImageKit for media storage.

## 🚀 Overview
This project provides a backend API for user authentication, music uploads, and album management.

Key features:
- User registration and login with JWT cookie authentication
- Role-based access control for `artist` actions
- Music upload via `multer` middleware
- Album creation with music references
- MongoDB data models for users, music tracks, and albums
- External file storage support through ImageKit

## 🧱 Tech Stack
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs` for password hashing
- `cookie-parser` for session cookie handling
- `multer` for file upload handling
- ImageKit for file storage

## 📦 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
IMGKIT_PRIVATE_KEY=your_imagekit_private_key
```

3. Start the application:

```bash
npm run dev
```

The server will run at `http://localhost:3000` by default.

## 🧾 API Endpoints

### Authentication
- `POST /api/auth/register`
  - Create a new user
  - Request body: `{ username, email, password, role }`
  - `role` defaults to `user` if omitted

- `POST /api/auth/login`
  - Login using `username` or `email` and `password`
  - Response returns user information and sets a JWT cookie

- `POST /api/auth/logout`
  - Clear the authentication cookie

### Music
- `POST /api/music/upload`
  - Upload a music file and create a music record
  - Requires authentication and `artist` role
  - Must include `title` in the body and `music` file in form-data

- `POST /api/music/album`
  - Create a new album
  - Requires authentication and `artist` role
  - Request body: `{ title, musicIds }`

- `GET /api/music`
  - Fetch all music items
  - Requires authentication

- `GET /api/music/albums`
  - Fetch all albums with artist and music details
  - Requires authentication

## 📁 Project Structure

- `server.js` - entry point that loads env variables, connects to MongoDB, and starts the server
- `src/app.js` - Express app setup and route registration
- `src/routes/` - API route definitions
- `src/controllers/` - request handlers for auth and music features
- `src/middlewares/` - authentication and authorization middleware
- `src/models/` - Mongoose schemas for users, music, and albums
- `src/services/` - external services such as ImageKit upload
- `src/db/db.js` - MongoDB connection helper

## ⚠️ Notes
- This API stores JWTs in cookies, so frontend requests should include credentials when calling protected routes.
- Ensure `IMGKIT_PRIVATE_KEY` is configured when uploading music, otherwise uploads will fail.

## ✅ Improvements You Can Add
- Input validation with `express-validator`
- Refresh token support
- Better error handling and validation messages
- Support search, pagination, or streaming playback

