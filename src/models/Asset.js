import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Asset URL is required'],
    trim: true
  },
  secureUrl: {
    type: String,
    required: [true, 'Secure URL is required'],
    trim: true
  },
  format: {
    type: String,
    trim: true,
    default: ''
  },
  resourceType: {
    type: String,
    enum: ['image', 'video', 'raw'],
    default: 'image'
  },
  width: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  bytes: {
    type: Number,
    default: null
  },
  alt: {
    type: String,
    trim: true,
    maxlength: [200, 'Alt text cannot exceed 200 characters'],
    default: ''
  },
  folder: {
    type: String,
    trim: true,
    default: 'cubez'
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
assetSchema.index({ publicId: 1 }, { unique: true });
assetSchema.index({ folder: 1 });
assetSchema.index({ resourceType: 1 });
assetSchema.index({ uploadedBy: 1 });

// Update the updatedAt field before saving
assetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Asset', assetSchema);