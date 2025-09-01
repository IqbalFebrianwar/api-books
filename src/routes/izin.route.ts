import Router from 'express';
import {
  getAllIzin,
  getIzinById,
  createIzin,
  updateIzin,
  deleteIzin,
} from '../controllers/izin.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.get('/', getAllIzin);
router.get('/:id', getIzinById);
router.post('/', createIzin);
router.put('/:id', updateIzin);
router.delete('/:id', deleteIzin);

export default router;
