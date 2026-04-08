import Field from '../models/Field.js';
import Section from '../models/Section.js';

// @desc    Get fields by section ID
// @route   GET /api/fields/section/:sectionId
// @access  Public
export const getFieldsBySection = async (req, res) => {
  try {
    const fields = await Field.find({ section: req.params.sectionId }).sort({ createdAt: 1 });

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
      count: fields.length,
      data: fieldsMap
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch fields'
    });
  }
};

// @desc    Get all fields (admin)
// @route   GET /api/admin/fields
// @access  Private (Admin)
export const getAllFields = async (req, res) => {
  try {
    const { sectionId } = req.query;
    const query = {};

    if (sectionId) query.section = sectionId;

    const fields = await Field.find(query)
      .populate('section', 'name slug page')
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      count: fields.length,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch fields'
    });
  }
};

// @desc    Create or update field (upsert)
// @route   POST /api/admin/fields
// @access  Private (Admin)
export const createField = async (req, res) => {
  try {
    const { section, fieldName, fieldType, value, repeaterValue } = req.body;

    // Check if section exists
    const sectionDoc = await Section.findById(section);
    if (!sectionDoc) {
      return res.status(400).json({
        success: false,
        message: 'Section not found'
      });
    }

    // Check if field already exists for this section
    let field = await Field.findOne({ section, fieldName });

    if (field) {
      // Update existing field
      field.fieldType = fieldType || field.fieldType;
      if (fieldType === 'repeater') {
        field.repeaterValue = repeaterValue || [];
        field.value = null;
      } else {
        field.value = value;
        field.repeaterValue = [];
      }
      field.updatedAt = Date.now();
      await field.save();
    } else {
      // Create new field
      field = await Field.create({
        section,
        fieldName,
        fieldType: fieldType || 'text',
        value: fieldType === 'repeater' ? null : value,
        repeaterValue: fieldType === 'repeater' ? (repeaterValue || []) : []
      });
    }

    res.json({
      success: true,
      message: 'Field saved successfully',
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save field'
    });
  }
};

// @desc    Batch update fields for a section
// @route   PUT /api/admin/fields/batch/:sectionId
// @access  Private (Admin)
export const batchUpdateFields = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { fields } = req.body; // Array of { fieldName, fieldType, value, repeaterValue }

    // Check if section exists
    const sectionDoc = await Section.findById(sectionId);
    if (!sectionDoc) {
      return res.status(400).json({
        success: false,
        message: 'Section not found'
      });
    }

    const updatedFields = [];

    for (const fieldData of fields) {
      const { fieldName, fieldType, value, repeaterValue } = fieldData;

      let field = await Field.findOne({ section: sectionId, fieldName });

      if (field) {
        // Update existing field
        field.fieldType = fieldType || field.fieldType;
        if (fieldType === 'repeater') {
          field.repeaterValue = repeaterValue || [];
          field.value = null;
        } else {
          field.value = value;
          field.repeaterValue = [];
        }
        field.updatedAt = Date.now();
        await field.save();
      } else {
        // Create new field
        field = await Field.create({
          section: sectionId,
          fieldName,
          fieldType: fieldType || 'text',
          value: fieldType === 'repeater' ? null : value,
          repeaterValue: fieldType === 'repeater' ? (repeaterValue || []) : []
        });
      }

      updatedFields.push(field);
    }

    res.json({
      success: true,
      message: 'Fields saved successfully',
      data: updatedFields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save fields'
    });
  }
};

// @desc    Update single field
// @route   PUT /api/admin/fields/:id
// @access  Private (Admin)
export const updateField = async (req, res) => {
  try {
    const { fieldName, fieldType, value, repeaterValue } = req.body;

    const field = await Field.findById(req.params.id);

    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }

    if (fieldName) field.fieldName = fieldName;
    if (fieldType) field.fieldType = fieldType;

    if (field.fieldType === 'repeater') {
      field.repeaterValue = repeaterValue || [];
      field.value = null;
    } else {
      field.value = value;
      field.repeaterValue = [];
    }

    field.updatedAt = Date.now();
    await field.save();

    res.json({
      success: true,
      message: 'Field updated successfully',
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update field'
    });
  }
};

// @desc    Delete field
// @route   DELETE /api/admin/fields/:id
// @access  Private (Admin)
export const deleteField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);

    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Field not found'
      });
    }

    res.json({
      success: true,
      message: 'Field deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete field'
    });
  }
};

// @desc    Get section with all fields data
// @route   GET /api/sections/:sectionId/data
// @access  Public
export const getSectionWithData = async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);

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
        section: section,
        fields: fieldsMap
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch section data'
    });
  }
};