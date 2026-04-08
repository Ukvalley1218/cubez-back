import express from 'express';
import SectionGroup from '../models/SectionGroup.js';
import ContentSection from '../models/ContentSection.js';

const router = express.Router();

// Get all section groups (public)
router.get('/', async (req, res) => {
  try {
    const { page, section } = req.query;
    const query = { isActive: true };

    if (page) query.page = page;
    if (section) query.section = section;

    const sections = await SectionGroup.find(query).sort({ order: 1 });
    res.json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get section groups by page (public)
router.get('/page/:page', async (req, res) => {
  try {
    const sections = await SectionGroup.find({
      page: req.params.page,
      isActive: true
    }).sort({ order: 1 });
    res.json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single section group by key (public)
router.get('/key/:key', async (req, res) => {
  try {
    const section = await SectionGroup.findOne({
      key: req.params.key,
      isActive: true
    });
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get all section groups (including inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const sections = await SectionGroup.find().sort({ page: 1, order: 1 });
    res.json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get by ID
router.get('/admin/:id', async (req, res) => {
  try {
    const section = await SectionGroup.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create section group
router.post('/admin', async (req, res) => {
  try {
    const section = new SectionGroup(req.body);
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update section group and sync to ContentSection
router.put('/admin/:id', async (req, res) => {
  try {
    const section = await SectionGroup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    // Sync title section to ContentSection
    await ContentSection.findOneAndUpdate(
      { key: section.key },
      {
        title: section.title,
        subtitle: section.subtitle,
        content: section.description,
        image: section.backgroundImage,
        ctaText: section.ctaText,
        ctaLink: section.ctaLink,
        isActive: section.isActive
      }
    );

    // Sync items to ContentSection
    if (section.items && section.items.length > 0) {
      // Determine the key pattern
      const baseKey = section.key;

      for (let i = 0; i < section.items.length; i++) {
        const item = section.items[i];

        // Find matching content section by pattern
        const pattern1 = `${baseKey}-${i + 1}`; // e.g., home-whychooseus-1
        const pattern2 = item.key || null;

        // Try to find existing content section
        const existingPattern1 = await ContentSection.findOne({
          key: { $regex: new RegExp(`^${section.section}-\\d+$`) },
          page: section.page
        });

        // Update or create item in ContentSection
        const itemKey = `${section.section}-${i + 1}`;
        const existingItems = await ContentSection.find({
          page: section.page,
          section: section.section
        }).sort({ order: 1 });

        if (existingItems[i]) {
          // Update existing item
          await ContentSection.findByIdAndUpdate(existingItems[i]._id, {
            title: item.title || '',
            description: item.description || '',
            content: item.content || '',
            icon: item.icon || '',
            image: item.image || '',
            number: item.number || '',
            highlight: item.highlight || '',
            value: item.value || '',
            label: item.label || '',
            order: i,
            isActive: section.isActive
          });
        }
      }
    }

    // Sync highlights
    if (section.highlights && section.highlights.length > 0) {
      await ContentSection.findOneAndUpdate(
        { key: `${section.key}-highlights` },
        {
          content: JSON.stringify(section.highlights.map(h => h.text)),
          isActive: section.isActive
        }
      );
    }

    res.json({ success: true, data: section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete section group
router.delete('/admin/:id', async (req, res) => {
  try {
    const section = await SectionGroup.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    res.json({ success: true, message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;