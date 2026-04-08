import mongoose from 'mongoose';

const formFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true
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
  type: {
    type: String,
    enum: ['text', 'email', 'phone', 'select', 'textarea', 'number', 'checkbox', 'radio'],
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  options: [{
    label: String,
    value: String
  }],
  validation: {
    min: Number,
    max: Number,
    pattern: String,
    message: String
  },
  order: {
    type: Number,
    default: 0
  },
  width: {
    type: String,
    enum: ['full', 'half', 'third'],
    default: 'full'
  }
});

const formConfigSchema = new mongoose.Schema({
  formKey: {
    type: String,
    required: [true, 'Form key is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Form key can only contain lowercase letters, numbers, and hyphens']
  },
  name: {
    type: String,
    required: [true, 'Form name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  fields: [formFieldSchema],
  submitButtonText: {
    type: String,
    default: 'Submit'
  },
  successMessage: {
    type: String,
    default: 'Thank you for your submission!'
  },
  errorMessage: {
    type: String,
    default: 'Something went wrong. Please try again.'
  },
  emailNotification: {
    enabled: {
      type: Boolean,
      default: true
    },
    recipients: [{
      type: String
    }],
    subject: String
  },
  isActive: {
    type: Boolean,
    default: true
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
formConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
formConfigSchema.index({ formKey: 1 });
formConfigSchema.index({ isActive: 1 });

export default mongoose.model('FormConfig', formConfigSchema);