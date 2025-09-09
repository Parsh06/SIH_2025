import { Request, Response, NextFunction } from 'express';
import Activity from '@/models/activity.model';

export const getAllActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await Activity.find().populate('farm');
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('farm');
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};