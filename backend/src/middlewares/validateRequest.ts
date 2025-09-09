import { Request, Response, NextFunction } from 'express';

export const validateRequest = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if req.body exists and is an object
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        message: 'Request body is missing or invalid',
      });
    }

    const missingFields = fields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missingFields.join(', ')}`,
      });
    }

    next();
  };
};