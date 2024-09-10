import { Router } from 'express';
import { getBook, createBooks, getBookId, updateBooks, deleteBooks } from '../controllers/book.controller';

const router = Router();

router.get('/books', getBook);
router.post('/books', createBooks);
router.get('/books/:id', getBookId);
router.patch('/books/:id', updateBooks);
router.delete('/books/:id', deleteBooks);

export default router;