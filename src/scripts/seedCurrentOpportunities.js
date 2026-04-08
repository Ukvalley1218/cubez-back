import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const seedCurrentOpportunities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cubez');
    console.log('✓ Connected to MongoDB');

    const opportunitiesContent = [
      // Hero
      {
        key: 'opportunities-hero',
        page: 'current-opportunities',
        section: 'hero',
        title: 'Current Investment Opportunities',
        subtitle: 'Designed for Stability and Growth',
        image: '',
        isActive: true
      },
      // Overview
      {
        key: 'opportunities-overview',
        page: 'current-opportunities',
        section: 'overview',
        title: 'Class B Preferred Share',
        subtitle: 'Capital Offering',
        content: 'Cubez Capital Inc. is currently raising capital through Class B Preferred Shares. This raise supports a diversified pipeline of real estate-backed and private capital opportunities designed to deliver stable, predictable investor returns.',
        image: '',
        isActive: true
      },
      // Highlights (6 individual items)
      {
        key: 'opportunity-highlight-1',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'shares',
        title: 'Class B Preferred Share Structure',
        description: 'Structured investment with defined returns and shareholder priority over common equity.',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunity-highlight-2',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'security',
        title: 'Asset-Backed Deployment',
        description: 'Capital invested into real estate and private capital positions with tangible security.',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunity-highlight-3',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'diversified',
        title: 'Diversified Project Pipeline',
        description: 'Spread across property flips, lending, joint ventures, and strategic equity positions.',
        order: 3,
        isActive: true
      },
      {
        key: 'opportunity-highlight-4',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'returns',
        title: 'Fixed Annual Return',
        description: 'Predictable returns structured for consistent income, not market-dependent gains.',
        order: 4,
        isActive: true
      },
      {
        key: 'opportunity-highlight-5',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'clock',
        title: 'Early Investor Access',
        description: 'Current raise offers priority allocation for early participants before broader offering.',
        order: 5,
        isActive: true
      },
      {
        key: 'opportunity-highlight-6',
        page: 'current-opportunities',
        section: 'highlights',
        icon: 'shield',
        title: 'Limited Allocation',
        description: 'Structured offering with defined capacity, ensuring disciplined capital deployment.',
        order: 6,
        isActive: true
      },
      // Use of Funds (5 individual items)
      {
        key: 'opportunity-fund-1',
        page: 'current-opportunities',
        section: 'use-of-funds',
        title: 'Property Acquisition & Renovation',
        description: 'Capital deployed to acquire undervalued properties and fund strategic renovations for resale.',
        percentage: '40%',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunity-fund-2',
        page: 'current-opportunities',
        section: 'use-of-funds',
        title: 'Secured Private Lending',
        description: 'Short-term loans to experienced developers and investors, secured by real estate assets.',
        percentage: '30%',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunity-fund-3',
        page: 'current-opportunities',
        section: 'use-of-funds',
        title: 'Joint Venture Development',
        description: 'Partnership investments in high-potential development projects with defined exit strategies.',
        percentage: '15%',
        order: 3,
        isActive: true
      },
      {
        key: 'opportunity-fund-4',
        page: 'current-opportunities',
        section: 'use-of-funds',
        title: 'Strategic Equity Positions',
        description: 'Investments in private ventures and development opportunities for portfolio diversification.',
        percentage: '10%',
        order: 4,
        isActive: true
      },
      {
        key: 'opportunity-fund-5',
        page: 'current-opportunities',
        section: 'use-of-funds',
        title: 'Working Capital & Reserves',
        description: 'Operational reserves ensuring liquidity and the ability to capitalize on emerging opportunities.',
        percentage: '5%',
        order: 5,
        isActive: true
      },
      // Showcase Images
      {
        key: 'opportunities-real-estate',
        page: 'current-opportunities',
        section: 'showcase',
        image: '',
        isActive: true
      },
      {
        key: 'opportunities-capital',
        page: 'current-opportunities',
        section: 'showcase',
        image: '',
        isActive: true
      },
      {
        key: 'opportunities-development',
        page: 'current-opportunities',
        section: 'showcase',
        image: '',
        isActive: true
      },
      // Investment Section
      {
        key: 'opportunities-investment',
        page: 'current-opportunities',
        section: 'investment',
        title: 'Where Your Capital Works',
        content: 'Investor funds are deployed into carefully selected opportunities with strong return potential and asset security. Every investment decision is backed by thorough research, professional due diligence, and a commitment to protecting investor capital.',
        image: '',
        isActive: true
      },
      // Why Now Section
      {
        key: 'opportunities-why-now',
        page: 'current-opportunities',
        section: 'why-now',
        title: 'This Opportunity Matters Now',
        content: 'This offering gives investors access to a curated, asset-backed opportunity at a stage where capital can be strategically deployed into a diversified pipeline with disciplined oversight and high return potential.',
        image: '',
        isActive: true
      },
      // Why Now Points (3 individual items)
      {
        key: 'opportunities-why-point-1',
        page: 'current-opportunities',
        section: 'why-now-points',
        title: 'Early Participation Advantage',
        description: 'Access to preferred pricing and priority allocation before broader offering.',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunities-why-point-2',
        page: 'current-opportunities',
        section: 'why-now-points',
        title: 'Limited Allocation',
        description: 'Structured offering capacity ensures disciplined deployment and investor priority.',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunities-why-point-3',
        page: 'current-opportunities',
        section: 'why-now-points',
        title: 'Diversified Deployment',
        description: 'Capital spread across multiple opportunities reduces concentration risk.',
        order: 3,
        isActive: true
      },
      // Structure Image
      {
        key: 'opportunities-structure',
        page: 'current-opportunities',
        section: 'structure',
        image: '',
        isActive: true
      },
      // Structure Terms (6 individual items)
      {
        key: 'opportunity-term-1',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Security Type',
        value: 'Class B Preferred Shares',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunity-term-2',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Annual Return',
        value: '8-12%',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunity-term-3',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Payment Frequency',
        value: 'Annual Dividends',
        order: 3,
        isActive: true
      },
      {
        key: 'opportunity-term-4',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Investment Priority',
        value: 'Preferred Over Common',
        order: 4,
        isActive: true
      },
      {
        key: 'opportunity-term-5',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Asset Backing',
        value: 'Real Estate Portfolio',
        order: 5,
        isActive: true
      },
      {
        key: 'opportunity-term-6',
        page: 'current-opportunities',
        section: 'structure-terms',
        label: 'Redemption',
        value: 'Corporate Buyback Option',
        order: 6,
        isActive: true
      },
      // Exit Steps (3 individual items)
      {
        key: 'opportunity-exit-1',
        page: 'current-opportunities',
        section: 'exit-steps',
        step: '01',
        title: 'Investment Period',
        description: 'Funds are deployed across diversified opportunities with defined investment horizons.',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunity-exit-2',
        page: 'current-opportunities',
        section: 'exit-steps',
        step: '02',
        title: 'Return Generation',
        description: 'Annual dividends are calculated and distributed according to preferred share terms.',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunity-exit-3',
        page: 'current-opportunities',
        section: 'exit-steps',
        step: '03',
        title: 'Redemption Option',
        description: 'Investors may exit through corporate redemption, subject to offering terms and availability.',
        order: 3,
        isActive: true
      },
      // Limited Opportunity
      {
        key: 'opportunities-limited',
        page: 'current-opportunities',
        section: 'limited',
        title: 'Early Investor Access Now Open',
        content: 'This opportunity is available on a limited basis for early investors participating in the current raise. Allocation is structured to ensure disciplined deployment and priority positioning for early participants.',
        ctaText: 'Request Investor Package',
        ctaLink: '/invest-with-confidence',
        image: '',
        isActive: true
      },
      // Limited Points (3 individual items)
      {
        key: 'opportunities-limited-point-1',
        page: 'current-opportunities',
        section: 'limited-points',
        text: 'Limited allocation',
        order: 1,
        isActive: true
      },
      {
        key: 'opportunities-limited-point-2',
        page: 'current-opportunities',
        section: 'limited-points',
        text: 'Early investor priority',
        order: 2,
        isActive: true
      },
      {
        key: 'opportunities-limited-point-3',
        page: 'current-opportunities',
        section: 'limited-points',
        text: 'Structured opportunity',
        order: 3,
        isActive: true
      },
      // Final CTA
      {
        key: 'opportunities-cta',
        page: 'current-opportunities',
        section: 'cta',
        title: "Secure Your Position in Cubez Capital's Current Opportunity",
        content: 'Request the investor package to explore the current raise, offering structure, and asset-backed investment pathway designed for long-term confidence.',
        ctaText: 'Request Investor Package',
        ctaLink: '/invest-with-confidence',
        secondaryCtaText: 'Speak With Our Team',
        secondaryCtaLink: '/contact',
        isActive: true
      }
    ];

    // Check if content already exists and update or create
    for (const content of opportunitiesContent) {
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

seedCurrentOpportunities();