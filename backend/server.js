import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['https://gill-barber.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gill-barber')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Seed default admin if it doesn't exist
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            await Admin.create({ username: 'admin', password: 'admin@123' });
            console.log('Default admin seeded.');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
