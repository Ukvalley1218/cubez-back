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
  number: String,
  description: String,
  highlight: String,
  order: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ContentSection = mongoose.model('ContentSection', contentSectionSchema);

// Data to insert - Remaining 3 Why Choose Us entries from frontend
const whyChooseUsData = [
  {
    key: 'why-choose-4',
    page: 'home',
    section: 'whychooseus',
    number: '04',
    title: 'Institutional Expertise',
    description: 'Our team brings decades of experience from leading financial institutions. Institutional-grade risk management for individual investors.',
    content: 'Our team brings decades of experience from leading financial institutions. Institutional-grade risk management for individual investors.',
    highlight: 'Expert Management',
    order: 4,
    isActive: true
  },
  {
    key: 'why-choose-5',
    page: 'home',
    section: 'whychooseus',
    number: '05',
    title: 'Fixed Returns',
    description: 'Predictable, fixed annual returns designed for wealth accumulation. No surprises, no market volatility—just steady growth.',
    content: 'Predictable, fixed annual returns designed for wealth accumulation. No surprises, no market volatility—just steady growth.',
    highlight: '8-12% Target Returns',
    order: 5,
    isActive: true
  },
  {
    key: 'why-choose-6',
    page: 'home',
    section: 'whychooseus',
    number: '06',
    title: 'Personalized Service',
    description: 'Dedicated relationship managers ensure your investment strategy aligns with your financial goals. Direct access to our leadership team.',
    content: 'Dedicated relationship managers ensure your investment strategy aligns with your financial goals. Direct access to our leadership team.',
    highlight: 'Concierge Support',
    order: 6,
    isActive: true
  }
];

// Insert data
const seedData = async () => {
  try {
    // Delete existing entries if they exist
    await ContentSection.deleteMany({ key: { $in: ['why-choose-4', 'why-choose-5', 'why-choose-6'] } });
    console.log('🗑️  Deleted existing entries');

    // Insert new data
    const result = await ContentSection.insertMany(whyChooseUsData);
    console.log('✅ Successfully inserted remaining 3 Why Choose Us entries:');
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
