import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = admin.password === password;
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: admin._id, 
        role: admin.role
      },
      process.env.JWT_SECRET || 'admin_secret',
      { expiresIn: '1h' }
    );

    res.json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};