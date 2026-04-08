import Asset from '../models/Asset.js';
import { cloudinary } from '../middleware/cloudinaryUpload.js';

// @desc    Get all assets
// @route   GET /api/assets
// @access  Public
export const getAssets = async (req, res) => {
  try {
    const { folder, resourceType, tag } = req.query;
    const query = {};

    if (folder) query.folder = folder;
    if (resourceType) query.resourceType = resourceType;
    if (tag) query.tags = tag;

    const assets = await Asset.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch assets'
    });
  }
};

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Public
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch asset'
    });
  }
};

// @desc    Upload asset
// @route   POST /api/admin/assets/upload
// @access  Private (Admin)
export const uploadAsset = async (req, res) => {
  try {
    if (!req.cloudinaryResult) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded or upload failed'
      });
    }

    const result = req.cloudinaryResult;
    const { alt, folder = 'cubez', tags } = req.body;

    const asset = await Asset.create({
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      format: result.format,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      alt: alt || '',
      folder: folder,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      uploadedBy: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: 'Asset uploaded successfully',
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload asset'
    });
  }
};

// @desc    Update asset metadata
// @route   PUT /api/admin/assets/:id
// @access  Private (Admin)
export const updateAsset = async (req, res) => {
  try {
    const { alt, tags } = req.body;

    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      {
        ...(alt !== undefined && { alt }),
        ...(tags && { tags }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset updated successfully',
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update asset'
    });
  }
};

// @desc    Delete asset
// @route   DELETE /api/admin/assets/:id
// @access  Private (Admin)
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(asset.publicId);
    } catch (cloudinaryError) {
      console.error('Cloudinary delete error:', cloudinaryError);
      // Continue to delete from database even if Cloudinary fails
    }

    await Asset.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Asset deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete asset'
    });
  }
};

// @desc    Get assets by folder
// @route   GET /api/assets/folder/:folder
// @access  Public
export const getAssetsByFolder = async (req, res) => {
  try {
    const assets = await Asset.find({ folder: req.params.folder })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch assets'
    });
  }
};