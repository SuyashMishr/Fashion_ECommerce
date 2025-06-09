const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Includes graceful shutdown and logs lifecycle events.
 * @returns {Promise<mongoose.Connection>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(`MongoDB connected at: ${conn.connection.host}`);

    // Handle successful connection
    mongoose.connection.on('connected', () => {
      logger.info('Mongoose connected to MongoDB');
    });

    // Handle connection error
    mongoose.connection.on('error', (err) => {
      logger.error(`Mongoose connection error: ${err.message}`);
    });

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
