import Faq from '../models/Faq.js';

// @desc    Get FAQs by category
// @route   GET /api/faqs
// @access  Public
export const getFaqs = async (req, res) => {
  try {
    const { category, page = 'home' } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;

    const faqs = await Faq.find(query).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch FAQs'
    });
  }
};

// @desc    Get all FAQs (admin)
// @route   GET /api/admin/faqs
// @access  Private (Admin)
export const getAllFaqs = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};
    if (category) query.category = category;

    const faqs = await Faq.find(query).sort({ category: 1, order: 1 });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch FAQs'
    });
  }
};

// @desc    Create FAQ
// @route   POST /api/admin/faqs
// @access  Private (Admin)
export const createFaq = async (req, res) => {
  try {
    const { category, question, answer, order, isActive } = req.body;

    const faq = await Faq.create({
      category,
      question,
      answer,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create FAQ'
    });
  }
};

// @desc    Update FAQ
// @route   PUT /api/admin/faqs/:id
// @access  Private (Admin)
export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update FAQ'
    });
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/admin/faqs/:id
// @access  Private (Admin)
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete FAQ'
    });
  }
};