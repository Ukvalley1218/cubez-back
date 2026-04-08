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

// Data to insert - First 3 Why Choose Us entries
const whyChooseUsData = [
  {
    key: 'why-choose-1',
    page: 'home',
    section: 'whychooseus',
    number: '01',
    title: 'Proven Track Record',
    description: 'Over a decade of consistent returns with zero loss of investor principal. Our disciplined approach has delivered results through multiple market cycles.',
    content: 'Over a decade of consistent returns with zero loss of investor principal. Our disciplined approach has delivered results through multiple market cycles.',
    highlight: '12+ Years Experience',
    order: 1,
    isActive: true
  },
  {
    key: 'why-choose-2',
    page: 'home',
    section: 'whychooseus',
    number: '02',
    title: 'Asset-Backed Security',
    description: 'Every investment is secured by tangible real estate assets. Your capital is protected by first-lien positions on premium properties.',
    content: 'Every investment is secured by tangible real estate assets. Your capital is protected by first-lien positions on premium properties.',
    highlight: '100% Asset Coverage',
    order: 2,
    isActive: true
  },
  {
    key: 'why-choose-3',
    page: 'home',
    section: 'whychooseus',
    number: '03',
    title: 'Transparent Reporting',
    description: 'Detailed monthly reports and quarterly reviews keep you informed. Full visibility into your investment performance and holdings.',
    content: 'Detailed monthly reports and quarterly reviews keep you informed. Full visibility into your investment performance and holdings.',
    highlight: 'Real-Time Updates',
    order: 3,
    isActive: true
  }
];

// Insert data
const seedData = async () => {
  try {
    // Delete existing entries if they exist
    await ContentSection.deleteMany({ key: { $in: ['why-choose-1', 'why-choose-2', 'why-choose-3'] } });
    console.log('🗑️  Deleted existing entries');

    // Insert new data
    const result = await ContentSection.insertMany(whyChooseUsData);
    console.log('✅ Successfully inserted 3 Why Choose Us entries:');
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
