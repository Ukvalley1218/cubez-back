import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim(),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactValidation, validate, submitContact);

export default router;