import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Metric from './models/Metric.js';
import Faq from './models/Faq.js';
import Opportunity from './models/Opportunity.js';
import ContentSection from './models/ContentSection.js';
import Navigation from './models/Navigation.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB connection string not found in environment variables');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Seed default admin user
const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!existingAdmin) {
    await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@cubezcapital.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin',
      role: 'superadmin'
    });
    console.log('Default admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

// Seed default metrics
const seedMetrics = async () => {
  const defaultMetrics = [
    { key: 'assetsUnderManagement', value: 250, suffix: 'M+', label: 'Assets Under Management' },
    { key: 'activeInvestors', value: 500, suffix: '+', label: 'Active Investors' },
    { key: 'principalLosses', value: 0, suffix: '', label: 'Principal Losses' },
    { key: 'yearsOfExcellence', value: 12, suffix: '+', label: 'Years of Excellence' }
  ];

  for (const metric of defaultMetrics) {
    const existing = await Metric.findOne({ key: metric.key });
    if (!existing) {
      await Metric.create(metric);
    }
  }
  console.log('Default metrics seeded');
};

// Seed default FAQs
const seedFaqs = async () => {
  const defaultFaqs = [
    { category: 'general', question: 'What is Cubez Capital Inc.?', answer: 'Cubez Capital Inc. is a Canadian private investment company focused on asset-backed investments, including real estate, private lending, and strategic equity projects.', order: 1 },
    { category: 'general', question: 'How do investors earn returns?', answer: 'Investors earn fixed, predictable returns through Class B Preferred Shares, backed by diversified, asset-based investments.', order: 2 },
    { category: 'security', question: 'Is my investment secured?', answer: 'Yes, investments are structured with real estate-backed assets, secured lending, and strict risk management practices.', order: 1 },
    { category: 'general', question: 'What is the minimum investment?', answer: 'The minimum investment depends on the current offering and will be shared in the investor package.', order: 3 },
    { category: 'process', question: 'How can I exit my investment?', answer: 'Investors can exit through share redemption based on the terms outlined in the offering, including return of capital and accumulated dividends.', order: 1 },
    { category: 'general', question: 'Who can invest?', answer: 'Eligible investors include accredited investors, business associates, and qualified private investors under applicable regulations.', order: 4 },
    { category: 'general', question: 'What makes Cubez Capital different?', answer: 'Cubez Capital focuses on asset-backed investments, disciplined risk management, and delivering consistent, predictable returns with transparency.', order: 5 }
  ];

  for (const faq of defaultFaqs) {
    const existing = await Faq.findOne({ question: faq.question });
    if (!existing) {
      await Faq.create(faq);
    }
  }
  console.log('Default FAQs seeded');
};

// Seed default opportunities
const seedOpportunities = async () => {
  const defaultOpportunities = [
    {
      type: 'Private Lending',
      title: 'GTA Commercial Portfolio',
      location: 'Toronto, Ontario',
      returns: '10%',
      term: '18 months',
      minInvestment: '$50,000',
      status: 'Open',
      highlights: ['First-lien position', 'Income-producing assets', 'Quarterly reporting'],
      description: 'Secure private lending opportunity backed by commercial real estate in the Greater Toronto Area.',
      featured: true,
      order: 1
    },
    {
      type: 'Real Estate Equity',
      title: 'Downtown Development Project',
      location: 'Mississauga, Ontario',
      returns: '12-15%',
      term: '24-36 months',
      minInvestment: '$100,000',
      status: 'Limited',
      highlights: ['Prime location', 'Pre-sold units', 'Experienced developer'],
      description: 'Equity investment in a mixed-use development project in a high-growth area.',
      featured: true,
      order: 2
    },
    {
      type: 'Joint Venture',
      title: 'Residential Land Assembly',
      location: 'Brampton, Ontario',
      returns: '15-20%',
      term: '36-48 months',
      minInvestment: '$250,000',
      status: 'Open',
      highlights: ['Land appreciation', 'Development potential', 'Strategic location'],
      description: 'Joint venture opportunity for land assembly with significant development upside.',
      featured: false,
      order: 3
    }
  ];

  for (const opp of defaultOpportunities) {
    const existing = await Opportunity.findOne({ title: opp.title });
    if (!existing) {
      await Opportunity.create(opp);
    }
  }
  console.log('Default opportunities seeded');
};

// Seed default content sections
const seedContentSections = async () => {
  const defaultContent = [
    // === HOME PAGE - TEXT SECTIONS ===
    { key: 'home-hero', page: 'home', section: 'hero', title: 'Building Wealth Through Strategic, Asset-Backed Investments', subtitle: 'Secure your financial future with predictable returns backed by real assets. We combine institutional-grade risk management with personalized investment strategies.', ctaText: 'Invest With Confidence', ctaLink: '/invest-with-confidence', order: 1 },
    { key: 'home-trustbar', page: 'home', section: 'trustbar', content: JSON.stringify([{ icon: 'shield', label: 'Asset-Backed Investments', value: '100%' }, { icon: 'returns', label: 'Fixed Annual Returns', value: '8-12%' }, { icon: 'protection', label: 'Capital Protection', value: 'Secure' }, { icon: 'transparent', label: 'Transparent Reporting', value: 'Monthly' }]), order: 2 },
    { key: 'home-about-preview', page: 'home', section: 'about-preview', title: 'A Legacy of Excellence', subtitle: 'About Cubez Capital', content: 'Cubez Capital Inc. is a federally incorporated Canadian investment company specializing in secure, asset-backed investments. Since 2012, we have delivered consistent returns while maintaining zero principal losses.', highlights: JSON.stringify(['Regulated Investment Firm', '$250M+ Assets Under Management', 'Zero Principal Losses']), ctaText: 'Learn More About Us', ctaLink: '/about', order: 3 },
    { key: 'home-offering', page: 'home', section: 'offering', title: 'Class B Shares', subtitle: 'Investor Offering', content: 'Our Class B Shares provide investors with fixed returns, priority dividends, and a clear path to capital appreciation through strategic asset management.', order: 4 },
    { key: 'home-offering-items', page: 'home', section: 'offering-items', content: JSON.stringify([{ icon: 'returns', title: '8-12%', label: 'Fixed Annual Returns' }, { icon: 'shield', title: 'Priority', label: 'Dividend Payments' }, { icon: 'security', title: 'Secured', label: 'Asset-Backed' }, { icon: 'flexible', title: 'Flexible', label: 'Exit Options' }]), order: 5 },
    { key: 'home-risk', page: 'home', section: 'risk', title: 'Your Capital, Protected', subtitle: 'Risk Management', order: 6 },
    { key: 'home-risk-features', page: 'home', section: 'risk-features', content: JSON.stringify([{ icon: 'secured', title: 'Secured Investments', description: 'First-lien positions on all investments.' }, { icon: 'diversified', title: 'Diversification', description: 'Risk spread across multiple assets.' }, { icon: 'compliance', title: 'Full Compliance', description: 'Regulated and fully compliant operations.' }, { icon: 'validated', title: 'Third-Party Validation', description: 'Independent audits and valuations.' }]), order: 7 },
    { key: 'home-cta', page: 'home', section: 'cta', title: 'Ready to Invest?', subtitle: 'Start Your Journey', content: 'Schedule a confidential consultation with our team to explore investment opportunities tailored to your goals.', ctaText: 'Schedule Consultation', ctaLink: '/contact', order: 8 },
    
    // === HOME PAGE - IMAGE SECTIONS ===
    { key: 'service-real-estate', page: 'home', section: 'offering-items', title: 'Real Estate Investments', order: 1 },
    { key: 'service-lending', page: 'home', section: 'offering-items', title: 'Private Lending', order: 2 },
    { key: 'service-joint-venture', page: 'home', section: 'offering-items', title: 'Joint Ventures', order: 3 },
    { key: 'service-equity', page: 'home', section: 'offering-items', title: 'Equity Investments', order: 4 },
    { key: 'benefit-returns', page: 'home', section: 'benefits', title: 'Fixed Returns', order: 1 },
    { key: 'benefit-security', page: 'home', section: 'benefits', title: 'Asset Security', order: 2 },
    { key: 'benefit-priority', page: 'home', section: 'benefits', title: 'Priority Payouts', order: 3 },
    { key: 'benefit-diversification', page: 'home', section: 'benefits', title: 'Diversification', order: 4 },
    { key: 'benefit-professional', page: 'home', section: 'benefits', title: 'Professional Management', order: 5 },
    { key: 'benefit-transparency', page: 'home', section: 'benefits', title: 'Full Transparency', order: 6 },
    { key: 'home-process', page: 'home', section: 'process', title: 'Process Section Background', order: 1 },
    
    // === ABOUT PAGE ===
    { key: 'about-hero', page: 'about', section: 'hero', title: 'About Cubez Capital', subtitle: 'Helping You Plan Your Financial Future', content: 'Cubez Capital Inc. is a Canadian private investment company focused on delivering secure, asset-backed investment opportunities with predictable returns.', order: 1 },
    { key: 'about-who', page: 'about', section: 'who', title: 'Building Long-Term Value', subtitle: 'Who We Are', content: 'Cubez Capital Inc. is a federally incorporated Canadian investment company focused on creating secure, high-yield opportunities for private investors. Since 2012, we have successfully deployed over $250 million in capital while maintaining zero principal losses—a testament to our disciplined, conservative approach.', order: 2 },
    { key: 'about-values', page: 'about', section: 'values', content: JSON.stringify([{ icon: 'integrity', title: 'Integrity', description: 'We operate with honesty and transparency in every decision.' }, { icon: 'discipline', title: 'Discipline', description: 'We invest only in vetted, high-quality opportunities.' }, { icon: 'security', title: 'Security', description: 'We prioritize capital protection above all else.' }, { icon: 'performance', title: 'Performance', description: 'We aim for consistent, above-market returns.' }, { icon: 'partnership', title: 'Partnership', description: 'We treat investor capital with the same care as our own.' }]), order: 3 },
    { key: 'about-vision', page: 'about', section: 'vision', title: 'Our Vision', content: 'To become a trusted national investment partner known for integrity, performance, and investor-first principles.', highlights: JSON.stringify(['Industry-leading returns', 'Unwavering investor trust', 'Sustainable wealth creation']), order: 4 },
    { key: 'about-mission', page: 'about', section: 'mission', title: 'Our Mission', content: 'To deliver stable, predictable returns through diversified, asset-backed investments while maintaining transparency and responsible risk management.', highlights: JSON.stringify(['Capital preservation first', 'Transparent communication', 'Consistent performance']), order: 5 },
    { key: 'about-image-2', page: 'about', section: 'content', title: 'Secondary About Image', order: 3 },
    { key: 'about-cta', page: 'about', section: 'cta', title: 'CTA Section Background', order: 4 },
    { key: 'about-trust', page: 'about', section: 'trust', title: 'Trust/Security Section Background', order: 5 },
    
    // === INVESTMENT STRATEGY PAGE ===
    { key: 'strategy-hero', page: 'investment-strategy', section: 'hero', title: 'Investment Strategy', subtitle: 'Building Wealth Through Disciplined, Asset-Backed Investments', order: 1 },
    { key: 'strategy-intro', page: 'investment-strategy', section: 'intro', title: 'Introduction Section Image', order: 1 },
    { key: 'strategy-intro-bg', page: 'investment-strategy', section: 'intro', title: 'Introduction Background', order: 2 },
    { key: 'strategy-real-estate', page: 'investment-strategy', section: 'strategies', title: 'Real Estate Flipping Strategy Image', order: 1 },
    { key: 'strategy-private-lending', page: 'investment-strategy', section: 'strategies', title: 'Private Lending Strategy Image', order: 2 },
    { key: 'strategy-joint-venture', page: 'investment-strategy', section: 'strategies', title: 'Joint Venture Strategy Image', order: 3 },
    { key: 'strategy-equity', page: 'investment-strategy', section: 'strategies', title: 'Equity Investments Strategy Image', order: 4 },
    { key: 'strategy-security', page: 'investment-strategy', section: 'benefits', title: 'Investment Security Image', order: 1 },
    { key: 'strategy-management', page: 'investment-strategy', section: 'benefits', title: 'Professional Management Image', order: 2 },
    { key: 'strategy-diversified', page: 'investment-strategy', section: 'benefits', title: 'Diversified Portfolio Image', order: 3 },
    
    // === CURRENT OPPORTUNITIES PAGE ===
    { key: 'opportunities-hero', page: 'current-opportunities', section: 'hero', title: 'Hero Section Image', order: 1 },
    { key: 'opportunities-overview', page: 'current-opportunities', section: 'overview', title: 'Investment Overview Image', order: 1 },
    { key: 'opportunities-real-estate', page: 'current-opportunities', section: 'content', title: 'Real Estate Opportunity Image', order: 1 },
    { key: 'opportunities-capital', page: 'current-opportunities', section: 'content', title: 'Capital Deployment Image', order: 2 },
    { key: 'opportunities-development', page: 'current-opportunities', section: 'content', title: 'Development Project Image', order: 3 },
    { key: 'opportunities-investment', page: 'current-opportunities', section: 'content', title: 'Investment Opportunity Image', order: 4 },
    { key: 'opportunities-structure', page: 'current-opportunities', section: 'content', title: 'Investment Structure Image', order: 5 },
    { key: 'opportunities-limited', page: 'current-opportunities', section: 'content', title: 'Limited Opportunity Image', order: 6 },
    
    // === HOW IT WORKS PAGE ===
    { key: 'howitworks-hero', page: 'how-it-works', section: 'hero', title: 'How It Works', subtitle: 'A streamlined process designed for clarity and your peace of mind.', order: 1 },
    
    // === RISK MANAGEMENT PAGE ===
    { key: 'risk-hero', page: 'risk-management', section: 'hero', title: 'A Disciplined Approach to Protecting Investor Capital', subtitle: 'Risk is managed through structured processes, asset-backed strategies, and careful project selection.', order: 1 },
    { key: 'risk-philosophy', page: 'risk-management', section: 'philosophy', title: 'Capital Protection Through Discipline', subtitle: 'Risk Philosophy', content: 'Cubez Capital follows a disciplined, conservative approach to managing risk, prioritizing capital protection alongside consistent return generation. Every investment decision is guided by structured processes, rigorous analysis, and a commitment to investor security.', highlights: JSON.stringify(['Conservative valuation practices', 'Asset-backed security for all investments', 'Systematic risk assessment protocols', 'Continuous portfolio monitoring']), order: 2 },
    { key: 'risk-main-image', page: 'risk-management', section: 'philosophy', title: 'Main Risk/Security Image', order: 1 },
    
    // === INVESTOR OFFERING PAGE ===
    { key: 'offering-hero', page: 'investor-offering', section: 'hero', title: 'Investor Offering Page Hero Image', order: 1 },
    
    // === CONTACT PAGE ===
    { key: 'contact-hero', page: 'contact', section: 'hero', title: "Let's Start a Conversation", subtitle: 'Contact Us', content: 'Ready to explore investment opportunities? Schedule a confidential consultation with our team.', order: 1 },
    { key: 'contact-form-bg', page: 'contact', section: 'form', title: 'Form Background Image', order: 1 }
  ];

  for (const content of defaultContent) {
    const existing = await ContentSection.findOne({ key: content.key });
    if (!existing) {
      await ContentSection.create(content);
    }
  }
  console.log('Default content sections seeded');
};

// Seed default navigation
const seedNavigation = async () => {
  const existingNavbar = await Navigation.findOne({ location: 'navbar' });

  if (!existingNavbar) {
    await Navigation.create({
      location: 'navbar',
      items: [
        { name: 'Home', href: '/', order: 1, isActive: true },
        { 
          name: 'Investments', 
          href: '/investments', 
          order: 2, 
          isActive: true,
          isDropdown: true,
          dropdownItems: [
            { name: 'Investment Strategy', href: '/investment-strategy', order: 1 },
            { name: 'Investor Offering', href: '/investor-offering', order: 2 },
            { name: 'Current Opportunities', href: '/current-opportunities', order: 3 }
          ]
        },
        { name: 'About', href: '/about', order: 3, isActive: true },
        { name: 'How It Works', href: '/how-it-works', order: 4, isActive: true },
        { name: 'Risk Management', href: '/risk-management', order: 5, isActive: true },
        { name: 'Contact', href: '/contact', order: 6, isActive: true }
      ]
    });
    console.log('Default navbar navigation created');
  } else {
    console.log('Navbar already exists');
  }

  const existingFooter = await Navigation.findOne({ location: 'footer' });

  if (!existingFooter) {
    await Navigation.create({
      location: 'footer',
      items: [
        { name: 'Home', href: '/', order: 1, isActive: true },
        { name: 'About', href: '/about', order: 2, isActive: true },
        { name: 'Investment Strategy', href: '/investment-strategy', order: 3, isActive: true },
        { name: 'How It Works', href: '/how-it-works', order: 4, isActive: true },
        { name: 'Risk Management', href: '/risk-management', order: 5, isActive: true },
        { name: 'Contact', href: '/contact', order: 6, isActive: true }
      ]
    });
    console.log('Default footer navigation created');
  } else {
    console.log('Footer already exists');
  }
};

// Run seed script
const runSeed = async () => {
  try {
    await connectDB();

    console.log('Seeding database...');

    await seedAdmin();
    await seedMetrics();
    await seedFaqs();
    await seedOpportunities();
    await seedContentSections();
    await seedNavigation();

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

runSeed();