import { Router, Request, Response } from 'express';
import Reminder from '@/models/reminder.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const reminders = await Reminder.find();
  res.json(reminders);
});

router.get('/:id', async (req: Request, res: Response) => {
  const reminder = await Reminder.findById(req.params.id);
  res.json(reminder);
});

router.post('/', async (req: Request, res: Response) => {
  const reminder = new Reminder(req.body);
  await reminder.save();
  res.status(201).json(reminder);
});

router.put('/:id', async (req: Request, res: Response) => {
  const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reminder);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
