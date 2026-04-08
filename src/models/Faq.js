import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['general', 'investments', 'security', 'process', 'returns'],
    default: 'general'
    // Category is optional - all FAQs show on all pages
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

// Index for order to sort FAQs
faqSchema.index({ order: 1 });

export default mongoose.model('Faq', faqSchema);