import express from 'express';
import { getMetrics } from '../controllers/metricController.js';

const router = express.Router();

// @route   GET /api/metrics
// @desc    Get all metrics
// @access  Public
router.get('/', getMetrics);

export default router;