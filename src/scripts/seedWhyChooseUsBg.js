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

// Data to insert/update
const whyChooseUsTitleData = {
  key: 'home-whychooseus-title',
  page: 'home',
  section: 'whychooseus',
  title: 'The Cubez Capital Advantage',
  subtitle: 'Experience the confidence that comes with partnering with a firm dedicated to protecting your capital.',
  content: 'Experience the confidence that comes with partnering with a firm dedicated to protecting your capital while maximizing returns.',
  image: 'https://via.placeholder.com/1920x400?text=Why+Choose+Us',
  order: 0,
  isActive: true
};

// Seed data
const seedData = async () => {
  try {
    const result = await ContentSection.findOneAndUpdate(
      { key: 'home-whychooseus-title' },
      whyChooseUsTitleData,
      { upsert: true, new: true }
    );

    console.log('✅ Successfully updated Why Choose Us Title:');
    console.log(`   - ${result.key}: ${result.title}`);
    console.log(`   - Image field now available for editing!`);

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
