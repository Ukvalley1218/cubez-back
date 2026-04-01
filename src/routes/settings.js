import express from 'express';
import SiteSettings from '../models/SiteSettings.js';

const router = express.Router();

// Admin: Get all settings (MUST be before /:key route)
router.get('/admin/list', async (req, res) => {
  try {
    const settings = await SiteSettings.find().sort({ group: 1, key: 1 });
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all public settings
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.find().sort({ group: 1, key: 1 });

    // Convert to object for easier use
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.type === 'json'
        ? JSON.parse(setting.value)
        : setting.type === 'number'
          ? Number(setting.value)
          : setting.type === 'boolean'
            ? setting.value === 'true'
            : setting.value;
    });

    res.json({ success: true, data: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await SiteSettings.findOne({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }

    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create or update setting
router.post('/admin', async (req, res) => {
  try {
    const { key, value, type, group, label, description } = req.body;

    let setting = await SiteSettings.findOne({ key });

    if (setting) {
      // Update existing
      setting.value = value;
      if (type) setting.type = type;
      if (group) setting.group = group;
      if (label) setting.label = label;
      if (description) setting.description = description;
      await setting.save();
    } else {
      // Create new
      setting = new SiteSettings({ key, value, type, group, label, description });
      await setting.save();
    }

    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Bulk update settings
router.post('/admin/bulk', async (req, res) => {
  try {
    const { settings } = req.body;

    for (const { key, value } of settings) {
      await SiteSettings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true }
      );
    }

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Update setting
router.put('/admin/:key', async (req, res) => {
  try {
    const setting = await SiteSettings.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, runValidators: true }
    );

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }

    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin: Delete setting
router.delete('/admin/:key', async (req, res) => {
  try {
    const setting = await SiteSettings.findOneAndDelete({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }

    res.json({ success: true, message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;