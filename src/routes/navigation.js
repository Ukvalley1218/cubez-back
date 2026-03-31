import express from 'express';
import {
  getPublicNavigation,
  getNavbar,
  getFooter,
  getAdminNavigation,
  updateNavbar,
  updateFooter,
  addNavItem,
  updateNavItem,
  deleteNavItem
} from '../controllers/navigationController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicNavigation);
router.get('/navbar', getNavbar);
router.get('/footer', getFooter);

// Admin routes
router.get('/admin', protect, admin, getAdminNavigation);
router.put('/admin/navbar', protect, admin, updateNavbar);
router.put('/admin/footer', protect, admin, updateFooter);
router.post('/admin/:location/item', protect, admin, addNavItem);
router.put('/admin/:location/item/:itemId', protect, admin, updateNavItem);
router.delete('/admin/:location/item/:itemId', protect, admin, deleteNavItem);

export default router;