// src/routes/authRoutes.ts
import express, { Router } from 'express';
import { login, register } from '../controllers/authController';

const router: Router = express.Router();

// Directly use the controller functions as middleware
router.post('/register', register);
router.post('/login', login);

export default router;