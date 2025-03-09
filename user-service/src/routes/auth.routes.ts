// src/routes/auth.routes.ts
import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller'; // Import AuthController

const router: Router = express.Router();
const authController = new AuthController(); // Create an instance of AuthController

// Define authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;