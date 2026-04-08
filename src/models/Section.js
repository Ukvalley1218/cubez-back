import mongoose from 'mongoose';

// Section type enum - defines the kind of content this section contains
const SECTION_TYPES = [
  'hero',           // Hero/Banner sections
  'services',       // Services listing
  'benefits',       // Benefits/Features listing
  'process',        // Process steps
  'metrics',        // Statistics/Numbers
  'cta',            // Call-to-action
  'testimonials',   // Client testimonials
  'faq',            // FAQ accordion
  'contact',        // Contact form/info
  'team',           // Team members
  'gallery',        // Image gallery
  'pricing',        // Pricing tables
  'content',        // Rich text content
  'features',       // Features grid
  'timeline',       // Timeline steps
  'cards',          // Card grid
  'opportunities',  // Investment opportunities
  'form',           // Dynamic form
  'custom'          // Custom section
];

// Field schema definition (embedded in Section)
const fieldSchemaDefinition = {
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Field type is required'],
    enum: ['text', 'textarea', 'richtext', 'image', 'gallery', 'button', 'number', 'boolean', 'repeater', 'select', 'icon', 'color', 'date', 'file'],
    default: 'text'
  },
  label: {
    type: String,
    required: [true, 'Field label is required'],
    trim: true
  },
  placeholder: {
    type: String,
    trim: true,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  options: {
    type: [String],
    default: []
  },
  // For repeater fields - subfield definitions
  subfields: [{
    name: { type: String, required: true },
    type: { type: String, enum: ['text', 'textarea', 'image', 'number', 'button', 'icon', 'select'], required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: false }
  }],
  order: {
    type: Number,
    default: 0
  },
  // Field-level settings
  settings: {
    min: Number,
    max: Number,
    pattern: String,
    validationMessage: String,
    multiple: { type: Boolean, default: false },
    accept: String // for file uploads
  }
};

// Section settings schema
const sectionSettingsSchema = {
  backgroundColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    enum: ['none', 'small', 'medium', 'large'],
    default: 'medium'
  },
  maxWidth: {
    type: String,
    enum: ['full', 'wide', 'normal', 'narrow'],
    default: 'normal'
  },
  className: {
    type: String,
    default: ''
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showSubtitle: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Number,
    default: 1,
    min: 1,
    max: 6
  },
  // Animation settings
  animation: {
    type: String,
    default: 'none'
  },
  // Custom CSS
  customCss: {
    type: String,
    default: ''
  }
};

const sectionSchema = new mongoose.Schema({
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: [true, 'Page reference is required']
  },
  name: {
    type: String,
    required: [true, 'Section name is required'],
    trim: true,
    maxlength: [100, 'Section name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Section slug is required'],
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  sectionType: {
    type: String,
    enum: SECTION_TYPES,
    default: 'content'
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
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  // Field definitions for this section
  fields: [fieldSchemaDefinition],
  // Section-level settings
  settings: sectionSettingsSchema,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

// Compound unique index for page + slug
sectionSchema.index({ page: 1, slug: 1 }, { unique: true });
sectionSchema.index({ page: 1, order: 1 });

// Update the updatedAt field before saving
sectionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Section', sectionSchema);