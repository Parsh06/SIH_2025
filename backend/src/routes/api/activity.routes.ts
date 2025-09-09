import { Router, Request, Response } from 'express';
import Activity from '@/models/activity.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const activities = await Activity.find();
  res.json(activities);
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id);
  res.json(activity);
});

router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(activity);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;