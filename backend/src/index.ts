import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from '@/config/db';
import { errorHandler, notFound } from '@/middlewares/errorHandler';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

// Placeholder root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 Not Found Middleware
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
