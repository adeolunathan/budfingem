// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface DecodedTokenPayload { // Define interface for decoded JWT payload
  userId: string;
  email: string;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract JWT from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authentication required: No token provided' }); // 401 if no token
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedTokenPayload; // Verify and decode JWT
    req.user = decoded; // Attach user payload to the request object (augmenting Request type - see below)
    next(); // Call next middleware or route handler  <-- CRUCIAL: Ensure next() is being called in success case
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ message: 'Authentication failed: Invalid token' }); // 401 for invalid token
    // Do NOT call next() in error case, as authentication failed.
  }
};

// To augment the Express Request type to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedTokenPayload; // Optionally add 'user' property to Request interface
    }
  }
}

export default authMiddleware;