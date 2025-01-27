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
    select: false  // This ensures password isn't returned in normal queries
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

export const User = mongoose.model('User', UserSchema);