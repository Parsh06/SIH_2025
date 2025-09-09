import { Request, Response, NextFunction } from 'express';
import Farmer from '@/models/farmer.model';
import Farm from '@/models/farm.model';
import Reminder from '@/models/reminder.model';

export const getAllFarmers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    next(error);
  }
};

export const getFarmerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json(farmer);
  } catch (error) {
    next(error);
  }
};

export const createFarmer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json(farmer);
  } catch (error) {
    next(error);
  }
};

export const updateFarmer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json(farmer);
  } catch (error) {
    next(error);
  }
};

export const deleteFarmer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getFarmerFullDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmerId = req.params.id;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const farms = await Farm.find({ farmer: farmerId })
      .populate('activities');

    const reminders = await Reminder.find({ farmer: farmerId });

    const result = {
      farmer,
      farms,
      reminders,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

