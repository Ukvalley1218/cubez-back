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
import { admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicNavigation);
router.get('/navbar', getNavbar);
router.get('/footer', getFooter);

// Admin routes (admin middleware already includes authentication)
router.get('/admin', admin, getAdminNavigation);
router.put('/admin/navbar', admin, updateNavbar);
router.put('/admin/footer', admin, updateFooter);
router.post('/admin/:location/item', admin, addNavItem);
router.put('/admin/:location/item/:itemId', admin, updateNavItem);
router.delete('/admin/:location/item/:itemId', admin, deleteNavItem);

export default router;