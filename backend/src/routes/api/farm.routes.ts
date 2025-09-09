import { Router, Request, Response } from 'express';
import Farm from '@/models/farm.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const farms = await Farm.find();
  res.json(farms);
});

router.get('/:id', async (req: Request, res: Response) => {
  const farm = await Farm.findById(req.params.id);
  res.json(farm);
});

router.post('/', async (req: Request, res: Response) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.status(201).json(farm);
});

router.put('/:id', async (req: Request, res: Response) => {
  const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(farm);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;