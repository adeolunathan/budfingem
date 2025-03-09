// src/services/user.service.ts
import db from '../db'; // Import the database connection
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs (if not using database default)

interface User {
  id: string;
  username: string;
  email: string;
}

class UserService {
  public async createUser(userData: any): Promise<User> {
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
      const result = await db.query(query, values);

      if (result.rows.length > 0) {
        return result.rows[0] as User; // Return the newly created user
      } else {
        throw new Error('Failed to create user in database'); // Should not usually happen, but handle case where no rows are returned
      }
    } catch (error: any) {
      console.error('Database error creating user:', error);
      throw new Error(`Error creating user: ${error.message}`); // Re-throw with a more user-friendly message
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

      // Password verification - Replace dummy check with bcrypt compare
      if (password !== 'password123') { //  Dummy password check - REPLACE WITH BCRYPT COMPARE
        throw new Error('Invalid credentials'); // Incorrect password
      }

      const token = 'dummy-auth-token-' + Date.now(); // Dummy token - replace with JWT token generation
      return token;

    } catch (error: any) {
      console.error('Database error during login:', error);
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

export default UserService;