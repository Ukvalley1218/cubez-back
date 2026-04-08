import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedInvestWithConfidenceContent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    // Default Invest With Confidence page content
    const investContent = [
      {
        key: 'invest-hero',
        page: 'invest-with-confidence',
        section: 'invest-hero',
        title: 'Invest With Confidence',
        subtitle: 'Start Your Investment Journey',
        content: 'Join a community of investors earning predictable returns through secure, asset-backed investments. Schedule a confidential consultation to discover how Cubez Capital can help you achieve your financial goals.',
        image: '',
        isActive: true
      },
      {
        key: 'invest-overview',
        page: 'invest-with-confidence',
        section: 'invest-overview',
        title: 'The Cubez Capital Advantage',
        content: 'Experience the confidence that comes with partnering with a firm dedicated to protecting your capital and growing your wealth.',
        isActive: true
      },
      {
        key: 'invest-cta',
        page: 'invest-with-confidence',
        section: 'invest-cta',
        title: 'Schedule Your Consultation',
        content: 'Take the first step towards secure, predictable returns. Our investment team will contact you within 24 hours to discuss your goals and answer any questions.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        isActive: true
      }
    ];

    // Check if content already exists and update or create
    for (const content of investContent) {
      const exists = await ContentSection.findOne({ key: content.key });
      if (exists) {
        await ContentSection.findByIdAndUpdate(exists._id, content, { new: true });
        console.log(`✓ Updated: ${content.key}`);
      } else {
        await ContentSection.create(content);
        console.log(`✓ Created: ${content.key}`);
      }
    }

    console.log('\n✓ Invest With Confidence page content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding Invest With Confidence content:', error.message);
    process.exit(1);
  }
};

seedInvestWithConfidenceContent();
