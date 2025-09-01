import { Router } from 'express';
import {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan
} from '../controllers/karyawan.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.get('/', getAllKaryawan);
router.get('/:id', getKaryawanById);
router.post('/', createKaryawan);
router.put('/:id', updateKaryawan);
router.delete('/:id', deleteKaryawan);

export default router;
