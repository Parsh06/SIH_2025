import { Router } from 'express';
import {
  getAllFarmers,
  getFarmerById,
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmerFullDetails,
  getFarmerByUid
} from '@/controllers/farmer.controller';
import { validateRequest } from '@/middlewares/validateRequest';
import { authenticateFirebase } from '@/middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateFirebase, getAllFarmers);
router.get('/me', authenticateFirebase, getFarmerByUid);
router.get('/:id', authenticateFirebase, getFarmerById);
router.post('/', authenticateFirebase, validateRequest(['name', 'phoneNumber', 'location']), createFarmer);
router.put('/:id', authenticateFirebase, validateRequest(['name', 'phoneNumber', 'location']), updateFarmer);
router.delete('/:id', authenticateFirebase, deleteFarmer);
router.get('/:id/full', authenticateFirebase, getFarmerFullDetails);

export default router;