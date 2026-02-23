import express from 'express';
import Admin from '../models/Admin.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;
        const admin = await Admin.findOne({ username: id, password });

        if (admin) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Update credentials route
router.put('/credentials', async (req, res) => {
    try {
        const { currentId, currentPassword, newId, newPassword } = req.body;
        const admin = await Admin.findOne({ username: currentId, password: currentPassword });

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid current credentials' });
        }

        admin.username = newId;
        admin.password = newPassword;
        await admin.save();

        res.json({ success: true, message: 'Credentials updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Get all bookings route
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

export default router;
