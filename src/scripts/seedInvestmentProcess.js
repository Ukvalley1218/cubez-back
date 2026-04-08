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
  order: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ContentSection = mongoose.model('ContentSection', contentSectionSchema);

// Data to insert/update - Investment Process steps
const processData = [
  {
    key: 'home-process-title',
    page: 'home',
    section: 'process',
    title: 'Investment Process',
    subtitle: 'Six Simple Steps to Start Investing',
    content: 'Follow our straightforward process to begin your investment journey with Cubez Capital.',
    image: 'https://via.placeholder.com/1920x400?text=Investment+Process',
    order: 0,
    isActive: true
  },
  {
    key: 'process-step-1',
    page: 'home',
    section: 'process',
    number: '01',
    title: 'Connect',
    description: 'Schedule a confidential consultation with our team.',
    content: 'Schedule a confidential consultation with our team.',
    order: 1,
    isActive: true
  },
  {
    key: 'process-step-2',
    page: 'home',
    section: 'process',
    number: '02',
    title: 'Review',
    description: 'Receive and review detailed investment documentation.',
    content: 'Receive and review detailed investment documentation.',
    order: 2,
    isActive: true
  },
  {
    key: 'process-step-3',
    page: 'home',
    section: 'process',
    number: '03',
    title: 'Invest',
    description: 'Commit your capital to the selected opportunity.',
    content: 'Commit your capital to the selected opportunity.',
    order: 3,
    isActive: true
  },
  {
    key: 'process-step-4',
    page: 'home',
    section: 'process',
    number: '04',
    title: 'Deploy',
    description: 'We deploy capital into secured investment positions.',
    content: 'We deploy capital into secured investment positions.',
    order: 4,
    isActive: true
  },
  {
    key: 'process-step-5',
    page: 'home',
    section: 'process',
    number: '05',
    title: 'Earn',
    description: 'Receive predictable returns on your investment.',
    content: 'Receive predictable returns on your investment.',
    order: 5,
    isActive: true
  },
  {
    key: 'process-step-6',
    page: 'home',
    section: 'process',
    number: '06',
    title: 'Exit',
    description: 'Capital returned at term completion with gains.',
    content: 'Capital returned at term completion with gains.',
    order: 6,
    isActive: true
  }
];

// Seed data
const seedData = async () => {
  try {
    // Upsert each entry
    for (const item of processData) {
      await ContentSection.findOneAndUpdate(
        { key: item.key },
        item,
        { upsert: true, new: true }
      );
    }

    console.log('✅ Successfully seeded Investment Process entries:');
    const allEntries = await ContentSection.find({ 
      key: { $in: ['home-process-title', 'process-step-1', 'process-step-2', 'process-step-3', 'process-step-4', 'process-step-5', 'process-step-6'] } 
    }).sort({ order: 1 });
    
    allEntries.forEach(entry => {
      console.log(`   - ${entry.key}: ${entry.title || entry.description}`);
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
