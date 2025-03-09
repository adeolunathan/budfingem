// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service';

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const token = await this.userService.loginUser(req.body);
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error: any) {
      console.error('Error logging in user:', error);
      res.status(401).json({ message: 'Login failed', error: error.message });
    }
  };

  public profile = async (req: Request, res: Response) => {
    try {
      // Get the user information from req.user (populated by authMiddleware)
      const user = req.user;
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Return user profile information
      res.status(200).json({
        message: 'Profile retrieved successfully',
        user: {
            userId: user.userId,
            email: user.email,
            username: user.username,
            roles: user.roles,
        }
      });
    } catch (error: any) {
      console.error('Error accessing profile:', error);
      res.status(500).json({ message: 'Error accessing profile', error: error.message });
    }
  };
}

export default AuthController;