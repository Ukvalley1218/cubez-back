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
  { title: 'Fixed Returns', description: 'Predictable, fixed annual returns designed for wealth accumulation.', order: 0 },
  { title: 'Asset Security', description: 'Every investment secured by tangible real estate assets.', order: 1 },
  { title: 'Priority Payouts', description: 'Preferred returns before any profit distribution.', order: 2 },
  { title: 'Diversification', description: 'Spread risk across multiple properties and markets.', order: 3 },
  { title: 'Professional Management', description: 'Expert team managing all aspects of your investment.', order: 4 },
  { title: 'Full Transparency', description: 'Regular, detailed reporting on your investment performance.', order: 5 },
];

const HERO_DATA = {
  title: 'Building Wealth Through Strategic, Asset-Backed Investments',
  subtitle: 'Secure your financial future with predictable returns backed by real assets. We combine institutional-grade risk management with personalized investment strategies.',
  ctaText: 'Canadian Private Investment Firm • Est. 2012',
  ctaLink: '/invest-with-confidence',
};

const seedFieldValues = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const homePage = await Page.findOne({ slug: 'home' });
    if (!homePage) {
      console.log('❌ Home page not found');
      process.exit(1);
    }

    console.log('🌍 Home page found');

    // Seed Hero section values
    console.log('\n⭐ Seeding "Hero" section field values...');
    let heroSection = await Section.findOne({ page: homePage._id, slug: 'hero' });
    
    if (heroSection) {
      // Delete existing field values for this section
      await Field.deleteMany({ section: heroSection._id });

      // Create title field
      await Field.create({
        section: heroSection._id,
        fieldName: 'title',
        fieldType: 'text',
        value: HERO_DATA.title
      });

      // Create subtitle field
      await Field.create({
        section: heroSection._id,
        fieldName: 'subtitle',
        fieldType: 'textarea',
        value: HERO_DATA.subtitle
      });

      // Create CTA text field
      await Field.create({
        section: heroSection._id,
        fieldName: 'ctaText',
        fieldType: 'text',
        value: HERO_DATA.ctaText
      });

      // Create CTA link field
      await Field.create({
        section: heroSection._id,
        fieldName: 'ctaLink',
        fieldType: 'text',
        value: HERO_DATA.ctaLink
      });

      console.log('✅ Seeded Hero section with 4 fields');
    } else {
      console.log('⚠️ Hero section not found, skipping...');
    }

    // Seed What We Do section values
    console.log('\n📦 Seeding "What We Do" section field values...');
    let whatWeDoSection = await Section.findOne({ page: homePage._id, slug: 'whatwedo' });
    
    if (!whatWeDoSection) {
      console.log('❌ "What We Do" section not found. Creating it...');
      whatWeDoSection = await Section.create({
        page: homePage._id,
        name: 'What We Do',
        slug: 'whatwedo',
        description: 'Service offerings',
        isActive: true,
        order: 3,
        fields: [
          { name: 'title', type: 'text', label: 'Section Title', required: false, order: 0 },
          { name: 'subtitle', type: 'textarea', label: 'Section Subtitle', required: false, order: 1 },
          { name: 'services', type: 'repeater', label: 'Services', required: false, order: 2, subfields: [
            { name: 'icon', type: 'text', label: 'Icon', required: false },
            { name: 'title', type: 'text', label: 'Service Title', required: true },
            { name: 'description', type: 'textarea', label: 'Description', required: false },
            { name: 'color', type: 'text', label: 'Color', required: false },
          ]}
        ]
      });
    }

    // Delete existing field values for this section
    await Field.deleteMany({ section: whatWeDoSection._id });

    // Create title field
    await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'title',
      fieldType: 'text',
      value: 'Strategic Investment Solutions'
    });

    // Create subtitle field
    await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'subtitle',
      fieldType: 'textarea',
      value: 'We specialize in asset-backed investments that prioritize capital preservation while delivering consistent, predictable returns.'
    });

    // Create services field
    await Field.create({
      section: whatWeDoSection._id,
      fieldName: 'services',
      fieldType: 'repeater',
      repeaterValue: FALLBACK_SERVICES
    });

    console.log(`✅ Added 3 fields to "What We Do" section with ${FALLBACK_SERVICES.length} services`);

    // Seed Why Choose Us section values
    console.log('\n🌟 Seeding "Why Choose Us" section field values...');
    let whyChooseSection = await Section.findOne({ page: homePage._id, slug: 'whychooseus' });
    
    if (!whyChooseSection) {
      console.log('❌ "Why Choose Us" section not found. Creating it...');
      whyChooseSection = await Section.create({
        page: homePage._id,
        name: 'Why Choose Us',
        slug: 'whychooseus',
        description: 'Benefits and advantages',
        isActive: true,
        order: 4,
        fields: [
          { name: 'title', type: 'text', label: 'Section Title', required: false, order: 0 },
          { name: 'subtitle', type: 'textarea', label: 'Section Subtitle', required: false, order: 1 },
          { name: 'benefits', type: 'repeater', label: 'Benefits', required: false, order: 2, subfields: [
            { name: 'title', type: 'text', label: 'Benefit Title', required: true },
            { name: 'description', type: 'textarea', label: 'Description', required: false },
          ]}
        ]
      });
    }

    // Delete existing field values
    await Field.deleteMany({ section: whyChooseSection._id });

    // Create title field
    await Field.create({
      section: whyChooseSection._id,
      fieldName: 'title',
      fieldType: 'text',
      value: 'The Cubez Capital Advantage'
    });

    // Create subtitle field
    await Field.create({
      section: whyChooseSection._id,
      fieldName: 'subtitle',
      fieldType: 'textarea',
      value: 'Experience the confidence that comes with partnering with a firm dedicated to protecting your capital.'
    });

    // Create benefits field
    await Field.create({
      section: whyChooseSection._id,
      fieldName: 'benefits',
      fieldType: 'repeater',
      repeaterValue: FALLBACK_BENEFITS
    });

    console.log(`✅ Added 3 fields to "Why Choose Us" section with ${FALLBACK_BENEFITS.length} benefits`);

    console.log('\n✅ ✅ ✅ All field values seeded successfully!');
    console.log('\nNow the admin panel can display this data when editing pages.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedFieldValues();
