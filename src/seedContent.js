import mongoose from 'mongoose';
import ContentSection from './models/ContentSection.js';
import ProcessStep from './models/ProcessStep.js';

const seedContent = async () => {
  // Opportunities Page Content
  const opportunitiesContent = [
    {
      key: 'opportunities-hero',
      page: 'opportunities',
      section: 'hero',
      title: 'Current Investment Opportunities',
      subtitle: 'Designed for Stability and Growth',
      image: ''
    },
    {
      key: 'opportunities-overview',
      page: 'opportunities',
      section: 'overview',
      title: 'Class B Preferred Share',
      subtitle: 'Capital Offering',
      content: 'Cubez Capital Inc. is currently raising capital through Class B Preferred Shares. This raise supports a diversified pipeline of real estate-backed and private capital opportunities designed to deliver stable, predictable investor returns.',
      image: ''
    },
    {
      key: 'opportunity-highlights',
      page: 'opportunities',
      section: 'highlights',
      title: 'Why Investors Choose This Opportunity',
      subtitle: 'Key Highlights',
      content: JSON.stringify([
        { title: 'Class B Preferred Share Structure', description: 'Structured investment with defined returns and shareholder priority over common equity.' },
        { title: 'Asset-Backed Deployment', description: 'Capital invested into real estate and private capital positions with tangible security.' },
        { title: 'Diversified Project Pipeline', description: 'Spread across property flips, lending, joint ventures, and strategic equity positions.' },
        { title: 'Fixed Annual Return', description: 'Predictable returns structured for consistent income, not market-dependent gains.' },
        { title: 'Early Investor Access', description: 'Current raise offers priority allocation for early participants before broader offering.' },
        { title: 'Limited Allocation', description: 'Structured offering with defined capacity, ensuring disciplined capital deployment.' }
      ])
    },
    {
      key: 'opportunity-use-of-funds',
      page: 'opportunities',
      section: 'use-of-funds',
      title: 'How Your Investment Is Deployed',
      subtitle: 'Capital Allocation',
      content: JSON.stringify([
        { title: 'Property Acquisition & Renovation', description: 'Capital deployed to acquire undervalued properties and fund strategic renovations for resale.', percentage: '40%' },
        { title: 'Secured Private Lending', description: 'Short-term loans to experienced developers and investors, secured by real estate assets.', percentage: '30%' },
        { title: 'Joint Venture Development', description: 'Partnership investments in high-potential development projects with defined exit strategies.', percentage: '15%' },
        { title: 'Strategic Equity Positions', description: 'Investments in private ventures and development opportunities for portfolio diversification.', percentage: '10%' },
        { title: 'Working Capital & Reserves', description: 'Operational reserves ensuring liquidity and the ability to capitalize on emerging opportunities.', percentage: '5%' }
      ])
    },
    {
      key: 'opportunities-investment',
      page: 'opportunities',
      section: 'investment',
      title: 'Where Your Capital Works',
      content: 'Investor funds are deployed into carefully selected opportunities with strong return potential and asset security. Every investment decision is backed by thorough research, professional due diligence, and a commitment to protecting investor capital.',
      image: ''
    },
    {
      key: 'opportunities-why-now',
      page: 'opportunities',
      section: 'why-now',
      title: 'This Opportunity Matters Now',
      content: 'This offering gives investors access to a curated, asset-backed opportunity at a stage where capital can be strategically deployed into a diversified pipeline with disciplined oversight and high return potential.',
      points: JSON.stringify([
        { title: 'Early Participation Advantage', description: 'Access to preferred pricing and priority allocation before broader offering.' },
        { title: 'Limited Allocation', description: 'Structured offering capacity ensures disciplined deployment and investor priority.' },
        { title: 'Diversified Deployment', description: 'Capital spread across multiple opportunities reduces concentration risk.' }
      ]),
      image: ''
    },
    {
      key: 'opportunities-structure-terms',
      page: 'opportunities',
      section: 'structure-terms',
      content: JSON.stringify([
        { label: 'Security Type', value: 'Class B Preferred Shares' },
        { label: 'Annual Return', value: '8-12%' },
        { label: 'Payment Frequency', value: 'Annual Dividends' },
        { label: 'Investment Priority', value: 'Preferred Over Common' },
        { label: 'Asset Backing', value: 'Real Estate Portfolio' },
        { label: 'Redemption', value: 'Corporate Buyback Option' }
      ])
    },
    {
      key: 'opportunities-exit-steps',
      page: 'opportunities',
      section: 'exit-steps',
      content: JSON.stringify([
        { step: '01', title: 'Investment Period', description: 'Funds are deployed across diversified opportunities with defined investment horizons.' },
        { step: '02', title: 'Return Generation', description: 'Annual dividends are calculated and distributed according to preferred share terms.' },
        { step: '03', title: 'Redemption Option', description: 'Investors may exit through corporate redemption, subject to offering terms and availability.' }
      ])
    },
    {
      key: 'opportunities-limited',
      page: 'opportunities',
      section: 'limited',
      title: 'Early Investor Access Now Open',
      content: 'This opportunity is available on a limited basis for early investors participating in the current raise. Allocation is structured to ensure disciplined deployment and priority positioning for early participants.',
      points: JSON.stringify(['Limited allocation', 'Early investor priority', 'Structured opportunity']),
      ctaText: 'Request Investor Package',
      ctaLink: '/invest-with-confidence',
      image: ''
    },
    {
      key: 'opportunities-cta',
      page: 'opportunities',
      section: 'cta',
      title: "Secure Your Position in Cubez Capital's Current Opportunity",
      content: 'Request the investor package to explore the current raise, offering structure, and asset-backed investment pathway designed for long-term confidence.',
      ctaText: 'Request Investor Package',
      ctaLink: '/invest-with-confidence',
      secondaryCtaText: 'Speak With Our Team',
      secondaryCtaLink: '/contact'
    }
  ];

  // Investor Offering Page Content
  const investorOfferingContent = [
    {
      key: 'offering-hero',
      page: 'investor-offering',
      section: 'hero',
      title: 'Invest With Confidence',
      subtitle: 'Transparent. Secure. Professional.',
      image: ''
    },
    {
      key: 'offering-overview',
      page: 'investor-offering',
      section: 'overview',
      title: 'Investment Overview',
      subtitle: 'Class B Preferred Shares',
      content: 'Cubez Capital offers investors the opportunity to participate in a diversified portfolio of real estate-backed investments through Class B Preferred Shares. This structure provides preferred returns, asset security, and professional management.',
      image: ''
    },
    {
      key: 'offering-vehicle',
      page: 'investor-offering',
      section: 'vehicle',
      title: 'Investment Vehicle',
      subtitle: 'Class B Preferred Shares',
      description: 'A structured investment vehicle designed for predictable returns and capital protection.',
      percentage: '8-12%',
      percentageLabel: 'Target Annual Return',
      bulletPoints: JSON.stringify([
        { icon: 'returns', title: 'Fixed Annual Return', description: 'Predictable percentage returns on your invested capital, paid annually.' },
        { icon: 'shield', title: 'Cumulative Dividends', description: 'Unpaid dividends accumulate and must be paid before common shareholders receive anything.' },
        { icon: 'lock', title: 'Asset-Backed Security', description: 'Investments backed by diversified real estate and private capital positions.' },
        { icon: 'exit', title: 'Clear Redemption Path', description: 'Structured exit process with return of capital plus accrued dividends.' },
        { icon: 'check', title: 'No Voting Responsibilities', description: 'Passive investment with no management or governance duties required.' }
      ])
    },
    {
      key: 'offering-feature-1',
      page: 'investor-offering',
      section: 'features',
      icon: 'returns',
      title: 'Fixed, Predictable Returns',
      description: 'Earn stable annual returns designed for consistent wealth accumulation, not market-dependent gains.'
    },
    {
      key: 'offering-feature-2',
      page: 'investor-offering',
      section: 'features',
      icon: 'shield',
      title: 'Priority Over Founders',
      description: 'Class B shareholders receive dividend and liquidation preference before common shareholders.'
    },
    {
      key: 'offering-feature-3',
      page: 'investor-offering',
      section: 'features',
      icon: 'security',
      title: 'Asset-Backed Security',
      description: 'Every investment is backed by diversified real estate and private capital positions.'
    },
    {
      key: 'offering-feature-4',
      page: 'investor-offering',
      section: 'features',
      icon: 'diversified',
      title: 'Diversified Portfolio',
      description: 'Capital deployed across multiple projects, property types, and lending positions.'
    },
    {
      key: 'offering-feature-5',
      page: 'investor-offering',
      section: 'features',
      icon: 'clock',
      title: 'Clear Exit Path',
      description: 'Structured redemption process with defined timelines and return of capital.'
    },
    {
      key: 'offering-security-1',
      page: 'investor-offering',
      section: 'security',
      icon: 'shield',
      title: 'First-Lien Security',
      description: 'All loans secured by first-position liens on real estate assets.'
    },
    {
      key: 'offering-security-2',
      page: 'investor-offering',
      section: 'security',
      icon: 'protection',
      title: 'Conservative LTV',
      description: 'Maximum 65% loan-to-value ratios ensuring substantial equity cushion.'
    },
    {
      key: 'offering-security-3',
      page: 'investor-offering',
      section: 'security',
      icon: 'check',
      title: 'Regular Reporting',
      description: 'Transparent updates on investment performance and project status.'
    },
    {
      key: 'offering-redemption',
      page: 'investor-offering',
      section: 'redemption',
      title: 'Redemption & Exit',
      subtitle: 'Structured Exit Path',
      content: 'Investors may exit through structured redemption options, ensuring clarity and confidence in their investment timeline.',
      ctaText: 'Request Investor Package',
      ctaLink: '/invest-with-confidence'
    },
    {
      key: 'offering-final-cta',
      page: 'investor-offering',
      section: 'cta',
      title: 'Ready to Invest?',
      content: 'Join our community of investors building wealth through disciplined, asset-backed investments.',
      ctaText: 'Get Started Today',
      ctaLink: '/invest-with-confidence',
      secondaryCtaText: 'Speak With Our Team',
      secondaryCtaLink: '/contact'
    }
  ];

  // Process Steps for Home Page
  const processSteps = [
    { number: '01', title: 'Connect', description: 'Schedule a confidential consultation with our team.', page: 'home', order: 1, isActive: true },
    { number: '02', title: 'Review', description: 'Receive and review detailed investment documentation.', page: 'home', order: 2, isActive: true },
    { number: '03', title: 'Invest', description: 'Commit your capital to the selected opportunity.', page: 'home', order: 3, isActive: true },
    { number: '04', title: 'Deploy', description: 'We deploy capital into secured investment positions.', page: 'home', order: 4, isActive: true },
    { number: '05', title: 'Earn', description: 'Receive predictable returns on your investment.', page: 'home', order: 5, isActive: true },
    { number: '06', title: 'Exit', description: 'Capital returned at term completion with gains.', page: 'home', order: 6, isActive: true }
  ];

  try {
    // Seed opportunities content
    for (const content of opportunitiesContent) {
      await ContentSection.findOneAndUpdate(
        { key: content.key },
        { $set: { ...content, isActive: true } },
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded: ${content.key}`);
    }

    // Seed investor offering content
    for (const content of investorOfferingContent) {
      await ContentSection.findOneAndUpdate(
        { key: content.key },
        { $set: { ...content, isActive: true } },
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded: ${content.key}`);
    }

    // Seed process steps
    for (const step of processSteps) {
      await ProcessStep.findOneAndUpdate(
        { key: `process-step-${step.order}`, page: step.page },
        { $set: step },
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded process step: ${step.number} - ${step.title}`);
    }

    console.log('\n🎉 All content seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding content:', error);
  }
};

export default seedContent;