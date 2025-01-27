import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    select: false 
  }
}, {
  timestamps: true 
});

export const User = mongoose.model('User', UserSchema);