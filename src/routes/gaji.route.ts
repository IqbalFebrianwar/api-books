import Router from 'express';
import {
  getAllGaji,
  getGajiById,
  createGaji,
  updateGaji,
  deleteGaji,
} from '../controllers/gaji.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.get('/', getAllGaji);
router.get('/:id', getGajiById);
router.post('/', createGaji);
router.put('/:id', updateGaji);
router.delete('/:id', deleteGaji);

export default router;
