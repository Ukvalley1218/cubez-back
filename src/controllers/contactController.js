import Contact from '../models/Contact.js';
import { sendContactEmail, sendConfirmationEmail } from '../utils/email.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Create contact record
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    // Send notification email to admin
    try {
      await sendContactEmail({ firstName, lastName, email, phone, message });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      // Continue even if email fails
    }

    // Send confirmation email to user
    try {
      await sendConfirmationEmail(email, `${firstName} ${lastName}`);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/admin/contacts
// @access  Private (Admin)
export const getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
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
      message: error.message || 'Failed to fetch contacts'
    });
  }
};

// @desc    Get single contact
// @route   GET /api/admin/contacts/:id
// @access  Private (Admin)
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch contact'
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/admin/contacts/:id
// @access  Private (Admin)
export const updateContact = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update contact'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private (Admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete contact'
    });
  }
};