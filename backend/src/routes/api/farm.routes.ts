import { Router } from 'express';
import {
  getAllFarms,
  getFarmById,
  createFarm,
  updateFarm,
  deleteFarm,
} from '@/controllers/farm.controller';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();

router.get('/', getAllFarms);
router.get('/:id', getFarmById);
router.post(
  '/',
  validateRequest(['farmer', 'sizeInAcres', 'soilType', 'irrigation', 'location', 'crops']),
  createFarm
);
router.put(
  '/:id',
  validateRequest(['farmer', 'sizeInAcres', 'soilType', 'irrigation', 'location', 'crops']),
  updateFarm
);
router.delete('/:id', deleteFarm);

export default router;
