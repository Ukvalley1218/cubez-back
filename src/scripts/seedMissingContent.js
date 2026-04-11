import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

// Missing content from frontend fallback
const missingContent = [
  // Investment Strategy Page
  { key: 'strategy-hero', page: 'investment-strategy', section: 'hero', title: 'Investment Strategy', subtitle: 'Building Wealth Through Disciplined, Asset-Backed Investments', isActive: true },
  { key: 'strategy-intro', page: 'investment-strategy', section: 'intro', title: 'A Disciplined, Asset-Backed Investment Model', subtitle: 'Our Approach', content: 'Cubez Capital deploys investor funds into carefully selected opportunities including property flips, development financing, secured private lending, and strategic equity investments. Our strategy is built around three core principles: strong return potential, asset security, and disciplined project management.', isActive: true },
  { key: 'strategy-types', page: 'investment-strategy', section: 'strategies', content: JSON.stringify([{id:1,title:'Real Estate Flipping',shortTitle:'Property Flips',description:'We acquire undervalued properties, renovate strategically with cost-effective improvements, and sell for profit through our disciplined value-creation approach.',highlights:['Target returns of 15-25% per project','Typical hold period of 6-18 months','Hands-on renovation management','Strategic property selection']},{id:2,title:'Private Lending',shortTitle:'Secured Lending',description:'We provide short-term, secured loans to experienced developers and investors at attractive interest rates, backed by real estate collateral.',highlights:['First-lien position on all loans','Maximum 65% loan-to-value ratio','Fixed returns of 8-12% annually','Short-term commitments (6-24 months)']},{id:3,title:'Joint Venture Projects',shortTitle:'Development Partnerships',description:'We partner with established builders and developers on high-potential real estate projects, sharing both the risks and rewards.',highlights:['Strategic partnership approach','Target returns of 15-20% annually','Active project oversight','Defined exit strategies']},{id:4,title:'Strategic Equity Investments',shortTitle:'Equity Positions',description:'We invest in high-potential private ventures and development opportunities to diversify returns and capture long-term value appreciation.',highlights:['Diversified portfolio allocation','Long-term growth potential','Careful due diligence process','Professional management oversight']}]), isActive: true },
  { key: 'strategy-returns', page: 'investment-strategy', section: 'returns', content: JSON.stringify([{number:'01',title:'Identify Opportunities',description:'Our team identifies undervalued properties, promising development projects, and lending opportunities with strong fundamentals.'},{number:'02',title:'Evaluate & Select',description:'Each opportunity undergoes rigorous evaluation including market analysis, financial projections, and risk assessment.'},{number:'03',title:'Deploy Capital',description:'We structure investments with clear terms, defined timelines, and appropriate security measures to protect investor capital.'},{number:'04',title:'Active Management',description:'Our team actively manages each investment, overseeing renovations, monitoring loans, and tracking project milestones.'},{number:'05',title:'Generate Returns',description:'Through strategic sales, interest income, and project completions, we generate returns across our diversified portfolio.'},{number:'06',title:'Deliver to Investors',description:'Returns are distributed to investors according to their investment terms, with full transparency and reporting.'}]), isActive: true },
  { key: 'strategy-funds', page: 'investment-strategy', section: 'funds', content: JSON.stringify([{title:'Property Acquisition & Renovation',description:'Capital deployed to acquire undervalued properties and fund strategic renovations for resale.',percentage:'40%'},{title:'Secured Private Lending',description:'Short-term loans to experienced developers and investors, secured by real estate assets.',percentage:'30%'},{title:'Joint Venture Development',description:'Partnership investments in high-potential development projects with defined exit strategies.',percentage:'15%'},{title:'Strategic Equity Positions',description:'Investments in private ventures and development opportunities for portfolio diversification.',percentage:'10%'},{title:'Working Capital & Reserves',description:'Operational reserves ensuring liquidity and the ability to capitalize on emerging opportunities.',percentage:'5%'}]), isActive: true },
  { key: 'strategy-benefits', page: 'investment-strategy', section: 'benefits', content: JSON.stringify([{icon:'shield',title:'Real-Asset Backing',description:'Every investment secured by tangible real estate assets with clear collateral.'},{icon:'grid',title:'Diversified Allocation',description:'Strategic spread across multiple investment types reduces concentration risk.'},{icon:'chart',title:'Strong Return Potential',description:'Target returns of 8-25% depending on investment type and risk profile.'}]), isActive: true },
  { key: 'strategy-risk', page: 'investment-strategy', section: 'risk-approach', content: JSON.stringify([{title:'Third-Party Valuations',description:'Independent inspections and professional valuations before every investment commitment.'},{title:'Secured Lending',description:'All loans backed by real estate collateral with conservative loan-to-value ratios.'},{title:'Portfolio Diversification',description:'Capital allocated across multiple projects, property types, and investment durations.'},{title:'Budget Controls',description:'Strict budgeting, cost controls, and contingency reserves on every project.'},{title:'Transparent Reporting',description:'Regular investor updates with detailed performance reports and project status.'},{title:'Regulatory Compliance',description:'Full compliance with Canadian securities regulations and investor protection standards.'}]), isActive: true },
  { key: 'strategy-metrics', page: 'investment-strategy', section: 'metrics', content: JSON.stringify([{label:'Asset-Backed',value:'100',suffix:'%'},{label:'Investment Types',value:'4',suffix:''},{label:'Years Experience',value:'12',suffix:'+'},{label:'Principal Losses',value:'0',suffix:''}]), isActive: true },
  { key: 'strategy-cta', page: 'investment-strategy', section: 'cta', title: 'Ready to Invest with Confidence?', content: 'Schedule a confidential consultation with our team to explore investment opportunities.', ctaText: 'Start Your Investment Journey', ctaLink: '/contact', isActive: true },

  // Investor Offering Page
  { key: 'offering-hero', page: 'investor-offering', section: 'hero', title: 'Investor Offering', subtitle: 'Class B Preferred Shares', isActive: true },
  { key: 'offering-overview', page: 'investor-offering', section: 'overview', title: 'A Structured Path to Predictable Returns', subtitle: 'The Offering', content: "Cubez Capital's primary investment vehicle is Class B Preferred Shares, structured to give investors a predictable, interest-like return while supporting long-term growth and preserving founder control. This offering provides fixed annual returns, cumulative dividends, and preferred shareholder priority—all backed by a diversified portfolio of real-asset investments managed by an experienced team with a track record of zero principal losses.", isActive: true },
  { key: 'offering-vehicle', page: 'investor-offering', section: 'vehicle', title: 'Class B Preferred Shares', subtitle: 'Investment Structure', description: 'A security type designed for investors seeking predictable returns with priority treatment and real-asset backing.', bulletPoints: JSON.stringify([{icon:'returns',title:'Fixed Annual Return',description:'Predictable percentage returns on your invested capital, paid annually.'},{icon:'shield',title:'Cumulative Dividends',description:'Unpaid dividends accumulate and must be paid before common shareholders receive anything.'},{icon:'lock',title:'Asset-Backed Security',description:'Investments backed by diversified real estate and private capital positions.'},{icon:'exit',title:'Clear Redemption Path',description:'Structured exit process with return of capital plus accrued dividends.'},{icon:'check',title:'No Voting Responsibilities',description:'Passive investment with no management or governance duties required.'}]), isActive: true },
  { key: 'offering-vehicle-features', page: 'investor-offering', section: 'vehicle-features', content: JSON.stringify([{icon:'returns',title:'Fixed Annual Return',description:'Predictable percentage returns on your invested capital, paid annually.'},{icon:'shield',title:'Cumulative Dividends',description:'Unpaid dividends accumulate and must be paid before common shareholders receive anything.'},{icon:'lock',title:'Asset-Backed Security',description:'Investments backed by diversified real estate and private capital positions.'},{icon:'exit',title:'Clear Redemption Path',description:'Structured exit process with return of capital plus accrued dividends.'},{icon:'check',title:'No Voting Responsibilities',description:'Passive investment with no management or governance duties required.'}]), isActive: true },
  { key: 'offering-security-features', page: 'investor-offering', section: 'security-features', title: 'Priority & Security', subtitle: 'Investor Protection', content: 'Class B Preferred Shareholders receive priority treatment—dividends and liquidation proceeds are paid before common shareholders, and every investment is backed by tangible real-asset positions.', isActive: true },
  { key: 'offering-redemption', page: 'investor-offering', section: 'redemption', title: 'Redemption & Exit', subtitle: 'Exit Structure', content: 'Your investment includes a structured exit process through corporate redemption, providing clarity on when and how your capital is returned.', ctaText: 'Request Full Offering Documents', ctaLink: '/invest-with-confidence', isActive: true },
  { key: 'offering-final-cta', page: 'investor-offering', section: 'final-cta', title: 'Take the Next Step Toward Secure, Asset-Backed Investing', content: 'Request the Cubez Capital investor package to explore a structured offering designed for predictable returns, investor priority, and long-term confidence.', ctaText: 'Request Investor Package', ctaLink: '/invest-with-confidence', isActive: true },

  // Opportunities Page
  { key: 'opportunities-hero', page: 'current-opportunities', section: 'hero', title: 'Current Opportunities', subtitle: 'Explore our curated selection of investment opportunities', isActive: true },

  // Risk Management Page - Individual Sections for Admin Panel
  { key: 'risk-hero', page: 'risk-management', section: 'hero', title: 'A Disciplined Approach to Protecting Investor Capital', subtitle: 'Risk is managed through structured processes, asset-backed strategies, and careful project selection.', isActive: true },
  { key: 'risk-philosophy', page: 'risk-management', section: 'philosophy', title: 'Capital Protection Through Discipline', subtitle: 'Risk Philosophy', content: 'Cubez Capital follows a disciplined, conservative approach to managing risk, prioritizing capital protection alongside consistent return generation. Every investment decision is guided by structured processes, rigorous analysis, and a commitment to investor security.', highlights: 'Conservative valuation practices\nAsset-backed security for all investments\nSystematic risk assessment protocols\nContinuous portfolio monitoring', isActive: true },
  // Risk Pillars - Individual sections
  { key: 'risk-pillar-1', page: 'risk-management', section: 'pillars', icon: 'inspection', title: 'Third-Party Inspections', description: 'Independent valuations and inspections ensure objective assessment of all collateral assets before investment.', isActive: true },
  { key: 'risk-pillar-2', page: 'risk-management', section: 'pillars', icon: 'real-estate', title: 'Real Estate Collateral', description: 'All investments secured by first-lien positions on tangible real estate assets, providing robust protection.', isActive: true },
  { key: 'risk-pillar-3', page: 'risk-management', section: 'pillars', icon: 'diversified', title: 'Diversified Allocation', description: 'Strategic diversification across properties, markets, and asset classes to minimize concentration risk.', isActive: true },
  { key: 'risk-pillar-4', page: 'risk-management', section: 'pillars', icon: 'budget', title: 'Strict Budget Controls', description: 'Rigorous budgeting and cost management protocols ensure disciplined capital deployment and expense control.', isActive: true },
  { key: 'risk-pillar-5', page: 'risk-management', section: 'pillars', icon: 'compliance', title: 'Regulatory Compliance', description: 'Full compliance with Canadian securities regulations, ensuring legal protection and operational integrity.', isActive: true },
  { key: 'risk-pillar-6', page: 'risk-management', section: 'pillars', icon: 'reporting', title: 'Transparent Reporting', description: 'Regular, detailed reporting to investors on portfolio performance, risk metrics, and project status.', isActive: true },
  // Risk Approach Images
  { key: 'risk-approach-1', page: 'risk-management', section: 'approach', image: '', isActive: true },
  { key: 'risk-approach-2', page: 'risk-management', section: 'approach', image: '', isActive: true },
  { key: 'risk-approach-3', page: 'risk-management', section: 'approach', image: '', isActive: true },
  // Risk Safeguards - Individual sections
  { key: 'risk-safeguard-1', page: 'risk-management', section: 'safeguards', icon: 'shield', title: 'Real-Asset Backing', description: 'Every investment is backed by tangible real estate assets with clear, documented value.', isActive: true },
  { key: 'risk-safeguard-2', page: 'risk-management', section: 'safeguards', icon: 'lock', title: 'Secured Positions', description: 'First-lien positions ensure priority claims on collateral in the event of any default.', isActive: true },
  { key: 'risk-safeguard-3', page: 'risk-management', section: 'safeguards', icon: 'valuation', title: 'Conservative Valuation', description: 'Independent third-party appraisals with conservative assumptions to protect investor capital.', isActive: true },
  { key: 'risk-safeguard-4', page: 'risk-management', section: 'safeguards', icon: 'deployment', title: 'Structured Deployment', description: 'Capital deployed in stages based on milestone achievement, reducing exposure at any single point.', isActive: true },
  // Risk Diligence - Individual sections
  { key: 'risk-diligence-1', page: 'risk-management', section: 'diligence', number: '01', title: 'Opportunity Evaluation', description: 'Initial screening of investment opportunities against our strict criteria for asset quality and return potential.', isActive: true },
  { key: 'risk-diligence-2', page: 'risk-management', section: 'diligence', number: '02', title: 'Financial Analysis', description: 'Comprehensive financial and market analysis including cash flow projections, market comparables, and stress testing.', isActive: true },
  { key: 'risk-diligence-3', page: 'risk-management', section: 'diligence', number: '03', title: 'Risk Assessment', description: 'Detailed risk evaluation identifying potential issues and developing mitigation strategies for each risk factor.', isActive: true },
  { key: 'risk-diligence-4', page: 'risk-management', section: 'diligence', number: '04', title: 'Legal & Structural Review', description: 'Complete legal due diligence including title search, zoning verification, and structural integrity assessments.', isActive: true },
  { key: 'risk-diligence-5', page: 'risk-management', section: 'diligence', number: '05', title: 'Final Approval', description: 'Investment committee review and approval, ensuring all criteria are met before capital commitment.', isActive: true },
  // Risk Diligence Background
  { key: 'risk-diligence-bg', page: 'risk-management', section: 'diligence-bg', image: '', isActive: true },
  // Risk Framework
  { key: 'risk-framework', page: 'risk-management', section: 'framework', image: '', isActive: true },
  // Risk Monitoring - Individual sections
  { key: 'risk-monitoring-1', page: 'risk-management', section: 'monitoring', title: 'Continuous Project Monitoring', description: 'Real-time tracking of project progress, milestones, and potential issues through our dedicated oversight team.', isActive: true },
  { key: 'risk-monitoring-2', page: 'risk-management', section: 'monitoring', title: 'Performance Tracking', description: 'Regular analysis of investment performance metrics against projections and market benchmarks.', isActive: true },
  { key: 'risk-monitoring-3', page: 'risk-management', section: 'monitoring', title: 'Financial Oversight', description: 'Strict financial controls including budget monitoring, cash flow management, and audit procedures.', isActive: true },
  { key: 'risk-monitoring-4', page: 'risk-management', section: 'monitoring', title: 'Disciplined Execution', description: 'Systematic approach to executing investment strategies while maintaining flexibility for market conditions.', isActive: true },
  // Risk Transparency - Individual sections
  { key: 'risk-transparency-1', page: 'risk-management', section: 'transparency', title: 'Clear Investor Communication', description: 'Direct, honest communication about investment status, challenges, and opportunities.', isActive: true },
  { key: 'risk-transparency-2', page: 'risk-management', section: 'transparency', title: 'Regular Updates', description: 'Scheduled updates on portfolio performance, market conditions, and strategic decisions.', isActive: true },
  { key: 'risk-transparency-3', page: 'risk-management', section: 'transparency', title: 'Transparent Reporting', description: 'Comprehensive quarterly and annual reports with detailed financial statements and performance metrics.', isActive: true },
  // Risk Summary - Individual sections
  { key: 'risk-summary-1', page: 'risk-management', section: 'summary', icon: 'shield', title: 'Capital Protection Focus', description: 'Every decision prioritizes the safety and security of investor capital.', isActive: true },
  { key: 'risk-summary-2', page: 'risk-management', section: 'summary', icon: 'check', title: 'Disciplined Selection', description: 'Rigorous screening ensures only the most secure opportunities are presented.', isActive: true },
  { key: 'risk-summary-3', page: 'risk-management', section: 'summary', icon: 'document', title: 'Structured Processes', description: 'Well-defined procedures govern every aspect of investment management.', isActive: true },
  { key: 'risk-summary-4', page: 'risk-management', section: 'summary', icon: 'users', title: 'Investor-First Approach', description: 'Alignment of interests ensures our success is directly tied to investor outcomes.', isActive: true },
  // Risk CTA
  { key: 'risk-cta', page: 'risk-management', section: 'cta', title: 'Invest with Confidence Through a Disciplined Risk Framework', content: 'Connect with Cubez Capital to explore secure, structured investment opportunities backed by careful risk management.', ctaText: 'Request Investor Package', ctaLink: '/investment-strategy', isActive: true },

  // Contact Page
  { key: 'contact-hero', page: 'contact', section: 'hero', title: "Let's Start a Conversation", subtitle: 'Contact Us', content: 'Ready to explore investment opportunities? Schedule a confidential consultation with our team.', isActive: true },

  // How It Works Page
  { key: 'howitworks-hero', page: 'how-it-works', section: 'hero', title: 'How It Works', subtitle: 'A streamlined process designed for clarity and your peace of mind.', isActive: true }
];

async function seedMissingContent() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let updated = 0;

    for (const item of missingContent) {
      const existing = await ContentSection.findOne({ key: item.key });
      if (existing) {
        await ContentSection.findByIdAndUpdate(existing._id, item, { new: true });
        updated++;
        console.log(`Updated: ${item.key}`);
      } else {
        await ContentSection.create(item);
        added++;
        console.log(`Added: ${item.key}`);
      }
    }

    const total = await ContentSection.countDocuments();
    console.log('\n=== SUMMARY ===');
    console.log(`Added: ${added} documents`);
    console.log(`Updated: ${updated} documents`);
    console.log(`Total contentsections: ${total}`);

    await mongoose.disconnect();
    console.log('\n✅ Missing content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seedMissingContent();