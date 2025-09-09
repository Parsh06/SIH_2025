import { Request, Response, NextFunction } from 'express';
import Reminder from '@/models/reminder.model';

export const listReminders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    next(error);
  }
};

export const getReminderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      res.status(404);
      throw new Error('Reminder not found');
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reminder) {
      res.status(404);
      throw new Error('Reminder not found');
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      res.status(404);
      throw new Error('Reminder not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};