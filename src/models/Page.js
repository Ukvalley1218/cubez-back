import mongoose from 'mongoose';

// Hero section schema
const heroSchema = {
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
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    trim: true,
    default: ''
  },
  ctaLink: {
    type: String,
    trim: true,
    default: ''
  },
  ctaSecondaryText: {
    type: String,
    trim: true,
    default: ''
  },
  ctaSecondaryLink: {
    type: String,
    trim: true,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  }
};

// Section reference schema
const sectionRefSchema = {
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  order: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
};

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Page name is required'],
    trim: true,
    maxlength: [100, 'Page name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  title: {
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
  heroSection: heroSchema,
  sections: [sectionRefSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'SEO title cannot exceed 60 characters'],
    default: ''
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'SEO description cannot exceed 160 characters'],
    default: ''
  },
  seoKeywords: {
    type: [String],
    default: []
  },
  ogImage: {
    type: String,
    default: ''
  },
  showInNavigation: {
    type: Boolean,
    default: true
  },
  parentPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    default: null
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

// Update the updatedAt field before saving
pageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
pageSchema.index({ slug: 1 });
pageSchema.index({ order: 1 });

export default mongoose.model('Page', pageSchema);