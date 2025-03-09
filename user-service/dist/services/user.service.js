"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/user.service.ts
const db_1 = __importDefault(require("../db")); // Import the database connection
class UserService {
    async createUser(userData) {
        console.log('UserService.createUser called with:', userData);
        if (!userData.username || !userData.email || !userData.password) {
            throw new Error('Username, email, and password are required');
        }
        const { username, email, password } = userData; // Destructure user data
        const passwordHash = 'dummy-hashed-password'; // Placeholder - replace with bcrypt hashing
        try {
            const query = `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email;
      `;
            const values = [username, email, passwordHash];
            const result = await db_1.default.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0]; // Return the newly created user
            }
            else {
                throw new Error('Failed to create user in database'); // Should not usually happen, but handle case where no rows are returned
            }
        }
        catch (error) {
            console.error('Database error creating user:', error);
            throw new Error(`Error creating user: ${error.message}`); // Re-throw with a more user-friendly message
        }
    }
    async loginUser(loginData) {
        console.log('UserService.loginUser called with:', loginData);
        if (!loginData.email || !loginData.password) {
            throw new Error('Email and password are required for login');
        }
        const { email, password } = loginData;
        try {
            const query = `
        SELECT id, username, email, password_hash
        FROM users
        WHERE email = $1;
      `;
            const values = [email];
            const result = await db_1.default.query(query, values);
            if (result.rows.length === 0) {
                throw new Error('Invalid credentials'); // No user found with this email
            }
            const user = result.rows[0];
            const passwordHashFromDB = user.password_hash;
            // Password verification - Replace dummy check with bcrypt compare
            if (password !== 'password123') { //  Dummy password check - REPLACE WITH BCRYPT COMPARE
                throw new Error('Invalid credentials'); // Incorrect password
            }
            const token = 'dummy-auth-token-' + Date.now(); // Dummy token - replace with JWT token generation
            return token;
        }
        catch (error) {
            console.error('Database error during login:', error);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map