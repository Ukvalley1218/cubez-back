import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import {
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
} from '../controllers/inquiryController.js';
import {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from '../controllers/opportunityController.js';
import {
  updateMetrics,
  updateMetric
} from '../controllers/metricController.js';
import {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faqController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// ===== Contact Routes =====
router.get('/contacts', getContacts);
router.get('/contacts/:id', getContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

// ===== Inquiry Routes =====
router.get('/inquiries', getInquiries);
router.get('/inquiries/:id', getInquiry);
router.put('/inquiries/:id', updateInquiry);
router.delete('/inquiries/:id', deleteInquiry);

// ===== Opportunity Routes =====
const opportunityValidation = [
  body('type').isIn(['Private Lending', 'Real Estate Equity', 'Development Financing', 'Distressed Assets', 'Joint Venture']),
  body('title').trim().notEmpty(),
  body('location').trim().notEmpty(),
  body('returns').trim().notEmpty(),
  body('term').trim().notEmpty(),
  body('minInvestment').trim().notEmpty()
];

router.post('/opportunities', opportunityValidation, validate, createOpportunity);
router.put('/opportunities/:id', updateOpportunity);
router.delete('/opportunities/:id', deleteOpportunity);

// ===== Metrics Routes =====
router.put('/metrics', updateMetrics);
router.put('/metrics/:key', updateMetric);

// ===== FAQ Routes =====
const faqValidation = [
  body('category').isIn(['general', 'investments', 'security', 'process', 'returns']),
  body('question').trim().notEmpty(),
  body('answer').trim().notEmpty()
];

router.get('/faqs', getAllFaqs);
router.post('/faqs', faqValidation, validate, createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs/:id', deleteFaq);

export default router;