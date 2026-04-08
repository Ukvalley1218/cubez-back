import mongoose from 'mongoose';

const sectionGroupSchema = new mongoose.Schema({
  // Section identification
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
  label: {
    type: String,
    required: true,
    trim: true
  },

  // Section-level content
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },

  // Background image for the section
  backgroundImage: {
    type: String,
    default: ''
  },

  // Background overlay (for dark overlays on images)
  backgroundOverlay: {
    type: Boolean,
    default: false
  },

  // Background color
  backgroundColor: {
    type: String,
    default: ''
  },

  // CTA button
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: ''
  },

  // Items array - for sections with multiple items (Why Choose Us, Benefits, etc.)
  items: [{
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    number: { type: String, default: '' },
    highlight: { type: String, default: '' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],

  // Bullet points / highlights
  highlights: [{
    text: { type: String, default: '' },
    icon: { type: String, default: '' }
  }],

  // Display order
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
sectionGroupSchema.index({ page: 1, section: 1 });

const SectionGroup = mongoose.model('SectionGroup', sectionGroupSchema);
export default SectionGroup;