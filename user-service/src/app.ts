// src/app.ts
import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes'; // Import auth routes

const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/auth', authRoutes); // Mount auth routes under /auth path

// Default route for API health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Budfin User Service is running' });
});

export default app;