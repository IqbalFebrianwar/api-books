import Router from 'express';
import {
  getAllCuti,
  getCutiById,
  createCuti,
  updateCuti,
  deleteCuti,
} from '../controllers/cuti.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.get('/', getAllCuti);
router.get('/:id', getCutiById);
router.post('/', createCuti);
router.put('/:id', updateCuti);
router.delete('/:id', deleteCuti);

export default router;
