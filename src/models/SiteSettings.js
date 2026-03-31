import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'number', 'json', 'image', 'boolean'],
    default: 'string'
  },
  group: {
    type: String,
    default: 'general'
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;