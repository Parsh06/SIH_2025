import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '@/config/db';
import { errorHandler, notFound } from '@/middlewares/errorHandler';
import apiRoutes from "@/routes/api.routes"

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// API
app.use('/api', apiRoutes);

// 404 Not Found Middleware
app.use(notFound);

// Global error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
