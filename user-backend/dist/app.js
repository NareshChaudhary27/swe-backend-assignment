"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware"); // Add this line
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminbackend')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use('/auth', authRoutes_1.default);
app.use('/notes', authMiddleware_1.auth, noteRoutes_1.default); // Add auth middleware here
app.listen(PORT, () => {
    console.log(`Admin Backend running on port ${PORT}`);
});
exports.default = app;
