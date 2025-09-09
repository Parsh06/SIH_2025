import { Router } from 'express';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '@/controllers/activity.controller';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post(
  '/',
  validateRequest(['farm', 'type', 'description']),
  createActivity
);
router.put(
  '/:id',
  validateRequest(['farm', 'type', 'description']),
  updateActivity
);
router.delete('/:id', deleteActivity);

export default router;