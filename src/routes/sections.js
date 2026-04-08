import express from 'express';
import {
  getSectionsByPage,
  getSectionsBySlug,
  getSectionById
} from '../controllers/sectionController.js';

const router = express.Router();

// Public routes
router.get('/page/:pageId', getSectionsByPage);
router.get('/slug/:slug', getSectionsBySlug);
router.get('/:id', getSectionById);

export default router;