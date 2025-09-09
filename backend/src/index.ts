import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from '@/config/db';
import { errorHandler, notFound } from '@/middlewares/errorHandler';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// 404 Not Found Middleware
app.use(notFound);

// Global error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
