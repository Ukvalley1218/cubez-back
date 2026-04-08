import express from 'express';
import {
  getFieldsBySection,
  getSectionWithData
} from '../controllers/fieldController.js';

const router = express.Router();

// Public routes
router.get('/section/:sectionId', getFieldsBySection);
router.get('/section/:sectionId/data', getSectionWithData);

export default router;