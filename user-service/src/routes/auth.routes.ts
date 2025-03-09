// src/routes/auth.routes.ts
import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middleware/authMiddleware'; // Import authMiddleware

const router: Router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
// Protected endpoint route - now with authMiddleware:
router.get('/profile', authMiddleware, authController.profile); // Apply authMiddleware to /profile

export default router;