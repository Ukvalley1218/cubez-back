import express from 'express';
import {
  getPublicFormConfigs,
  getFormConfigByKey,
  getAllFormConfigs,
  getFormConfigById,
  createFormConfig,
  updateFormConfig,
  deleteFormConfig,
  duplicateFormConfig
} from '../controllers/formConfigController.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicFormConfigs);
router.get('/public/:key', getFormConfigByKey);

// Admin routes
router.get('/admin', getAllFormConfigs);
router.get('/admin/:id', getFormConfigById);
router.post('/admin', createFormConfig);
router.put('/admin/:id', updateFormConfig);
router.delete('/admin/:id', deleteFormConfig);
router.post('/admin/:id/duplicate', duplicateFormConfig);

export default router;