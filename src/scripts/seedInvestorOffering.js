import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedInvestorOffering = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    // Investor Offering page content
    const offeringContent = [
      {
        key: 'offering-hero',
        page: 'investor-offering',
        section: 'offering-hero',
        title: 'Invest With Confidence',
        subtitle: 'Transparent. Secure. Professional.',
        image: '',
        isActive: true
      },
      {
        key: 'offering-overview',
        page: 'investor-offering',
        section: 'offering-overview',
        title: 'Investment Overview',
        subtitle: 'Class B Preferred Shares',
        content: 'Cubez Capital offers investors the opportunity to participate in a diversified portfolio of real estate-backed investments through Class B Preferred Shares.',
        highlights: JSON.stringify([
          'Fixed Annual Returns',
          'Asset-Backed Security',
          'Investor Priority'
        ]),
        image: '',
        image2: '',
        isActive: true
      },
      {
        key: 'offering-vehicle',
        page: 'investor-offering',
        section: 'offering-vehicle',
        title: 'Class B Preferred Shares',
        subtitle: 'Investment Structure',
        description: 'A security type designed for investors seeking predictable returns with priority treatment and real-asset backing.',
        percentage: '8-12%',
        percentageLabel: 'Fixed Return',
        bulletPoints: JSON.stringify([
          { icon: 'returns', title: 'Fixed Annual Return', description: 'Predictable percentage returns on your invested capital, paid annually.' },
          { icon: 'shield', title: 'Cumulative Dividends', description: 'Unpaid dividends accumulate and must be paid before common shareholders receive anything.' },
          { icon: 'lock', title: 'Asset-Backed Security', description: 'Investments backed by diversified real estate and private capital positions.' },
          { icon: 'exit', title: 'Clear Redemption Path', description: 'Structured exit process with return of capital plus accrued dividends.' },
          { icon: 'check', title: 'No Voting Responsibilities', description: 'Passive investment with no management or governance duties required.' }
        ]),
        isActive: true
      },
      {
        key: 'offering-feature-1',
        page: 'investor-offering',
        section: 'offering-feature-1',
        title: 'Fixed Annual Return',
        description: 'Predictable percentage returns on your invested capital, paid annually.',
        icon: 'returns',
        isActive: true
      },
      {
        key: 'offering-feature-2',
        page: 'investor-offering',
        section: 'offering-feature-2',
        title: 'Priority Over Common Shareholders',
        description: 'Dividends and liquidation proceeds are paid before common shareholders receive anything.',
        icon: 'shield',
        isActive: true
      },
      {
        key: 'offering-feature-3',
        page: 'investor-offering',
        section: 'offering-feature-3',
        title: 'Real-Asset Backing',
        description: 'Every investment is backed by tangible real estate and private capital positions.',
        icon: 'lock',
        isActive: true
      },
      {
        key: 'offering-feature-4',
        page: 'investor-offering',
        section: 'offering-feature-4',
        title: 'Diversified Portfolio',
        description: 'Capital deployed across multiple projects, property types, and lending positions.',
        icon: 'returns',
        isActive: true
      },
      {
        key: 'offering-feature-5',
        page: 'investor-offering',
        section: 'offering-feature-5',
        title: 'Passive Management',
        description: 'No active management responsibilities. Cubez Capital handles all operations professionally.',
        icon: 'shield',
        isActive: true
      },
      {
        key: 'offering-security-1',
        page: 'investor-offering',
        section: 'offering-security-1',
        title: 'First-Lien Security',
        description: 'All loans secured by first-position liens on real estate assets.',
        icon: 'shield',
        isActive: true
      },
      {
        key: 'offering-security-2',
        page: 'investor-offering',
        section: 'offering-security-2',
        title: 'Conservative LTV',
        description: 'Maximum 65% loan-to-value ratios ensuring substantial equity cushion.',
        icon: 'lock',
        isActive: true
      },
      {
        key: 'offering-security-3',
        page: 'investor-offering',
        section: 'offering-security-3',
        title: 'Regular Reporting',
        description: 'Transparent updates on investment performance and project status.',
        icon: 'returns',
        isActive: true
      },
      {
        key: 'offering-redemption',
        page: 'investor-offering',
        section: 'offering-redemption',
        title: 'Redemption & Exit',
        subtitle: 'Clear Path to Capital Return',
        content: 'Class B Preferred Shareholders have a clear redemption path designed to return capital with accrued dividends.',
        ctaText: 'Learn More',
        ctaLink: '/contact',
        isActive: true
      },
      {
        key: 'offering-final-cta',
        page: 'investor-offering',
        section: 'offering-final-cta',
        title: 'Ready to Start Investing?',
        content: 'Join experienced investors in building wealth through structured, diversified real estate investments with Cubez Capital.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        secondaryCtaText: 'View Offering Documents',
        secondaryCtaLink: '#documents',
        isActive: true
      },
      {
        key: 'offering-security',
        page: 'investor-offering',
        section: 'offering-security',
        title: 'Priority & Security',
        subtitle: 'Investor Protection',
        content: 'Class B Preferred Shareholders receive priority treatment—dividends and liquidation proceeds are paid before common shareholders, and every investment is backed by tangible real-asset positions.',
        isActive: true
      }
    ];

    // Check if content already exists and update or create
    for (const content of offeringContent) {
      const exists = await ContentSection.findOne({ key: content.key });
      if (exists) {
        await ContentSection.findByIdAndUpdate(exists._id, content, { new: true });
        console.log(`✓ Updated: ${content.key}`);
      } else {
        await ContentSection.create(content);
        console.log(`✓ Created: ${content.key}`);
      }
    }

    console.log('\n✓ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedInvestorOffering();
