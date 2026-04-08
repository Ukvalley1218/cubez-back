import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// ContentSection Model
const contentSectionSchema = new mongoose.Schema({
  key: String,
  page: String,
  section: String,
  title: String,
  subtitle: String,
  content: String,
  image: String,
  order: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ContentSection = mongoose.model('ContentSection', contentSectionSchema);

// Data to insert - Service entries
const serviceData = [
  {
    key: 'service-lending',
    page: 'services',
    section: 'service',
    title: 'Lending Services',
    subtitle: 'Professional Lending Solutions',
    content: 'Access flexible lending solutions tailored to your investment needs. Our comprehensive lending services provide competitive rates and streamlined approval processes.',
    image: 'https://via.placeholder.com/400x300?text=Lending+Services',
    order: 1,
    isActive: true
  },
  {
    key: 'service-joint-venture',
    page: 'services',
    section: 'service',
    title: 'Joint Venture',
    subtitle: 'Partnership Opportunities',
    content: 'Explore collaborative investment opportunities through our joint venture programs. Partner with us to achieve mutual growth and success in real estate investments.',
    image: 'https://via.placeholder.com/400x300?text=Joint+Venture',
    order: 2,
    isActive: true
  },
  {
    key: 'service-equity',
    page: 'services',
    section: 'service',
    title: 'Equity Services',
    subtitle: 'Equity Investment Options',
    content: 'Build wealth through equity participation in our investment portfolio. Enjoy potential returns and long-term appreciation with our equity service offerings.',
    image: 'https://via.placeholder.com/400x300?text=Equity+Services',
    order: 3,
    isActive: true
  }
];

// Insert data
const seedData = async () => {
  try {
    // Delete existing entries if they exist
    await ContentSection.deleteMany({ key: { $in: ['service-lending', 'service-joint-venture', 'service-equity'] } });
    console.log('🗑️  Deleted existing service entries');

    // Insert new data
    const result = await ContentSection.insertMany(serviceData);
    console.log('✅ Successfully inserted 3 Service entries:');
    result.forEach(doc => {
      console.log(`   - ${doc.key}: ${doc.title}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => {
  seedData();
});
