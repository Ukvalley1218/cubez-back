import Inquiry from '../models/Inquiry.js';
import { sendInquiryEmail, sendConfirmationEmail } from '../utils/email.js';

// @desc    Submit investor inquiry
// @route   POST /api/inquiries
// @access  Public
export const submitInquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, investmentAmount, investmentType, message } = req.body;

    // Create inquiry record
    const inquiry = await Inquiry.create({
      firstName,
      lastName,
      email,
      phone,
      investmentAmount,
      investmentType,
      message
    });

    // Send notification email to admin
    try {
      await sendInquiryEmail({ firstName, lastName, email, phone, investmentAmount, investmentType, message });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    // Send confirmation email to user
    try {
      await sendConfirmationEmail(email, `${firstName} ${lastName}`);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry'
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/admin/inquiries
// @access  Private (Admin)
export const getInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch inquiries'
    });
  }
};

// @desc    Get single inquiry
// @route   GET /api/admin/inquiries/:id
// @access  Private (Admin)
export const getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('assignedTo', 'name email');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch inquiry'
    });
  }
};

// @desc    Update inquiry
// @route   PUT /api/admin/inquiries/:id
// @access  Private (Admin)
export const updateInquiry = async (req, res) => {
  try {
    const { status, notes, assignedTo } = req.body;

    const updateData = { updatedAt: Date.now() };
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update inquiry'
    });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/admin/inquiries/:id
// @access  Private (Admin)
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete inquiry'
    });
  }
};