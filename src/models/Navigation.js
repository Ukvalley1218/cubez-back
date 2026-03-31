import mongoose from 'mongoose';

const navItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  href: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isDropdown: {
    type: Boolean,
    default: false
  },
  dropdownItems: [{
    name: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const navigationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    enum: ['navbar', 'footer'],
    default: 'navbar'
  },
  items: [navItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Static method to get navbar items
navigationSchema.statics.getNavbar = async function() {
  const nav = await this.findOne({ location: 'navbar' });
  return nav?.items || [];
};

// Static method to get footer items
navigationSchema.statics.getFooter = async function() {
  const footer = await this.findOne({ location: 'footer' });
  return footer?.items || [];
};

export default mongoose.model('Navigation', navigationSchema);