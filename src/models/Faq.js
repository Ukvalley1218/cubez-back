import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['general', 'investments', 'security', 'process', 'returns'],
    default: 'general'
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    maxlength: [2000, 'Answer cannot exceed 2000 characters']
  },
  order: {
    type: Number,
    default: 0
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
faqSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compound index for category and order
faqSchema.index({ category: 1, order: 1 });

export default mongoose.model('Faq', faqSchema);