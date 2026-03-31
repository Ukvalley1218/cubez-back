import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: ['assetsUnderManagement', 'activeInvestors', 'principalLosses', 'yearsOfExcellence']
  },
  value: {
    type: Number,
    required: true
  },
  suffix: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
metricSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Metric', metricSchema);