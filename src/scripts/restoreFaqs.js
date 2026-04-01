import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Faq from '../models/Faq.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const defaultFaqs = [
  {
    category: 'general',
    question: 'What is Cubez Capital Inc.?',
    answer: 'Cubez Capital Inc. is a Canadian private investment company focused on asset-backed investments, including real estate, private lending, and strategic equity projects.',
    order: 1,
    isActive: true
  },
  {
    category: 'general',
    question: 'How do investors earn returns?',
    answer: 'Investors earn fixed, predictable returns through Class B Preferred Shares, backed by diversified, asset-based investments.',
    order: 2,
    isActive: true
  },
  {
    category: 'security',
    question: 'Is my investment secured?',
    answer: 'Yes, investments are structured with real estate-backed assets, secured lending, and strict risk management practices.',
    order: 1,
    isActive: true
  },
  {
    category: 'general',
    question: 'What is the minimum investment?',
    answer: 'The minimum investment depends on the current offering and will be shared in the investor package.',
    order: 3,
    isActive: true
  },
  {
    category: 'process',
    question: 'How can I exit my investment?',
    answer: 'Investors can exit through share redemption based on the terms outlined in the offering, including return of capital and accumulated dividends.',
    order: 1,
    isActive: true
  },
  {
    category: 'general',
    question: 'Who can invest?',
    answer: 'Eligible investors include accredited investors, business associates, and qualified private investors under applicable regulations.',
    order: 4,
    isActive: true
  },
  {
    category: 'general',
    question: 'What makes Cubez Capital different?',
    answer: 'Cubez Capital focuses on asset-backed investments, disciplined risk management, and delivering consistent, predictable returns with transparency.',
    order: 5,
    isActive: true
  }
];

const restoreFaqs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get current FAQs
    const currentFaqs = await Faq.find({});
    console.log(`📋 Current FAQs in database: ${currentFaqs.length}`);

    // Restore missing FAQs
    let restored = 0;
    for (const faq of defaultFaqs) {
      const existing = await Faq.findOne({ question: faq.question });
      if (!existing) {
        await Faq.create(faq);
        console.log(`✅ Restored: "${faq.question}"`);
        restored++;
      } else {
        console.log(`⏭️ Already exists: "${faq.question}"`);
      }
    }

    // Show all FAQs
    const allFaqs = await Faq.find({}).sort({ category: 1, order: 1 });
    console.log('\n📋 All FAQs in database:');
    allFaqs.forEach(faq => {
      console.log(`   [${faq.category}] ${faq.question}`);
    });

    console.log(`\n✅ Restored ${restored} FAQs`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

restoreFaqs();