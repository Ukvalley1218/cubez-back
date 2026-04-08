import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import Page from '../models/Page.js';
import Section from '../models/Section.js';
import Field from '../models/Field.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from cubez-back root
dotenv.config({ path: join(__dirname, '../../.env') });

// Frontend fallback data
const FALLBACK_SERVICES = [
  {
    icon: 'real-estate',
    title: 'Real Estate Investments',
    description: 'Strategic investments in premium commercial and residential properties with stable, long-term returns.',
    color: '#d1a549',
    order: 0,
  },
  {
    icon: 'lending',
    title: 'Private Lending',
    description: 'Secure lending opportunities with first-lien positions on real estate assets, providing predictable income.',
    color: '#293e63',
    order: 1,
  },
  {
    icon: 'joint-venture',
    title: 'Joint Ventures',
    description: 'Partner with experienced developers on high-potential real estate projects.',
    color: '#d1a549',
    order: 2,
  },
  {
    icon: 'equity',
    title: 'Equity Investments',
    description: 'Direct equity positions in carefully selected real estate development opportunities.',
    color: '#293e63',
    order: 3,
  }
];

const FALLBACK_BENEFITS = [
  {
    icon: 'fixed',
    title: 'Fixed Returns',
    description: 'Predictable, fixed annual returns designed for wealth accumulation.',
    order: 0,
  },
  {
    icon: 'asset',
    title: 'Asset Security',
    description: 'Every investment secured by tangible real estate assets.',
    order: 1,
  },
  {
    icon: 'priority',
    title: 'Priority Payouts',
    description: 'Preferred returns before any profit distribution.',
    order: 2,
  },
  {
    icon: 'diverse',
    title: 'Diversification',
    description: 'Spread risk across multiple properties and markets.',
    order: 3,
  },
  {
    icon: 'manage',
    title: 'Professional Management',
    description: 'Expert team managing all aspects of your investment.',
    order: 4,
  },
  {
    icon: 'transparent',
    title: 'Full Transparency',
    description: 'Regular, detailed reporting on your investment performance.',
    order: 5,
  }
];

const seedPageContent = async () => {
  try {
    // Use hardcoded MongoDB URI since .env loading is problematic
    const mongoUri = 'mongodb+srv://shruti-cubez:cubez0303@cubez-front.ylq11wr.mongodb.net/?appName=cubez-front';
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get Home page
    const homePage = await Page.findOne({ slug: 'home' });
    if (!homePage) {
      console.log('❌ Home page not found');
      process.exit(1);
    }

    console.log('🌍 Home page found:', homePage.name);

    // Seed "What We Do" section with Services
    console.log('\n📦 Seeding "What We Do" section...');
    let whatWeDoSection = await Section.findOne({ page: homePage._id, slug: 'whatwedo' });
    
    if (!whatWeDoSection) {
      whatWeDoSection = await Section.create({
        page: homePage._id,
        name: 'What We Do',
        slug: 'whatwedo',
        description: 'Service offerings',
        isActive: true,
        order: 3,
        fields: []
      });
      console.log('✅ Created "What We Do" section');
    }

    // Clear existing fields in What We Do section
    await Field.deleteMany({ section: whatWeDoSection._id });

    // Add title field
    const titleField = await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'title',
      fieldType: 'text',
      value: 'Strategic Investment Solutions'
    });

    // Add subtitle field
    const subtitleField = await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'subtitle',
      fieldType: 'textarea',
      value: 'We specialize in asset-backed investments that prioritize capital preservation while delivering consistent, predictable returns.'
    });

    // Add services as repeater field
    const servicesField = await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'services',
      fieldType: 'repeater',
      repeaterValue: FALLBACK_SERVICES
    });

    whatWeDoSection.fields = [titleField._id, subtitleField._id, servicesField._id];
    await whatWeDoSection.save();
    console.log(`✅ Added ${FALLBACK_SERVICES.length} services to "What We Do" section`);

    // Seed "Why Choose Us" section with Benefits
    console.log('\n🌟 Seeding "Why Choose Us" section...');
    let whyChooseSection = await Section.findOne({ page: homePage._id, slug: 'whychooseus' });
    
    if (!whyChooseSection) {
      whyChooseSection = await Section.create({
        page: homePage._id,
        name: 'Why Choose Us',
        slug: 'whychooseus',
        description: 'Benefits and advantages',
        isActive: true,
        order: 4,
        fields: []
      });
      console.log('✅ Created "Why Choose Us" section');
    }

    // Clear existing fields
    await Field.deleteMany({ section: whyChooseSection._id });

    // Prepare benefits data
    const benefitsData = FALLBACK_BENEFITS.map(benefit => ({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description,
      order: benefit.order
    }));

    // Add title field
    const whyTitleField = await Field.create({
      section: whyChooseSection._id,
      fieldName: 'title',
      fieldType: 'text',
      value: 'The Cubez Capital Advantage'
    });

    // Add subtitle field
    const whySubtitleField = await Field.create({
      section: whyChooseSection._id,
      fieldName: 'subtitle',
      fieldType: 'textarea',
      value: 'Experience the confidence that comes with partnering with a firm dedicated to protecting your capital.'
    });

    // Add benefits as repeater field
    const benefitsField = await Field.create({
      section: whyChooseSection._id,
      fieldName: 'benefits',
      fieldType: 'repeater',
      repeaterValue: benefitsData
    });

    whyChooseSection.fields = [whyTitleField._id, whySubtitleField._id, benefitsField._id];
    await whyChooseSection.save();
    console.log(`✅ Added ${FALLBACK_BENEFITS.length} benefits to "Why Choose Us" section`);

    console.log('\n✅ ✅ ✅ All content seeded successfully!');
    console.log('📊 You can now see the data in Admin Panel → Pages → Select Page');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
};

seedPageContent();
