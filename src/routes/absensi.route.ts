import Router from 'express';
import {
  getAllAbsensi,
  getAbsensiById,
  createAbsensi,
  updateAbsensi,
  deleteAbsensi,
} from '../controllers/absensi.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.get('/', getAllAbsensi);
router.get('/:id', getAbsensiById);
router.post('/', createAbsensi);
router.put('/:id', updateAbsensi);
router.delete('/:id', deleteAbsensi);

export default router;
