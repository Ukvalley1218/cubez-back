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
  // highlights: {
  //   type: [String],
  //   default: []
  // },
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
  // Dynamic section fields
  description: {
    type: String,
    trim: true,
    default: ''
  },
  number: {
    type: String,
    trim: true,
    default: ''
  },
  highlight: {
    type: String,
    trim: true,
    default: ''
  },
  percentage: {
    type: String,
    trim: true,
    default: ''
  },
  icon: {
    type: String,
    trim: true,
    default: ''
  },
  label: {
    type: String,
    trim: true,
    default: ''
  },
  value: {
    type: String,
    trim: true,
    default: ''
  },
  value1: {
    type: String,
    trim: true,
    default: ''
  },
  label1: {
    type: String,
    trim: true,
    default: ''
  },
  value2: {
    type: String,
    trim: true,
    default: ''
  },
  label2: {
    type: String,
    trim: true,
    default: ''
  },
  value3: {
    type: String,
    trim: true,
    default: ''
  },
  label3: {
    type: String,
    trim: true,
    default: ''
  },
  image2: {
    type: String,
    default: ''
  },
  secondaryCtaText: {
    type: String,
    default: ''
  },
  secondaryCtaLink: {
    type: String,
    default: ''
  },
  percentageLabel: {
    type: String,
    trim: true,
    default: ''
  },
  floatingBadgeValue: {
    type: String,
    default: ''
  },
  floatingBadgeLabel: {
    type: String,
    default: ''
  },
  trust1Text: {
    type: String,
    default: ''
  },
  trust2Text: {
    type: String,
    default: ''
  },
  highlight2: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  bulletPoints: {
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