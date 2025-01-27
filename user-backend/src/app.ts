import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import { auth } from './middleware/authMiddleware';  // Add this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminbackend')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/notes', auth, noteRoutes);  // Add auth middleware here

app.listen(PORT, () => {
  console.log(`Admin Backend running on port ${PORT}`);
});

export default app;