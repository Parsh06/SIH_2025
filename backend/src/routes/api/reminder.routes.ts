import { Router } from 'express';
import { listReminders, getReminderById, createReminder, updateReminder, deleteReminder } from '@/controllers/reminder.controllers';

const router = Router();

router.get('/', listReminders);

router.get('/:id', getReminderById);

router.post('/', createReminder);

router.put('/:id', updateReminder);

router.delete('/:id', deleteReminder);

export default router;
