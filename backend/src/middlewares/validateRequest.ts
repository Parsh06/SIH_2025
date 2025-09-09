import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Example: Check if body exists
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
  next();
};