import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedHowItWorksComplete = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    const howItWorksContent = [
      // ===== HERO SECTION =====
      {
        key: 'howitworks-hero',
        page: 'how-it-works',
        section: 'howitworks-hero',
        title: 'A Simple Path to Investing with Confidence',
        subtitle: 'Investment Journey',
        content: 'Cubez Capital provides a clear and guided investment process designed to help you participate in asset-backed opportunities with ease and transparency.',
        image: '',
        isActive: true
      },

      // ===== JOURNEY INTRO =====
      {
        key: 'journey-intro',
        page: 'how-it-works',
        section: 'journey-intro',
        title: 'A Journey Built for You',
        content: 'From your first consultation to the final return distribution, every touchpoint is designed to be clear, professional, and investor-focused. Our team manages the complexity so you can focus on your returns.',
        isActive: true
      },

      // ===== JOURNEY STEPS (6 Individual Sections) =====
      {
        key: 'journey-step-1',
        page: 'how-it-works',
        section: 'journey-step-1',
        number: '01',
        title: 'Connect With Us',
        description: 'We begin by understanding your investment goals, timeline, and risk tolerance. Our team provides a personalized overview of available opportunities aligned with your objectives.',
        highlights: JSON.stringify(['Personal consultation', 'Goal assessment', 'Opportunity overview']),
        layout: 'left',
        isActive: true
      },
      {
        key: 'journey-step-2',
        page: 'how-it-works',
        section: 'journey-step-2',
        number: '02',
        title: 'Review The Offering',
        description: 'Receive a comprehensive investor package including offering details, projected returns, risk factors, and all necessary documentation for informed decision-making.',
        highlights: JSON.stringify(['Detailed documentation', 'Clear structure', 'Transparent terms']),
        layout: 'right',
        isActive: true
      },
      {
        key: 'journey-step-3',
        page: 'how-it-works',
        section: 'journey-step-3',
        number: '03',
        title: 'Make Your Investment',
        description: 'Complete the subscription process and purchase Class B Preferred Shares. Our team guides you through each step to ensure a smooth and secure transaction.',
        highlights: JSON.stringify(['Secure subscription', 'Share purchase', 'Confirmation provided']),
        layout: 'left',
        isActive: true
      },
      {
        key: 'journey-step-4',
        page: 'how-it-works',
        section: 'journey-step-4',
        number: '04',
        title: 'Capital Deployment',
        description: 'Your capital is allocated into carefully selected projects aligned with Cubez Capital\'s strategy—real estate acquisitions, private lending, joint ventures, and strategic equity positions.',
        highlights: JSON.stringify(['Strategic allocation', 'Diversified deployment', 'Professional oversight']),
        layout: 'right',
        isActive: true
      },
      {
        key: 'journey-step-5',
        page: 'how-it-works',
        section: 'journey-step-5',
        number: '05',
        title: 'Earn Returns',
        description: 'Investors receive fixed annual returns according to the preferred share structure, with structured payout priority and predictable income distribution.',
        highlights: JSON.stringify(['Fixed annual returns', 'Priority distributions', 'Predictable income']),
        layout: 'left',
        isActive: true
      },
      {
        key: 'journey-step-6',
        page: 'how-it-works',
        section: 'journey-step-6',
        number: '06',
        title: 'Exit or Redeem',
        description: 'When you\'re ready, you may exit through structured redemption options based on offering terms. Our team ensures a smooth and transparent exit process.',
        highlights: JSON.stringify(['Structured exit path', 'Transparent process', 'Flexible options']),
        layout: 'right',
        isActive: true
      },

      // ===== AFTER INVESTMENT STEPS (6 Individual Sections) =====
      {
        key: 'after-invest-1',
        page: 'how-it-works',
        section: 'after-invest-1',
        title: 'Investment Confirmation',
        description: 'Receive official documentation confirming your investment, share purchase details, and account information.',
        isActive: true
      },
      {
        key: 'after-invest-2',
        page: 'how-it-works',
        section: 'after-invest-2',
        title: 'Onboarding & Setup',
        description: 'Get set up in our investor portal to track your investment performance and access important documents.',
        isActive: true
      },
      {
        key: 'after-invest-3',
        page: 'how-it-works',
        section: 'after-invest-3',
        title: 'Capital Deployment',
        description: 'Your funds are strategically deployed into pre-identified opportunities within 30-60 days.',
        isActive: true
      },
      {
        key: 'after-invest-4',
        page: 'how-it-works',
        section: 'after-invest-4',
        title: 'Active Monitoring',
        description: 'Cubez Capital actively manages and monitors your investment projects on an ongoing basis.',
        isActive: true
      },
      {
        key: 'after-invest-5',
        page: 'how-it-works',
        section: 'after-invest-5',
        title: 'Regular Reporting',
        description: 'Receive quarterly and annual updates on investment performance and return distributions.',
        isActive: true
      },
      {
        key: 'after-invest-6',
        page: 'how-it-works',
        section: 'after-invest-6',
        title: 'Strategic Exit',
        description: 'Access redemption options when ready, with transparent communication throughout the process.',
        isActive: true
      },

      // ===== COMMUNICATION POINTS (4 Individual Sections) =====
      {
        key: 'communication-1',
        page: 'how-it-works',
        section: 'communication-1',
        title: 'Regular Investor Communication',
        description: 'Stay informed with scheduled updates on your investment performance and project milestones.',
        isActive: true
      },
      {
        key: 'communication-2',
        page: 'how-it-works',
        section: 'communication-2',
        title: 'Clear Reporting',
        description: 'Receive detailed reports on capital deployment, project status, and return distributions.',
        isActive: true
      },
      {
        key: 'communication-3',
        page: 'how-it-works',
        section: 'communication-3',
        title: 'Disciplined Oversight',
        description: 'Every project benefits from professional management and strategic guidance.',
        isActive: true
      },
      {
        key: 'communication-4',
        page: 'how-it-works',
        section: 'communication-4',
        title: 'Transparency in Updates',
        description: 'Honest, straightforward communication about opportunities and challenges.',
        isActive: true
      },

      // ===== TIMELINE (6 Individual Sections) =====
      {
        key: 'timeline-1',
        page: 'how-it-works',
        section: 'timeline-1',
        phase: 'Onboarding',
        description: 'Complete verification and subscription',
        isActive: true
      },
      {
        key: 'timeline-2',
        page: 'how-it-works',
        section: 'timeline-2',
        phase: 'Confirmation',
        description: 'Investment confirmed and documented',
        isActive: true
      },
      {
        key: 'timeline-3',
        page: 'how-it-works',
        section: 'timeline-3',
        phase: 'Deployment',
        description: 'Capital allocated to projects',
        isActive: true
      },
      {
        key: 'timeline-4',
        page: 'how-it-works',
        section: 'timeline-4',
        phase: 'Monitoring',
        description: 'Active project oversight begins',
        isActive: true
      },
      {
        key: 'timeline-5',
        page: 'how-it-works',
        section: 'timeline-5',
        phase: 'Distribution',
        description: 'Returns distributed annually',
        isActive: true
      },
      {
        key: 'timeline-6',
        page: 'how-it-works',
        section: 'timeline-6',
        phase: 'Exit Phase',
        description: 'Redemption options available',
        isActive: true
      },

      // ===== TRUST POINTS (4 Individual Sections) =====
      {
        key: 'trust-point-1',
        page: 'how-it-works',
        section: 'trust-point-1',
        title: 'Structured Process',
        description: 'Every step is clearly defined with no hidden surprises.',
        isActive: true
      },
      {
        key: 'trust-point-2',
        page: 'how-it-works',
        section: 'trust-point-2',
        title: 'Guided Experience',
        description: 'Professional support from initial inquiry to final exit.',
        isActive: true
      },
      {
        key: 'trust-point-3',
        page: 'how-it-works',
        section: 'trust-point-3',
        title: 'Clear Journey',
        description: 'Know exactly what to expect at each stage of your investment.',
        isActive: true
      },
      {
        key: 'trust-point-4',
        page: 'how-it-works',
        section: 'trust-point-4',
        title: 'Investor-First Approach',
        description: 'Your interests guide every decision we make.',
        isActive: true
      }
    ];

    // Upsert all sections
    for (const section of howItWorksContent) {
      await ContentSection.findOneAndUpdate(
        { key: section.key },
        section,
        { upsert: true, new: true }
      );
      console.log(`✓ Updated: ${section.key}`);
    }

    console.log('\n✓ How It Works page content seeded successfully!');
    console.log('✓ All sections are now individually editable in admin panel');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedHowItWorksComplete();
