const mongoose = require('mongoose');

// Connect to MongoDB using the connection URL from environment variables.
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB connection error:', error);
  }
}

module.exports = connectDB;