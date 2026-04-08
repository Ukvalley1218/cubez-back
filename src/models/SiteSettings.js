import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'number', 'json', 'image', 'boolean', 'color', 'url', 'email', 'phone'],
    default: 'string'
  },
  group: {
    type: String,
    enum: ['general', 'contact', 'social', 'seo', 'appearance', 'notifications', 'integration'],
    default: 'general'
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
siteSettingsSchema.index({ group: 1 });
siteSettingsSchema.index({ isPublic: 1 });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;