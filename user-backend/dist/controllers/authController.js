"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res, next) => {
    try {
        // Validate that email and password are provided
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        // Find user by email and explicitly select the password field
        const user = await User_1.User.findOne({ email }).select('+password');
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
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
        }
        catch (bcryptError) {
            console.error('Password comparison error:', bcryptError);
            res.status(500).json({ message: 'Error during authentication' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Validate input
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email' });
            return;
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create new user with hashed password
        const user = new User_1.User({
            name,
            email,
            password: hashedPassword
        });
        // Save user to database
        await user.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
