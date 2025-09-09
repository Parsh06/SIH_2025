import { Request, Response, NextFunction } from 'express';
import Advisory from '@/models/advisory.model';

export const listAdvisories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisories = await Advisory.find();
    res.json(advisories);
  } catch (error) {
    next(error);
  }
};

export const getAdvisoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisory = await Advisory.findById(req.params.id);
    if (!advisory) {
      res.status(404);
      throw new Error('Advisory not found');
    }
    res.json(advisory);
  } catch (error) {
    next(error);
  }
};

export const createAdvisory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisory = new Advisory(req.body);
    await advisory.save();
    res.status(201).json(advisory);
  } catch (error) {
    next(error);
  }
};

export const updateAdvisory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisory = await Advisory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!advisory) {
      res.status(404);
      throw new Error('Advisory not found');
    }
    res.json(advisory);
  } catch (error) {
    next(error);
  }
};

export const deleteAdvisory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisory = await Advisory.findByIdAndDelete(req.params.id);
    if (!advisory) {
      res.status(404);
      throw new Error('Advisory not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


