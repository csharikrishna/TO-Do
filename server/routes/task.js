import express from 'express';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/task.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

router.post('/add', authMiddleware, addTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
