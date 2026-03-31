import express from 'express';
import ProcessStep from '../models/ProcessStep.js';

const router = express.Router();

// Get all active process steps
router.get('/', async (req, res) => {
  try {
    const { page } = req.query;
    const query = { isActive: true };
    if (page) query.page = page;

    const steps = await ProcessStep.find(query).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: steps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get all process steps
router.get('/admin', async (req, res) => {
  try {
    const steps = await ProcessStep.find().sort({ page: 1, order: 1 });
    res.json({ success: true, data: steps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create process step
router.post('/admin', async (req, res) => {
  try {
    const step = new ProcessStep(req.body);
    await step.save();
    res.status(201).json({ success: true, data: step });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update process step
router.put('/admin/:id', async (req, res) => {
  try {
    const step = await ProcessStep.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!step) {
      return res.status(404).json({ success: false, message: 'Process step not found' });
    }

    res.json({ success: true, data: step });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete process step
router.delete('/admin/:id', async (req, res) => {
  try {
    const step = await ProcessStep.findByIdAndDelete(req.params.id);

    if (!step) {
      return res.status(404).json({ success: false, message: 'Process step not found' });
    }

    res.json({ success: true, message: 'Process step deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;