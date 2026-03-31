import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Opportunity type is required'],
    enum: ['Private Lending', 'Real Estate Equity', 'Development Financing', 'Distressed Assets', 'Joint Venture']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  returns: {
    type: String,
    required: [true, 'Expected returns is required'],
    trim: true
  },
  term: {
    type: String,
    required: [true, 'Investment term is required'],
    trim: true
  },
  minInvestment: {
    type: String,
    required: [true, 'Minimum investment is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'Limited', 'Closed'],
    default: 'Open'
  },
  highlights: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  images: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
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

// Update the updatedAt field before saving
opportunitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Opportunity', opportunitySchema);