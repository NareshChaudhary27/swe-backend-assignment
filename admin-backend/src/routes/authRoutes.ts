import express from 'express';
import { adminLogin } from '../controllers/authController';

const router = express.Router();

router.post('/login', adminLogin);

export default router;