import { Request, Response, NextFunction } from 'express';
import Reminder from '@/models/reminder.model';
import Farmer from '@/models/farmer.model';

// Extend Request interface locally
interface AuthenticatedRequest extends Request {
  user?: { uid: string };
}

export const listReminders = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.user!;
    const farmer = await Farmer.findOne({ firebaseUid: uid });
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    const reminders = await Reminder.find({ farmer: farmer._id });
    res.json(reminders);
  } catch (error) {
    next(error);
  }
};

export const getReminderById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.user!;
    const farmer = await Farmer.findOne({ firebaseUid: uid });
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    const reminder = await Reminder.findOne({ _id: req.params.id, farmer: farmer._id });
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.user!;
    const farmer = await Farmer.findOne({ firebaseUid: uid });
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    const reminder = new Reminder({
      ...req.body,
      farmer: farmer._id,
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.user!;
    const farmer = await Farmer.findOne({ firebaseUid: uid });
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, farmer: farmer._id }, 
      req.body, 
      { new: true }
    );
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.user!;
    const farmer = await Farmer.findOne({ firebaseUid: uid });
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, farmer: farmer._id });
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};