const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();

// Parse incoming JSON payloads
app.use(express.json());

// Parse cookies for user authentication tokens
app.use(cookieParser());

// Register routes for authentication and music features
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;