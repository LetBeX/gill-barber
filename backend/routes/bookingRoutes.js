import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ success: true, message: 'Booking completed successfully!', booking: newBooking });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create booking', error: error.message });
    }
});

export default router;
