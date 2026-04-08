import express from 'express';
import ContentSection from '../models/ContentSection.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Get all content sections (public)
router.get('/', async (req, res) => {
  try {
    const { page, section } = req.query;
    const query = { isActive: true };

    if (page) query.page = page;
    if (section) query.section = section;

    const content = await ContentSection.find(query).sort({ order: 1, createdAt: 1 });
    console.log(`📊 Fetched content for page "${page || 'all'}":`, content.length, 'items');
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('❌ Error fetching content:', error.message);
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

// Admin: Get all content (including inactive) - MUST be before /:key route
router.get('/admin/all', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    const content = await ContentSection.find().sort({ page: 1, order: 1 });
    console.log('📊 Fetched all content:', content.length, 'items');
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('❌ Error fetching content:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create content section (protected)
router.post('/admin', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    console.log('➕ Creating content:', req.body.key, req.body);
    const content = new ContentSection(req.body);
    await content.save();
    console.log('✅ Content created:', content.key);
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    console.error('❌ Error creating content:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update content section (protected)
router.put('/admin/:id', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
  try {
    console.log('📝 Updating content:', req.params.id, req.body);
    const content = await ContentSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    console.log('✅ Content updated:', content.key, '- Fields:', Object.keys(req.body).join(', '));
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('❌ Error updating content:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete content section (protected)
router.delete('/admin/:id', protect, restrictTo('admin', 'superadmin'), async (req, res) => {
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