import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define interfaces for type safety
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  }
}

export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate that email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    
    // If no user is found, return error
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Ensure we have both passwords before comparing
    if (!user.password || !password) {
      res.status(500).json({ message: 'Invalid user data' });
      return;
    }

    // Compare password with additional error handling
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
    } catch (bcryptError) {
      console.error('Password comparison error:', bcryptError);
      res.status(500).json({ message: 'Error during authentication' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};