import express from 'express';
import Benefit from '../models/Benefit.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Get all active benefits (public)
router.get('/', async (req, res) => {
  try {
    const benefits = await Benefit.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: benefits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get all benefits (protected)
router.get('/admin', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    const benefits = await Benefit.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: benefits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create benefit (protected)
router.post('/admin', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    const benefit = new Benefit(req.body);
    await benefit.save();
    res.status(201).json({ success: true, data: benefit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update benefit (protected)
router.put('/admin/:id', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!benefit) {
      return res.status(404).json({ success: false, message: 'Benefit not found' });
    }

    res.json({ success: true, data: benefit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete benefit (protected)
router.delete('/admin/:id', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndDelete(req.params.id);

    if (!benefit) {
      return res.status(404).json({ success: false, message: 'Benefit not found' });
    }

    res.json({ success: true, message: 'Benefit deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;