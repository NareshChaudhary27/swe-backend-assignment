import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  role: 'superadmin' | 'admin';
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' }
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);