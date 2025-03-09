// src/config/config.ts
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dbUser: process.env.DB_USER || 'budfin_user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  dbName: process.env.DB_NAME || 'budfindb',
  jwtSecret: process.env.JWT_SECRET || 'your-development-secret-key', // Development secret - CHANGE IN PRODUCTION!
};