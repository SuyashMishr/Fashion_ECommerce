const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Basic middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple auth routes for now
const authRoutes = express.Router();

authRoutes.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

authRoutes.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint - coming soon',
    data: { token: 'demo-token' }
  });
});

authRoutes.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Register endpoint - coming soon',
    data: { token: 'demo-token' }
  });
});

// Basic logger
const logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`)
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Fashion E-Commerce API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      health: '/health'
    }
  });
});

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  logger.info(`Frontend URL: ${process.env.FRONTEND_URL}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API: http://localhost:${PORT}/api`);
});

module.exports = app;
