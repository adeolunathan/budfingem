"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class UserService {
    async createUser(userData) {
        console.log('UserService.createUser called with:', userData);
        if (!userData.username || !userData.email || !userData.password) {
            throw new Error('Username, email, and password are required');
        }
        const { username, email, password } = userData;
        try {
            // 1. Generate a salt
            const saltRounds = 10; // Recommended salt rounds for bcrypt
            const salt = await bcrypt_1.default.genSalt(saltRounds);
            // 2. Hash the password using the salt
            const passwordHash = await bcrypt_1.default.hash(password, salt);
            const query = `
        INSERT INTO users (username, email, password_hash, roles) -- Include roles in INSERT
        VALUES ($1, $2, $3, $4)                             -- Add $4 placeholder for roles
        RETURNING id, username, email, roles;               -- Return roles as well
      `;
            const values = [username, email, passwordHash, ['user']]; // Set default role as ["user"]
            const result = await db_1.default.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            else {
                throw new Error('Failed to create user in database');
            }
        }
        catch (error) {
            console.error('Database error creating user:', error);
            throw new Error(`Error creating user: ${error.message}`);
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
            // 3. Compare the provided password with the stored password hash using bcrypt.compare()
            const passwordMatch = await bcrypt_1.default.compare(password, passwordHashFromDB);
            if (!passwordMatch) {
                throw new Error('Invalid credentials'); // Passwords do not match
            }
            // JWT Generation:
            const payload = {
                userId: user.id,
                email: user.email,
                username: user.username,
                roles: user.roles, // Include roles in the JWT payload
            };
            const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
                expiresIn: '1h', // Token expiration time (e.g., 1 hour) - adjust as needed
            });
            return token; // Return the generated JWT
        }
        catch (error) {
            console.error('Database error during login:', error);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map