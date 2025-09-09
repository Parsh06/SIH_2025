import { Router, Request, Response } from 'express';
import Farmer from '@/models/farmer.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const farmers = await Farmer.find();
  res.json(farmers);
});

router.get('/:id', async (req: Request, res: Response) => {
  const farmer = await Farmer.findById(req.params.id);
  res.json(farmer);
});

router.post('/', async (req: Request, res: Response) => {
  const { name, phoneNumber, location } = req.body;
  const farmer = new Farmer({ name, phoneNumber, location });
  await farmer.save();
  res.status(201).json(farmer);
});

router.put('/:id', async (req: Request, res: Response) => {
  const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(farmer);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Farmer.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;