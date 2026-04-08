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

// Fix keys - rename why-choose-us-* to why-choose-*
const fixKeys = async () => {
  try {
    // Rename 4, 5, 6 with "us" to without "us"
    const oldKeys = ['why-choose-us-4', 'why-choose-us-5', 'why-choose-us-6'];
    const newKeys = ['why-choose-4', 'why-choose-5', 'why-choose-6'];

    for (let i = 0; i < oldKeys.length; i++) {
      const result = await ContentSection.findOneAndUpdate(
        { key: oldKeys[i] },
        { key: newKeys[i] },
        { new: true }
      );
      if (result) {
        console.log(`✅ Renamed: ${oldKeys[i]} → ${newKeys[i]}`);
      }
    }

    // Check all why-choose entries
    const allEntries = await ContentSection.find({ key: /^why-choose/ }).sort({ order: 1 });
    console.log('\n📋 All Why Choose Us entries in database:');
    allEntries.forEach(entry => {
      console.log(`   - ${entry.key}: ${entry.title}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error fixing keys:', err);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => {
  fixKeys();
});
