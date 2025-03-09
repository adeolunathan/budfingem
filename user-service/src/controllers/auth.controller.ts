// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service'; // Import UserService

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create an instance of UserService
  }

  public register = async (req: Request, res: Response) => {
    try {
      // Call UserService to register user (not implemented yet)
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      // Call UserService to login user (not implemented yet)
      const token = await this.userService.loginUser(req.body);
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error: any) {
      console.error('Error logging in user:', error);
      res.status(401).json({ message: 'Login failed', error: error.message }); // 401 Unauthorized for login failures
    }
  };
}

export default AuthController;