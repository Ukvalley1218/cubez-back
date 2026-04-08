import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { submitInquiry } from '../controllers/inquiryController.js';

const router = express.Router();

// Validation rules
const inquiryValidation = [
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
  body('investmentAmount')
    .optional()
    .isIn(['$50k - $100k', '$100k - $250k', '$250k - $500k', '$500k+'])
    .withMessage('Invalid investment amount'),
  body('investmentType')
    .optional()
    .isIn(['Private Lending', 'Real Estate Equity', 'Development Financing', 'Distressed Assets', 'Not Sure Yet'])
    .withMessage('Invalid investment type'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
];

// @route   POST /api/inquiries
// @desc    Submit investor inquiry
// @access  Public
router.post('/', inquiryValidation, validate, submitInquiry);

export default router;