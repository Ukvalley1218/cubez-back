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

const seedHowItWorksFields = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const howItWorksPage = await Page.findOne({ slug: 'how-it-works' });
    if (!howItWorksPage) {
      console.log('❌ How It Works page not found');
      process.exit(1);
    }

    console.log('📄 How It Works page found');

    // Seed Hero section
    console.log('\n⭐ Seeding Hero section field values...');
    let heroSection = await Section.findOne({ page: howItWorksPage._id, slug: 'hero' });

    if (heroSection) {
      await Field.deleteMany({ section: heroSection._id });

      await Field.create({
        section: heroSection._id,
        fieldName: 'title',
        fieldType: 'text',
        value: 'A Simple Path to Investing with Confidence'
      });

      await Field.create({
        section: heroSection._id,
        fieldName: 'subtitle',
        fieldType: 'textarea',
        value: 'Investment Journey'
      });

      await Field.create({
        section: heroSection._id,
        fieldName: 'content',
        fieldType: 'textarea',
        value: 'Cubez Capital provides a clear and guided investment process designed to help you participate in asset-backed opportunities with ease and transparency.'
      });

      console.log('✅ Seeded Hero section');
    }

    // Seed Journey Steps section
    console.log('\n🚶 Seeding Journey Steps section field values...');
    let journeyStepsSection = await Section.findOne({ page: howItWorksPage._id, slug: 'journey-steps' });

    if (journeyStepsSection) {
      await Field.deleteMany({ section: journeyStepsSection._id });

      const journeyStepsData = [
        {
          number: '01',
          title: 'Connect With Us',
          description: 'We begin by understanding your investment goals, timeline, and risk tolerance. Our team provides a personalized overview of available opportunities aligned with your objectives.',
          highlights: 'Personal consultation\nGoal assessment\nOpportunity overview',
          layout: 'left'
        },
        {
          number: '02',
          title: 'Review The Offering',
          description: 'Receive a comprehensive investor package including offering details, projected returns, risk factors, and all necessary documentation for informed decision-making.',
          highlights: 'Detailed documentation\nClear structure\nTransparent terms',
          layout: 'right'
        },
        {
          number: '03',
          title: 'Make Your Investment',
          description: 'Complete the subscription process and purchase Class B Preferred Shares. Our team guides you through each step to ensure a smooth and secure transaction.',
          highlights: 'Secure subscription\nShare purchase\nConfirmation provided',
          layout: 'left'
        },
        {
          number: '04',
          title: 'Capital Deployment',
          description: 'Your capital is allocated into carefully selected projects aligned with Cubez Capital\'s strategy—real estate acquisitions, private lending, joint ventures, and strategic equity positions.',
          highlights: 'Strategic allocation\nDiversified deployment\nProfessional oversight',
          layout: 'right'
        },
        {
          number: '05',
          title: 'Earn Returns',
          description: 'Investors receive fixed annual returns according to the preferred share structure, with structured payout priority and predictable income distribution.',
          highlights: 'Fixed annual returns\nPriority distributions\nPredictable income',
          layout: 'left'
        },
        {
          number: '06',
          title: 'Exit or Redeem',
          description: 'When you\'re ready, you may exit through structured redemption options based on offering terms. Our team ensures a smooth and transparent exit process.',
          highlights: 'Structured exit path\nTransparent process\nFlexible options',
          layout: 'right'
        }
      ];

      await Field.create({
        section: journeyStepsSection._id,
        fieldName: 'steps',
        fieldType: 'repeater',
        repeaterValue: journeyStepsData
      });

      console.log('✅ Seeded Journey Steps section');
    }

    // Seed Journey Introduction section
    console.log('\n💬 Seeding Journey Introduction section field values...');
    let journeyIntroSection = await Section.findOne({ page: howItWorksPage._id, slug: 'journey-intro' });

    if (journeyIntroSection) {
      await Field.deleteMany({ section: journeyIntroSection._id });

      await Field.create({
        section: journeyIntroSection._id,
        fieldName: 'title',
        fieldType: 'text',
        value: 'A Journey Built for You'
      });

      await Field.create({
        section: journeyIntroSection._id,
        fieldName: 'content',
        fieldType: 'textarea',
        value: 'From your first consultation to the final return distribution, every touchpoint is designed to be clear, professional, and investor-focused. Our team manages the complexity so you can focus on your returns.'
      });

      console.log('✅ Seeded Journey Introduction section');
    }

    // Seed After Investment section
    console.log('\n📈 Seeding After Investment section field values...');
    let afterInvestSection = await Section.findOne({ page: howItWorksPage._id, slug: 'after-invest' });

    if (afterInvestSection) {
      await Field.deleteMany({ section: afterInvestSection._id });

      const afterInvestSteps = [
        { title: 'Capital Management', description: 'Cubez Capital actively manages deployed capital across diversified projects.' },
        { title: 'Project Monitoring', description: 'Continuous oversight of all investments with regular performance tracking.' },
        { title: 'Regular Updates', description: 'Investors receive transparent communication about project progress.' },
        { title: 'Return Distribution', description: 'Returns are generated and distributed according to the offering schedule.' }
      ];

      await Field.create({
        section: afterInvestSection._id,
        fieldName: 'steps',
        fieldType: 'repeater',
        repeaterValue: afterInvestSteps
      });

      console.log('✅ Seeded After Investment section');
    }

    // Seed Communication section
    console.log('\n📞 Seeding Communication section field values...');
    let communicationSection = await Section.findOne({ page: howItWorksPage._id, slug: 'communication' });

    if (communicationSection) {
      await Field.deleteMany({ section: communicationSection._id });

      await Field.create({
        section: communicationSection._id,
        fieldName: 'content',
        fieldType: 'textarea',
        value: 'We believe informed investors make better decisions. That\'s why we prioritize clear, honest communication throughout your entire investment journey.'
      });

      const communicationPoints = [
        { title: 'Regular Investor Communication', description: 'Stay informed with scheduled updates on your investment performance and project milestones.' },
        { title: 'Clear Reporting', description: 'Receive detailed reports on capital deployment, project status, and return distributions.' },
        { title: 'Disciplined Oversight', description: 'Every project benefits from professional management and strategic guidance.' },
        { title: 'Transparency in Updates', description: 'Honest, straightforward communication about opportunities and challenges.' }
      ];

      await Field.create({
        section: communicationSection._id,
        fieldName: 'points',
        fieldType: 'repeater',
        repeaterValue: communicationPoints
      });

      console.log('✅ Seeded Communication section');
    }

    // Seed Timeline section
    console.log('\n⏰ Seeding Timeline section field values...');
    let timelineSection = await Section.findOne({ page: howItWorksPage._id, slug: 'timeline' });

    if (timelineSection) {
      await Field.deleteMany({ section: timelineSection._id });

      const timelineItems = [
        { phase: 'Onboarding', description: 'Complete verification and subscription' },
        { phase: 'Confirmation', description: 'Investment confirmed and documented' },
        { phase: 'Deployment', description: 'Capital allocated to projects' },
        { phase: 'Monitoring', description: 'Active project oversight begins' },
        { phase: 'Distribution', description: 'Returns distributed annually' },
        { phase: 'Exit Phase', description: 'Redemption options available' }
      ];

      await Field.create({
        section: timelineSection._id,
        fieldName: 'items',
        fieldType: 'repeater',
        repeaterValue: timelineItems
      });

      console.log('✅ Seeded Timeline section');
    }

    // Seed Trust Points section
    console.log('\n🤝 Seeding Trust Points section field values...');
    let trustPointsSection = await Section.findOne({ page: howItWorksPage._id, slug: 'trust-points' });

    if (trustPointsSection) {
      await Field.deleteMany({ section: trustPointsSection._id });

      const trustPoints = [
        { title: 'Structured Process', description: 'Every step is clearly defined with no hidden surprises.' },
        { title: 'Guided Experience', description: 'Professional support from initial inquiry to final exit.' },
        { title: 'Clear Journey', description: 'Know exactly what to expect at each stage of your investment.' },
        { title: 'Investor-First Approach', description: 'Your interests guide every decision we make.' }
      ];

      await Field.create({
        section: trustPointsSection._id,
        fieldName: 'points',
        fieldType: 'repeater',
        repeaterValue: trustPoints
      });

      console.log('✅ Seeded Trust Points section');
    }

    console.log('\n✅ ✅ ✅ All How It Works field values seeded successfully!');
    console.log('\nNow the admin panel can display and edit all How It Works sections.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedHowItWorksFields();