import express from 'express';
import {
  getPages,
  getPageBySlug,
  getPageContent
} from '../controllers/pageController.js';

const router = express.Router();

// Public routes
router.get('/', getPages);
router.get('/:slug', getPageBySlug);
router.get('/:slug/content', getPageContent);

export default router;