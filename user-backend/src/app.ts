import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminbackend')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
// app.use('/audit', auditRoutes);
app.use('/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Admin Backend running on port ${PORT}`);
});
export default app;  // Add this line to export the app