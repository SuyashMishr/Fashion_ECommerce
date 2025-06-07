const dotenv = require('dotenv');
const logger = require('./utils/logger');
const connectDB = require('./config/dbConnection');

// Load environment variables
dotenv.config();

// Import the Express app
const app = require('./app');

// ✅ Import seed function
const createAdmin = require('./scripts/seedAdmin');

const PORT = process.env.PORT || 4000;

connectDB()
  .then(async () => {
    // ✅ Seed default admin
    await createAdmin();

    // ✅ Start server
    app.listen(PORT, () => {
      const mode = process.env.NODE_ENV || 'development';
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`✅ Mode: ${mode}`);
      logger.info(`🌐 Frontend URL: ${frontendUrl}`);
      logger.info(`🩺 Health check: http://localhost:${PORT}/health`);
      logger.info(`📦 API Docs: http://localhost:${PORT}/api`);

      console.log(`🚀 Server started on http://localhost:${PORT} in ${mode} mode`);
    });
  })
  .catch((err) => {
    logger.error('❌ Failed to connect to DB or start server:', err);
  });
