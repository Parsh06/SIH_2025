import { Router, Request, Response } from 'express';
import Advisory from '@/models/advisory.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const advisories = await Advisory.find();
  res.json(advisories);
});

router.get('/:id', async (req: Request, res: Response) => {
  const advisory = await Advisory.findById(req.params.id);
  res.json(advisory);
});

router.post('/', async (req: Request, res: Response) => {
  const advisory = new Advisory(req.body);
  await advisory.save();
  res.status(201).json(advisory);
});

router.put('/:id', async (req: Request, res: Response) => {
  const advisory = await Advisory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(advisory);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Advisory.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
