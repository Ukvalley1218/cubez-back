import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedContactContent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    // Default contact page content
    const contactContent = [
      {
        key: 'contact-hero',
        page: 'contact',
        section: 'contact-hero',
        title: "Let's Start a Conversation",
        subtitle: 'Contact Us',
        content: "Ready to explore investment opportunities? Our team is here to answer your questions and guide you through the process.",
        image: '',
        isActive: true
      },
      {
        key: 'contact-form',
        page: 'contact',
        section: 'contact-form',
        title: 'Start Your Investment Journey',
        description: 'Ready to explore investment opportunities? Schedule a confidential consultation with our team to discuss your financial goals and how Cubez Capital can help you achieve them.',
        ctaText: 'Submit Inquiry',
        isActive: true
      },
      {
        key: 'contact-details',
        page: 'contact',
        section: 'contact-details',
        email: 'invest@cubezcapital.com',
        phone: '+1 (416) 555-0123',
        address: '100 King Street West\nSuite 5700, Toronto, ON\nM5X 1C9, Canada',
        isActive: true
      },
      {
        key: 'contact-meta',
        page: 'contact',
        section: 'contact-meta',
        content: JSON.stringify({ formFields: ['firstName', 'lastName', 'email', 'phone', 'investmentAmount', 'message'] }),
        isActive: true
      }
    ];

    // Check if content already exists and update or create
    for (const content of contactContent) {
      const exists = await ContentSection.findOne({ key: content.key });
      if (exists) {
        await ContentSection.findByIdAndUpdate(exists._id, content, { new: true });
        console.log(`✓ Updated: ${content.key}`);
      } else {
        await ContentSection.create(content);
        console.log(`✓ Created: ${content.key}`);
      }
    }

    console.log('\n✓ Contact page content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding contact content:', error.message);
    process.exit(1);
  }
};

seedContactContent();
