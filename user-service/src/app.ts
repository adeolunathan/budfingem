// src/app.ts
import cors from 'cors'; // Import the cors middleware
import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
// ... other imports

const app = express();

// Enable CORS for requests from your frontend origin (http://localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173', //  VERY IMPORTANT: Replace with your frontend URL if different
    credentials: true, // If you need to send cookies with CORS requests (not needed for JWT in headers here, but can be set to true)
}));

app.use(express.json());
// ... other middleware ...
app.use('/auth', authRoutes);
// ... routes ...
app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Budfin User Service is running' });
});

export default app;