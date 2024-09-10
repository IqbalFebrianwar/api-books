import { Router } from 'express';
import { createLoans } from '../controllers/loan.controller';

const router = Router();

router.post('/loans', createLoans)

export default router