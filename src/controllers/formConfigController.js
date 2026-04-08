import FormConfig from '../models/FormConfig.js';

// Get all form configurations (public)
export const getPublicFormConfigs = async (req, res) => {
  try {
    const forms = await FormConfig.find({ isActive: true })
      .select('-emailNotification.recipients')
      .sort({ name: 1 });

    res.json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get form configuration by key (public)
export const getFormConfigByKey = async (req, res) => {
  try {
    const form = await FormConfig.findOne({
      formKey: req.params.key,
      isActive: true
    }).select('-emailNotification.recipients');

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all form configurations
export const getAllFormConfigs = async (req, res) => {
  try {
    const forms = await FormConfig.find()
      .sort({ name: 1 });

    res.json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get form configuration by ID
export const getFormConfigById = async (req, res) => {
  try {
    const form = await FormConfig.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create form configuration
export const createFormConfig = async (req, res) => {
  try {
    const form = new FormConfig(req.body);
    await form.save();

    res.status(201).json({ success: true, data: form });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: Update form configuration
export const updateFormConfig = async (req, res) => {
  try {
    const form = await FormConfig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.json({ success: true, data: form });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: Delete form configuration
export const deleteFormConfig = async (req, res) => {
  try {
    const form = await FormConfig.findByIdAndDelete(req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.json({ success: true, message: 'Form configuration deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Duplicate form configuration
export const duplicateFormConfig = async (req, res) => {
  try {
    const original = await FormConfig.findById(req.params.id);

    if (!original) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    const duplicate = new FormConfig({
      ...original.toObject(),
      _id: undefined,
      formKey: `${original.formKey}-copy`,
      name: `${original.name} (Copy)`,
      createdAt: undefined,
      updatedAt: undefined
    });

    await duplicate.save();

    res.status(201).json({ success: true, data: duplicate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default {
  getPublicFormConfigs,
  getFormConfigByKey,
  getAllFormConfigs,
  getFormConfigById,
  createFormConfig,
  updateFormConfig,
  deleteFormConfig,
  duplicateFormConfig
};