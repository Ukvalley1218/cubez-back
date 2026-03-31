import mongoose from 'mongoose';

const contentSectionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  page: {
    type: String,
    required: true,
    trim: true
  },
  section: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  subtitle: {
    type: String,
    trim: true,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
contentSectionSchema.index({ page: 1, section: 1 });

const ContentSection = mongoose.model('ContentSection', contentSectionSchema);

export default ContentSection;