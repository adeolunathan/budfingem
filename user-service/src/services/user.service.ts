import db from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[]; // Add roles property as an array of strings
}

class UserService {
  public async createUser(userData: any): Promise<User> {
    console.log('UserService.createUser called with:', userData);
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Username, email, and password are required');
    }

    const { username, email, password } = userData;

    try {
      // 1. Generate a salt
      const saltRounds = 10; // Recommended salt rounds for bcrypt
      const salt = await bcrypt.genSalt(saltRounds);

      // 2. Hash the password using the salt
      const passwordHash = await bcrypt.hash(password, salt);

      const query = `
        INSERT INTO users (username, email, password_hash, roles) -- Include roles in INSERT
        VALUES ($1, $2, $3, $4)                             -- Add $4 placeholder for roles
        RETURNING id, username, email, roles;               -- Return roles as well
      `;
      const values = [username, email, passwordHash, ['user']]; // Set default role as ["user"]
      const result = await db.query(query, values);

      if (result.rows.length > 0) {
        return result.rows[0] as User;
      } else {
        throw new Error('Failed to create user in database');
      }
    } catch (error: any) {
      console.error('Database error creating user:', error);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  public async loginUser(loginData: any): Promise<string> {
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
      const result = await db.query(query, values);

      if (result.rows.length === 0) {
        throw new Error('Invalid credentials'); // No user found with this email
      }

      const user = result.rows[0];
      const passwordHashFromDB = user.password_hash;

      // 3. Compare the provided password with the stored password hash using bcrypt.compare()
      const passwordMatch = await bcrypt.compare(password, passwordHashFromDB);

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

      const token = jwt.sign(payload, config.jwtSecret, { // Sign the JWT
        expiresIn: '1h', // Token expiration time (e.g., 1 hour) - adjust as needed
      });

      return token; // Return the generated JWT

    } catch (error: any) {
      console.error('Database error during login:', error);
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

export default UserService;