import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  deleteUser 
} from '../controllers/userController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateAdmin, getAllUsers);
router.get('/:id', authenticateAdmin, getUserById);
router.delete('/:id', authenticateAdmin, deleteUser);

export default router;