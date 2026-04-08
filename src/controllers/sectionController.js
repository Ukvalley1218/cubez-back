import Section from '../models/Section.js';
import Page from '../models/Page.js';
import Field from '../models/Field.js';

// @desc    Get sections by page ID
// @route   GET /api/sections/page/:pageId
// @access  Public
export const getSectionsByPage = async (req, res) => {
  try {
    const sections = await Section.find({
      page: req.params.pageId,
      isActive: true
    }).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sections'
    });
  }
};

// @desc    Get sections by page slug
// @route   GET /api/sections/slug/:slug
// @access  Public
export const getSectionsBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    const sections = await Section.find({
      page: page._id,
      isActive: true
    }).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sections'
    });
  }
};

// @desc    Get single section with fields
// @route   GET /api/sections/:id
// @access  Public
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    const fields = await Field.find({ section: section._id });
    const fieldsMap = {};

    fields.forEach(field => {
      if (field.fieldType === 'repeater') {
        fieldsMap[field.fieldName] = field.repeaterValue || [];
      } else {
        fieldsMap[field.fieldName] = field.value;
      }
    });

    res.json({
      success: true,
      data: {
        ...section.toObject(),
        fieldsData: fieldsMap
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch section'
    });
  }
};

// @desc    Get all sections (admin)
// @route   GET /api/admin/sections
// @access  Private (Admin)
export const getAllSections = async (req, res) => {
  try {
    const { pageId } = req.query;
    const query = {};

    if (pageId) query.page = pageId;

    const sections = await Section.find(query)
      .populate('page', 'name slug')
      .sort({ page: 1, order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sections'
    });
  }
};

// @desc    Create section
// @route   POST /api/admin/sections
// @access  Private (Admin)
export const createSection = async (req, res) => {
  try {
    const { page, name, slug, description, fields, order, isActive } = req.body;

    // Check if page exists
    const pageDoc = await Page.findById(page);
    if (!pageDoc) {
      return res.status(400).json({
        success: false,
        message: 'Page not found'
      });
    }

    // Check if slug already exists for this page
    const existingSection = await Section.findOne({ page, slug });
    if (existingSection) {
      return res.status(400).json({
        success: false,
        message: 'Section with this slug already exists for this page'
      });
    }

    const section = await Section.create({
      page,
      name,
      slug,
      description: description || '',
      fields: fields || [],
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      data: section
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create section'
    });
  }
};

// @desc    Update section
// @route   PUT /api/admin/sections/:id
// @access  Private (Admin)
export const updateSection = async (req, res) => {
  try {
    const { name, slug, description, fields, order, isActive } = req.body;

    // Check if slug already exists (for different section)
    if (slug) {
      const section = await Section.findById(req.params.id);
      if (section) {
        const existingSection = await Section.findOne({
          slug,
          page: section.page,
          _id: { $ne: req.params.id }
        });
        if (existingSection) {
          return res.status(400).json({
            success: false,
            message: 'Section with this slug already exists for this page'
          });
        }
      }
    }

    const section = await Section.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(fields && { fields }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    res.json({
      success: true,
      message: 'Section updated successfully',
      data: section
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update section'
    });
  }
};

// @desc    Delete section
// @route   DELETE /api/admin/sections/:id
// @access  Private (Admin)
export const deleteSection = async (req, res) => {
  try {
    // Delete all fields associated with this section
    await Field.deleteMany({ section: req.params.id });

    const section = await Section.findByIdAndDelete(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    res.json({
      success: true,
      message: 'Section deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete section'
    });
  }
};

// @desc    Reorder sections
// @route   PUT /api/admin/sections/reorder
// @access  Private (Admin)
export const reorderSections = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }

    for (const item of orders) {
      await Section.findByIdAndUpdate(item.id, { order: item.order, updatedAt: Date.now() });
    }

    res.json({
      success: true,
      message: 'Sections reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reorder sections'
    });
  }
};