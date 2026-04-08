import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Page from '../models/Page.js';
import Section from '../models/Section.js';
import Field from '../models/Field.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Hardcoded MongoDB URI
const mongoUri = 'mongodb+srv://shruti-cubez:cubez0303@cubez-front.ylq11wr.mongodb.net/?appName=cubez-front';

const seedContactFields = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const contactPage = await Page.findOne({ slug: 'contact' });
    if (!contactPage) {
      console.log('❌ Contact page not found');
      process.exit(1);
    }

    console.log('📄 Contact page found');

    // Seed Hero section
    console.log('\n⭐ Seeding Hero section field values...');
    let heroSection = await Section.findOne({ page: contactPage._id, slug: 'hero' });

    if (heroSection) {
      await Field.deleteMany({ section: heroSection._id });

      await Field.create({
        section: heroSection._id,
        fieldName: 'title',
        fieldType: 'text',
        value: "Let's Start a Conversation"
      });

      await Field.create({
        section: heroSection._id,
        fieldName: 'subtitle',
        fieldType: 'textarea',
        value: 'Contact Us'
      });

      console.log('✅ Seeded Hero section');
    }

    // Seed Contact Info section
    console.log('\n📞 Seeding Contact Info section field values...');
    let contactInfoSection = await Section.findOne({ page: contactPage._id, slug: 'contactinfo' });

    if (contactInfoSection) {
      await Field.deleteMany({ section: contactInfoSection._id });

      await Field.create({
        section: contactInfoSection._id,
        fieldName: 'title',
        fieldType: 'text',
        value: 'Start Your Investment Journey'
      });

      await Field.create({
        section: contactInfoSection._id,
        fieldName: 'description',
        fieldType: 'textarea',
        value: 'Ready to explore investment opportunities? Schedule a confidential consultation with our team to discuss your financial goals and how Cubez Capital can help you achieve them.'
      });

      await Field.create({
        section: contactInfoSection._id,
        fieldName: 'email',
        fieldType: 'text',
        value: 'invest@cubezcapital.com'
      });

      await Field.create({
        section: contactInfoSection._id,
        fieldName: 'phone',
        fieldType: 'text',
        value: '+1 (647) 555-0100'
      });

      await Field.create({
        section: contactInfoSection._id,
        fieldName: 'address',
        fieldType: 'textarea',
        value: 'Toronto, Ontario\nCanada'
      });

      console.log('✅ Seeded Contact Info section');
    }

    console.log('\n✅ ✅ ✅ All Contact field values seeded successfully!');
    console.log('\nNow the admin panel can display and edit all Contact sections.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedContactFields();