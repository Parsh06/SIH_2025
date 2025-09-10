import { Router } from 'express';
import { listReminders, getReminderById, createReminder, updateReminder, deleteReminder } from '@/controllers/reminder.controllers';
import { authenticateFirebase } from '@/middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateFirebase, listReminders);

router.get('/:id', authenticateFirebase, getReminderById);

router.post('/', authenticateFirebase, createReminder);

router.put('/:id', authenticateFirebase, updateReminder);

router.delete('/:id', authenticateFirebase, deleteReminder);

export default router;
