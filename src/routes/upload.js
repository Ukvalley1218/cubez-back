import express from 'express';
import handleCloudinaryUpload, { cloudinary } from '../middleware/cloudinaryUpload.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Upload to Cloudinary
router.post('/admin/upload', handleCloudinaryUpload, (req, res) => {
  try {
    const result = req.cloudinaryResult;

    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'Upload failed - no result returned'
      });
    }

    console.log('Cloudinary upload successful:', result.public_id);

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        originalName: req.file.originalname,
        size: req.file.size,
        width: result.width,
        height: result.height,
        format: result.format
      }
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete from Cloudinary
router.delete('/admin/upload/:publicId', async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);

    console.log('Attempting to delete:', publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found or already deleted'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// List all images from Cloudinary
router.get('/admin/uploads', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:cubez-capital')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const files = result.resources.map(resource => ({
      url: resource.secure_url,
      public_id: resource.public_id,
      filename: resource.public_id.split('/').pop(),
      created_at: resource.created_at
    }));

    res.json({ success: true, data: files });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;