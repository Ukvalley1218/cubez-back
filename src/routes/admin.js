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
import {
  getAllPages,
  createPage,
  updatePage,
  deletePage,
  reorderPages
} from '../controllers/pageController.js';
import {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
  reorderSections
} from '../controllers/sectionController.js';
import {
  getAllFields,
  createField,
  batchUpdateFields,
  updateField,
  deleteField
} from '../controllers/fieldController.js';
import {
  getAssets,
  getAssetById,
  uploadAsset,
  updateAsset,
  deleteAsset,
  getAssetsByFolder
} from '../controllers/assetController.js';
import handleCloudinaryUpload from '../middleware/cloudinaryUpload.js';

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

// ===== Pages Routes =====
router.get('/pages', getAllPages);
router.post('/pages', createPage);
router.put('/pages/:id', updatePage);
router.delete('/pages/:id', deletePage);
router.put('/pages/reorder', reorderPages);

// ===== Sections Routes =====
router.get('/sections', getAllSections);
router.post('/sections', createSection);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);
router.put('/sections/reorder', reorderSections);

// ===== Fields Routes =====
router.get('/fields', getAllFields);
router.post('/fields', createField);
router.put('/fields/batch/:sectionId', batchUpdateFields);
router.put('/fields/:id', updateField);
router.delete('/fields/:id', deleteField);

// ===== Assets Routes =====
router.get('/assets', getAssets);
router.get('/assets/:id', getAssetById);
router.post('/assets/upload', handleCloudinaryUpload, uploadAsset);
router.put('/assets/:id', updateAsset);
router.delete('/assets/:id', deleteAsset);

export default router;