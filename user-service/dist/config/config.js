"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3001,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dbUser: process.env.DB_USER || 'budfin_user',
    dbPassword: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_NAME || 'budfindb',
    jwtSecret: process.env.JWT_SECRET || 'your-development-secret-key', // Development secret - CHANGE IN PRODUCTION!
};
//# sourceMappingURL=config.js.map