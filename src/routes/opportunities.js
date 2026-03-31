import express from 'express';
import { getOpportunities, getOpportunity } from '../controllers/opportunityController.js';

const router = express.Router();

// @route   GET /api/opportunities
// @desc    Get all opportunities
// @access  Public
router.get('/', getOpportunities);

// @route   GET /api/opportunities/:id
// @desc    Get single opportunity
// @access  Public
router.get('/:id', getOpportunity);

export default router;