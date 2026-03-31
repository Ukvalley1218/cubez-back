import express from 'express';
import { getFaqs } from '../controllers/faqController.js';

const router = express.Router();

// @route   GET /api/faqs
// @desc    Get FAQs by category
// @access  Public
router.get('/', getFaqs);

export default router;