import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedHowItWorksContent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    // Default How It Works page content
    const howItWorksContent = [
      {
        key: 'howitworks-hero',
        page: 'how-it-works',
        section: 'howitworks-hero',
        title: 'A Simple Path to Investing with Confidence',
        subtitle: 'Investment Journey',
        content: "Cubez Capital provides a clear and guided investment process designed to help you participate in asset-backed opportunities with ease and transparency.",
        image: '',
        isActive: true
      },
      {
        key: 'journey-intro',
        page: 'how-it-works',
        section: 'journey-intro',
        title: 'A Journey Built for You',
        content: "From your first consultation to the final return distribution, every touchpoint is designed to be clear, professional, and investor-focused. Our team manages the complexity so you can focus on your returns.",
        isActive: true
      },
      {
        key: 'journey-steps',
        page: 'how-it-works',
        section: 'journey-steps',
        steps: JSON.stringify([
          {
            number: '01',
            title: 'Connect With Us',
            description: "We begin by understanding your investment goals, timeline, and risk tolerance. Our team provides a personalized overview of available opportunities aligned with your objectives.",
            highlights: ['Personal consultation', 'Goal assessment', 'Opportunity overview'],
            layout: 'left'
          },
          {
            number: '02',
            title: 'Review The Offering',
            description: "Receive a comprehensive investor package including offering details, projected returns, risk factors, and all necessary documentation for informed decision-making.",
            highlights: ['Detailed documentation', 'Clear structure', 'Transparent terms'],
            layout: 'right'
          },
          {
            number: '03',
            title: 'Make Your Investment',
            description: "Complete the subscription process and purchase Class B Preferred Shares. Our team guides you through each step to ensure a smooth and secure transaction.",
            highlights: ['Secure subscription', 'Share purchase', 'Confirmation provided'],
            layout: 'left'
          },
          {
            number: '04',
            title: 'Capital Deployment',
            description: "Your capital is allocated into carefully selected projects aligned with Cubez Capital's strategy—real estate acquisitions, private lending, joint ventures, and strategic equity positions.",
            highlights: ['Strategic allocation', 'Diversified deployment', 'Professional oversight'],
            layout: 'right'
          },
          {
            number: '05',
            title: 'Earn Returns',
            description: "Investors receive fixed annual returns according to the preferred share structure, with structured payout priority and predictable income distribution.",
            highlights: ['Fixed annual returns', 'Priority distributions', 'Predictable income'],
            layout: 'left'
          },
          {
            number: '06',
            title: 'Exit or Redeem',
            description: "When you're ready, you may exit through structured redemption options based on offering terms. Our team ensures a smooth and transparent exit process.",
            highlights: ['Structured exit path', 'Transparent process', 'Flexible options'],
            layout: 'right'
          }
        ]),
        isActive: true
      },
      {
        key: 'after-invest',
        page: 'how-it-works',
        section: 'after-invest',
        steps: JSON.stringify([
          {
            title: 'Investment Confirmation',
            description: 'Receive official documentation confirming your investment, share purchase details, and account information.'
          },
          {
            title: 'Onboarding & Setup',
            description: 'Get set up in our investor portal to track your investment performance and access important documents.'
          },
          {
            title: 'Capital Deployment',
            description: 'Your funds are strategically deployed into pre-identified opportunities within 30-60 days.'
          },
          {
            title: 'Active Monitoring',
            description: 'Cubez Capital actively manages and monitors your investment projects on an ongoing basis.'
          },
          {
            title: 'Regular Reporting',
            description: 'Receive quarterly and annual updates on investment performance and return distributions.'
          },
          {
            title: 'Strategic Exit',
            description: 'Access redemption options when ready, with transparent communication throughout the process.'
          }
        ]),
        isActive: true
      },
      {
        key: 'communication',
        page: 'how-it-works',
        section: 'communication',
        points: JSON.stringify([
          { title: 'Regular Investor Communication', description: 'Stay informed with scheduled updates on your investment performance and project milestones.' },
          { title: 'Clear Reporting', description: 'Receive detailed reports on capital deployment, project status, and return distributions.' },
          { title: 'Disciplined Oversight', description: 'Every project benefits from professional management and strategic guidance.' },
          { title: 'Transparency in Updates', description: 'Honest, straightforward communication about opportunities and challenges.' }
        ]),
        isActive: true
      },
      {
        key: 'timeline',
        page: 'how-it-works',
        section: 'timeline',
        items: JSON.stringify([
          { phase: 'Onboarding', description: 'Complete verification and subscription' },
          { phase: 'Confirmation', description: 'Investment confirmed and documented' },
          { phase: 'Deployment', description: 'Capital allocated to projects' },
          { phase: 'Monitoring', description: 'Active project oversight begins' },
          { phase: 'Distribution', description: 'Returns distributed annually' },
          { phase: 'Exit Phase', description: 'Redemption options available' }
        ]),
        isActive: true
      },
      {
        key: 'trust-points',
        page: 'how-it-works',
        section: 'trust-points',
        points: JSON.stringify([
          { title: 'Structured Process', description: 'Every step is clearly defined with no hidden surprises.' },
          { title: 'Guided Experience', description: 'Professional support from initial inquiry to final exit.' },
          { title: 'Clear Journey', description: 'Know exactly what to expect at each stage of your investment.' },
          { title: 'Investor-First Approach', description: 'Your interests guide every decision we make.' }
        ]),
        isActive: true
      }
    ];

    // Check if content already exists and update or create
    for (const content of howItWorksContent) {
      const exists = await ContentSection.findOne({ key: content.key });
      if (exists) {
        await ContentSection.findByIdAndUpdate(exists._id, content, { new: true });
        console.log(`✓ Updated: ${content.key}`);
      } else {
        await ContentSection.create(content);
        console.log(`✓ Created: ${content.key}`);
      }
    }

    console.log('\n✓ How It Works page content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding How It Works content:', error.message);
    process.exit(1);
  }
};

seedHowItWorksContent();
