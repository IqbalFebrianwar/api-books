import { Router } from 'express';
import { getUsers, createUser, getUserId, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserId);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
