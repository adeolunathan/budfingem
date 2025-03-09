"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/config.ts
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for environment variable loading
dotenv_1.default.config(); // Load environment variables from .env file (if exists)
exports.default = {
    port: process.env.PORT || 3001,
    dbHost: process.env.DB_HOST || 'localhost', // Database host, default localhost
    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Database port, default 5432
    dbUser: process.env.DB_USER || 'budfin_user', // Database username, default budfin_user
    dbPassword: process.env.DB_PASSWORD || 'password', // Database password, default 'password' (CHANGE THIS!)
    dbName: process.env.DB_NAME || 'budfindb', // Database name, default budfindb
};
//# sourceMappingURL=config.js.map