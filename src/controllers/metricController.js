import Metric from '../models/Metric.js';

// Default metrics if none exist
const defaultMetrics = [
  { key: 'assetsUnderManagement', value: 250, suffix: 'M+', label: 'Assets Under Management' },
  { key: 'activeInvestors', value: 500, suffix: '+', label: 'Active Investors' },
  { key: 'principalLosses', value: 0, suffix: '', label: 'Principal Losses' },
  { key: 'yearsOfExcellence', value: 12, suffix: '+', label: 'Years of Excellence' }
];

// @desc    Get all metrics
// @route   GET /api/metrics
// @access  Public
export const getMetrics = async (req, res) => {
  try {
    let metrics = await Metric.find({});

    // Initialize default metrics if none exist
    if (metrics.length === 0) {
      await Metric.insertMany(defaultMetrics);
      metrics = await Metric.find({});
    }

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch metrics'
    });
  }
};

// @desc    Update metrics
// @route   PUT /api/admin/metrics
// @access  Private (Admin)
export const updateMetrics = async (req, res) => {
  try {
    const { metrics } = req.body;

    if (!Array.isArray(metrics)) {
      return res.status(400).json({
        success: false,
        message: 'Metrics must be an array'
      });
    }

    const updatePromises = metrics.map(metric =>
      Metric.findOneAndUpdate(
        { key: metric.key },
        { value: metric.value, suffix: metric.suffix, label: metric.label, updatedAt: Date.now() },
        { new: true, upsert: true }
      )
    );

    const updatedMetrics = await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Metrics updated successfully',
      data: updatedMetrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update metrics'
    });
  }
};

// @desc    Update single metric
// @route   PUT /api/admin/metrics/:key
// @access  Private (Admin)
export const updateMetric = async (req, res) => {
  try {
    const { value, suffix, label } = req.body;

    const metric = await Metric.findOneAndUpdate(
      { key: req.params.key },
      { value, suffix, label, updatedAt: Date.now() },
      { new: true, runValidators: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Metric updated successfully',
      data: metric
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update metric'
    });
  }
};