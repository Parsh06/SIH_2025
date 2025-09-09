import { Router } from 'express';
import farmerRoutes from '@/routes/api/farmer.routes';
import farmRoutes from '@/routes/api/farm.routes';
import activityRoutes from '@/routes/api/activity.routes';
import advisoryRoutes from '@/routes/api/advisory.routes';
import reminderRoutes from '@/routes/api/reminder.routes';

const router = Router();

router.use('/farmers', farmerRoutes);
router.use('/farms', farmRoutes);
router.use('/activities', activityRoutes);
router.use('/advisories', advisoryRoutes);
router.use('/reminders', reminderRoutes);

export default router;