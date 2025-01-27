// src/routes/noteRoutes.ts
import express, { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController';

const router: Router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;