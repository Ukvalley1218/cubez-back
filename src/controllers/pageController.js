import Page from '../models/Page.js';
import Section from '../models/Section.js';

// @desc    Get all pages (public)
// @route   GET /api/pages
// @access  Public
export const getPages = async (req, res) => {
  try {
    const pages = await Page.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch pages'
    });
  }
};

// @desc    Get single page by slug
// @route   GET /api/pages/:slug
// @access  Public
export const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.json({
      success: true,
      data: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch page'
    });
  }
};

// @desc    Get page with all sections and fields
// @route   GET /api/pages/:slug/content
// @access  Public
export const getPageContent = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    const sections = await Section.find({ page: page._id, isActive: true })
      .sort({ order: 1, createdAt: 1 });

    // Import Field model dynamically to avoid circular dependency
    const Field = (await import('../models/Field.js')).default;

    // Get fields for each section
    const sectionsWithFields = await Promise.all(
      sections.map(async (section) => {
        const fields = await Field.find({ section: section._id });
        const fieldsMap = {};

        fields.forEach(field => {
          if (field.fieldType === 'repeater') {
            fieldsMap[field.fieldName] = field.repeaterValue || [];
          } else {
            fieldsMap[field.fieldName] = field.value;
          }
        });

        return {
          ...section.toObject(),
          fieldsData: fieldsMap
        };
      })
    );

    res.json({
      success: true,
      data: {
        page,
        sections: sectionsWithFields
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch page content'
    });
  }
};

// @desc    Get all pages (admin)
// @route   GET /api/admin/pages
// @access  Private (Admin)
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch pages'
    });
  }
};

// @desc    Create page
// @route   POST /api/admin/pages
// @access  Private (Admin)
export const createPage = async (req, res) => {
  try {
    const { name, slug, title, description, order, isActive, seoTitle, seoDescription } = req.body;

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: 'Page with this slug already exists'
      });
    }

    const page = await Page.create({
      name,
      slug,
      title: title || '',
      description: description || '',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || ''
    });

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create page'
    });
  }
};

// @desc    Update page
// @route   PUT /api/admin/pages/:id
// @access  Private (Admin)
export const updatePage = async (req, res) => {
  try {
    const { name, slug, title, description, order, isActive, seoTitle, seoDescription } = req.body;

    // Check if slug already exists (for different page)
    if (slug) {
      const existingPage = await Page.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingPage) {
        return res.status(400).json({
          success: false,
          message: 'Page with this slug already exists'
        });
      }
    }

    const page = await Page.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update page'
    });
  }
};

// @desc    Delete page
// @route   DELETE /api/admin/pages/:id
// @access  Private (Admin)
export const deletePage = async (req, res) => {
  try {
    // Delete all sections and fields associated with this page
    const sections = await Section.find({ page: req.params.id });
    const sectionIds = sections.map(s => s._id);

    // Import Field model
    const Field = (await import('../models/Field.js')).default;
    await Field.deleteMany({ section: { $in: sectionIds } });
    await Section.deleteMany({ page: req.params.id });

    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.json({
      success: true,
      message: 'Page deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete page'
    });
  }
};

// @desc    Reorder pages
// @route   PUT /api/admin/pages/reorder
// @access  Private (Admin)
export const reorderPages = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }

    for (const item of orders) {
      await Page.findByIdAndUpdate(item.id, { order: item.order, updatedAt: Date.now() });
    }

    res.json({
      success: true,
      message: 'Pages reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reorder pages'
    });
  }
};