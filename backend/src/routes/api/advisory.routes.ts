import { Router } from 'express';
import { listAdvisories, getAdvisoryById, createAdvisory, updateAdvisory, deleteAdvisory } from '@/controllers/advisory.controllers';

const router = Router();

router.get('/', listAdvisories);

router.get('/:id', getAdvisoryById);

router.post('/', createAdvisory);

router.put('/:id', updateAdvisory);

router.delete('/:id', deleteAdvisory);

export default router;
