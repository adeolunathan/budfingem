// src/routes/auth.routes.ts
import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
// Protected endpoint route:
router.get('/profile', authController.profile); // <-- Make sure this line is present and correct

export default router;