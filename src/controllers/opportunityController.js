import Opportunity from '../models/Opportunity.js';

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
export const getOpportunities = async (req, res) => {
  try {
    const { status, type, featured } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (featured) query.featured = featured === 'true';

    const opportunities = await Opportunity.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch opportunities'
    });
  }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
// @access  Public
export const getOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch opportunity'
    });
  }
};

// @desc    Create opportunity
// @route   POST /api/admin/opportunities
// @access  Private (Admin)
export const createOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create opportunity'
    });
  }
};

// @desc    Update opportunity
// @route   PUT /api/admin/opportunities/:id
// @access  Private (Admin)
export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      message: 'Opportunity updated successfully',
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update opportunity'
    });
  }
};

// @desc    Delete opportunity
// @route   DELETE /api/admin/opportunities/:id
// @access  Private (Admin)
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete opportunity'
    });
  }
};