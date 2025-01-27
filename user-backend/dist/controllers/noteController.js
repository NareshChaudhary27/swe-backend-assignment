"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const Note_1 = require("../models/Note");
// Modified to ensure proper typing
const getNotes = async (req, res) => {
    try {
        const notes = await Note_1.Note.find({ userId: req.user.userId });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
};
exports.getNotes = getNotes;
const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = new Note_1.Note({
            title,
            description,
            userId: req.user.userId
        });
        await note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating note' });
    }
};
exports.createNote = createNote;
const updateNote = async (req, res) => {
    try {
        const note = await Note_1.Note.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user.userId
        }, req.body, { new: true });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const note = await Note_1.Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
};
exports.deleteNote = deleteNote;
