import express from 'express';
import {
  getPageContent,
  getGlobalSettings,
  getNavigation,
  getSiteData,
  getFormForFrontend
} from '../controllers/pageContentController.js';

const router = express.Router();

// Public routes - get full page content by slug
router.get('/page/:slug', getPageContent);

// Get global settings
router.get('/settings', getGlobalSettings);

// Get navigation
router.get('/navigation', getNavigation);

// Get all site data (comprehensive endpoint)
router.get('/site-data', getSiteData);

// Get form configuration for frontend
router.get('/form/:key', getFormForFrontend);

export default router;