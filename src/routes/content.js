import express from 'express';
import ContentSection from '../models/ContentSection.js';

const router = express.Router();

// Admin: Get all content (including inactive) - MUST be before /:key route
router.get('/admin/all', async (req, res) => {
  try {
    const content = await ContentSection.find().sort({ page: 1, order: 1 });
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all content sections (public)
router.get('/', async (req, res) => {
  try {
    const { page, section } = req.query;
    const query = { isActive: true };

    if (page) query.page = page;
    if (section) query.section = section;

    const content = await ContentSection.find(query).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get content by key (public)
router.get('/:key', async (req, res) => {
  try {
    const content = await ContentSection.findOne({
      key: req.params.key,
      isActive: true
    });

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create content section
router.post('/admin', async (req, res) => {
  try {
    const content = new ContentSection(req.body);
    await content.save();
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update content section
router.put('/admin/:id', async (req, res) => {
  try {
    const content = await ContentSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    res.json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete content section
router.delete('/admin/:id', async (req, res) => {
  try {
    const content = await ContentSection.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    res.json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;