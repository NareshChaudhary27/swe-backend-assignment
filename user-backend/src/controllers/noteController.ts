
import { Request, Response } from 'express';
import { Note } from '../models/Note';

// Define an interface for the authenticated request
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  }
}

// Modified to ensure proper typing
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find({ userId: (req as AuthenticatedRequest).user.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const note = new Note({
      title,
      description,
      userId: (req as AuthenticatedRequest).user.userId
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findOneAndUpdate(
      { 
        _id: req.params.id, 
        userId: (req as AuthenticatedRequest).user.userId 
      },
      req.body,
      { new: true }
    );
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      userId: (req as AuthenticatedRequest).user.userId 
    });
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};