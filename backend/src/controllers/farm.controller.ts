import { Request, Response, NextFunction } from 'express';
import Farm from '@/models/farm.model';

export const getAllFarms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farms = await Farm.find().populate('farmer');
    res.json(farms);
  } catch (error) {
    next(error);
  }
};

export const getFarmById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farm = await Farm.findById(req.params.id).populate('farmer');
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    next(error);
  }
};

export const createFarm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farm = new Farm(req.body);
    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    next(error);
  }
};

export const updateFarm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    next(error);
  }
};

export const deleteFarm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
