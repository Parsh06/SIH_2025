import { Router } from 'express';
import {
  getAllFarmers,
  getFarmerById,
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmerFullDetails
} from '@/controllers/farmer.controller';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();

router.get('/', getAllFarmers);
router.get('/:id', getFarmerById);
router.post('/', validateRequest(['name', 'phoneNumber', 'location']), createFarmer);
router.put('/:id', validateRequest(['name', 'phoneNumber', 'location']), updateFarmer);
router.delete('/:id', deleteFarmer);
router.get('/:id/full', getFarmerFullDetails);

export default router;