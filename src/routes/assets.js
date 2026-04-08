import express from 'express';
import {
  getAssets,
  getAssetById,
  getAssetsByFolder
} from '../controllers/assetController.js';

const router = express.Router();

// Public routes
router.get('/', getAssets);
router.get('/folder/:folder', getAssetsByFolder);
router.get('/:id', getAssetById);

export default router;