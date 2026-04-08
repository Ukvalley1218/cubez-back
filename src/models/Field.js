import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: [true, 'Section reference is required']
  },
  fieldName: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true
  },
  fieldType: {
    type: String,
    required: [true, 'Field type is required'],
    enum: ['text', 'textarea', 'richtext', 'image', 'gallery', 'button', 'number', 'boolean', 'repeater', 'select'],
    default: 'text'
  },
  // The actual value - can be string, number, object, or array
  value: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  // For repeater fields - array of objects
  repeaterValue: [{
    type: mongoose.Schema.Types.Mixed
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound unique index for section + fieldName
fieldSchema.index({ section: 1, fieldName: 1 }, { unique: true });
fieldSchema.index({ section: 1 });

// Update the updatedAt field before saving
fieldSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Field', fieldSchema);