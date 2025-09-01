import { Router } from 'express';
import { getUsers, createUser, getUserId, updateUser, deleteUser } from '../controllers/user.controller';
import checkTokenOrigin from '../utils/middleware.token';

const router = Router();

router.use(checkTokenOrigin)

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserId);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
