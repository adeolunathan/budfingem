// src/config/config.ts
import dotenv from 'dotenv'; // Import dotenv for environment variable loading

dotenv.config(); // Load environment variables from .env file (if exists)

export default {
  port: process.env.PORT || 3001,
  dbHost: process.env.DB_HOST || 'localhost',       // Database host, default localhost
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Database port, default 5432
  dbUser: process.env.DB_USER || 'budfin_user',     // Database username, default budfin_user
  dbPassword: process.env.DB_PASSWORD || 'password', // Database password, default 'password' (CHANGE THIS!)
  dbName: process.env.DB_NAME || 'budfindb',        // Database name, default budfindb
};