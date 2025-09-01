import { Router } from "express";
import {
  getSettings,
  getSettingById,
  createSettings,
  updateSettings,
  deleteSettings,
} from "../controllers/setting.controller";
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();
router.use(checkTokenOrigin)

router.get("/settings", getSettings);
router.get("/settings/:id", getSettingById);
router.post("/settings", createSettings);
router.patch("/settings/:id", updateSettings);
router.delete("/settings/:id", deleteSettings);

export default router;
