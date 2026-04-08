const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// ContentSection schema
const contentSectionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  page: { type: String, required: true },
  section: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ContentSection = mongoose.model('ContentSection', contentSectionSchema);

// Missing content
const missingContent = [
  // Investment Strategy Page
  { key: 'strategy-hero', page: 'investment-strategy', section: 'hero', title: 'Investment Strategy', subtitle: 'Building Wealth Through Disciplined, Asset-Backed Investments', isActive: true },
  { key: 'strategy-intro', page: 'investment-strategy', section: 'intro', title: 'A Disciplined, Asset-Backed Investment Model', subtitle: 'Our Approach', content: 'Cubez Capital deploys investor funds into carefully selected opportunities including property flips, development financing, secured private lending, and strategic equity investments.', isActive: true },
  { key: 'strategy-types', page: 'investment-strategy', section: 'strategies', content: JSON.stringify([{id:1,title:'Real Estate Flipping'},{id:2,title:'Private Lending'},{id:3,title:'Joint Venture Projects'},{id:4,title:'Strategic Equity Investments'}]), isActive: true },
  { key: 'strategy-returns', page: 'investment-strategy', section: 'returns', content: JSON.stringify([{number:'01',title:'Identify Opportunities'},{number:'02',title:'Evaluate & Select'},{number:'03',title:'Deploy Capital'},{number:'04',title:'Active Management'},{number:'05',title:'Generate Returns'},{number:'06',title:'Deliver to Investors'}]), isActive: true },
  { key: 'strategy-funds', page: 'investment-strategy', section: 'funds', content: JSON.stringify([{title:'Property Acquisition & Renovation',percentage:'40%'},{title:'Secured Private Lending',percentage:'30%'},{title:'Joint Venture Development',percentage:'15%'},{title:'Strategic Equity Positions',percentage:'10%'},{title:'Working Capital & Reserves',percentage:'5%'}]), isActive: true },
  { key: 'strategy-benefits', page: 'investment-strategy', section: 'benefits', content: JSON.stringify([{icon:'shield',title:'Real-Asset Backing'},{icon:'grid',title:'Diversified Allocation'},{icon:'chart',title:'Strong Return Potential'}]), isActive: true },
  { key: 'strategy-risk', page: 'investment-strategy', section: 'risk-approach', content: JSON.stringify([{title:'Third-Party Valuations'},{title:'Secured Lending'},{title:'Portfolio Diversification'},{title:'Budget Controls'},{title:'Transparent Reporting'},{title:'Regulatory Compliance'}]), isActive: true },
  { key: 'strategy-metrics', page: 'investment-strategy', section: 'metrics', content: JSON.stringify([{label:'Asset-Backed',value:'100',suffix:'%'},{label:'Investment Types',value:'4',suffix:''},{label:'Years Experience',value:'12',suffix:'+'},{label:'Principal Losses',value:'0',suffix:''}]), isActive: true },
  { key: 'strategy-cta', page: 'investment-strategy', section: 'cta', title: 'Ready to Invest with Confidence?', content: 'Schedule a confidential consultation with our team to explore investment opportunities.', ctaText: 'Start Your Investment Journey', ctaLink: '/contact', isActive: true },
  // Investor Offering Page
  { key: 'offering-hero', page: 'investor-offering', section: 'hero', title: 'Investor Offering', subtitle: 'Class B Preferred Shares', isActive: true },
  { key: 'offering-overview', page: 'investor-offering', section: 'overview', title: 'A Structured Path to Predictable Returns', subtitle: 'The Offering', content: "Cubez Capital's primary investment vehicle is Class B Preferred Shares, structured to give investors a predictable return while supporting long-term growth.", isActive: true },
  { key: 'offering-vehicle', page: 'investor-offering', section: 'vehicle', title: 'Class B Preferred Shares', subtitle: 'Investment Structure', description: 'A security type designed for investors seeking predictable returns with priority treatment and real-asset backing.', bulletPoints: JSON.stringify([{icon:'returns',title:'Fixed Annual Return',description:'Predictable percentage returns on your invested capital, paid annually.'},{icon:'shield',title:'Cumulative Dividends',description:'Unpaid dividends accumulate and must be paid before common shareholders receive anything.'},{icon:'lock',title:'Asset-Backed Security',description:'Investments backed by diversified real estate and private capital positions.'},{icon:'exit',title:'Clear Redemption Path',description:'Structured exit process with return of capital plus accrued dividends.'},{icon:'check',title:'No Voting Responsibilities',description:'Passive investment with no management or governance duties required.'}]), isActive: true },
  { key: 'offering-vehicle-features', page: 'investor-offering', section: 'vehicle-features', content: JSON.stringify([{icon:'returns',title:'Fixed Annual Return'},{icon:'shield',title:'Cumulative Dividends'},{icon:'lock',title:'Asset-Backed Security'},{icon:'exit',title:'Clear Redemption Path'},{icon:'check',title:'No Voting Responsibilities'}]), isActive: true },
  { key: 'offering-security-features', page: 'investor-offering', section: 'security-features', title: 'Priority & Security', subtitle: 'Investor Protection', content: 'Class B Preferred Shareholders receive priority treatment—dividends and liquidation proceeds are paid before common shareholders.', isActive: true },
  { key: 'offering-redemption', page: 'investor-offering', section: 'redemption', title: 'Redemption & Exit', subtitle: 'Exit Structure', content: 'Your investment includes a structured exit process through corporate redemption, providing clarity on when and how your capital is returned.', ctaText: 'Request Full Offering Documents', ctaLink: '/invest-with-confidence', isActive: true },
  { key: 'offering-final-cta', page: 'investor-offering', section: 'final-cta', title: 'Take the Next Step Toward Secure, Asset-Backed Investing', content: 'Request the Cubez Capital investor package to explore a structured offering designed for predictable returns, investor priority, and long-term confidence.', ctaText: 'Request Investor Package', ctaLink: '/invest-with-confidence', isActive: true },
  // Opportunities Page
  { key: 'opportunities-hero', page: 'current-opportunities', section: 'hero', title: 'Current Opportunities', subtitle: 'Explore our curated selection of investment opportunities', isActive: true },
  // Risk Management Page
  { key: 'risk-hero', page: 'risk-management', section: 'hero', title: 'A Disciplined Approach to Protecting Investor Capital', subtitle: 'Risk is managed through structured processes, asset-backed strategies, and careful project selection.', isActive: true },
  { key: 'risk-philosophy', page: 'risk-management', section: 'philosophy', title: 'Capital Protection Through Discipline', subtitle: 'Risk Philosophy', content: 'Cubez Capital follows a disciplined, conservative approach to managing risk, prioritizing capital protection alongside consistent return generation.', isActive: true },
  { key: 'risk-pillars', page: 'risk-management', section: 'pillars', content: JSON.stringify([{icon:'inspection',title:'Third-Party Inspections'},{icon:'real-estate',title:'Real Estate Collateral'},{icon:'diversified',title:'Diversified Allocation'},{icon:'budget',title:'Strict Budget Controls'},{icon:'compliance',title:'Regulatory Compliance'},{icon:'reporting',title:'Transparent Reporting'}]), isActive: true },
  { key: 'risk-safeguards', page: 'risk-management', section: 'safeguards', content: JSON.stringify([{icon:'shield',title:'Real-Asset Backing'},{icon:'lock',title:'Secured Positions'},{icon:'valuation',title:'Conservative Valuation'},{icon:'deployment',title:'Structured Deployment'}]), isActive: true },
  { key: 'risk-diligence', page: 'risk-management', section: 'diligence', content: JSON.stringify([{number:'01',title:'Opportunity Evaluation'},{number:'02',title:'Financial Analysis'},{number:'03',title:'Risk Assessment'},{number:'04',title:'Legal & Structural Review'},{number:'05',title:'Final Approval'}]), isActive: true },
  { key: 'risk-monitoring', page: 'risk-management', section: 'monitoring', content: JSON.stringify([{title:'Continuous Project Monitoring'},{title:'Performance Tracking'},{title:'Financial Oversight'},{title:'Disciplined Execution'}]), isActive: true },
  { key: 'risk-transparency', page: 'risk-management', section: 'transparency', content: JSON.stringify([{title:'Clear Investor Communication'},{title:'Regular Updates'},{title:'Transparent Reporting'}]), isActive: true },
  { key: 'risk-summary', page: 'risk-management', section: 'summary', content: JSON.stringify([{icon:'shield',title:'Capital Protection Focus'},{icon:'check',title:'Disciplined Selection'},{icon:'document',title:'Structured Processes'},{icon:'users',title:'Investor-First Approach'}]), isActive: true },
  { key: 'risk-cta', page: 'risk-management', section: 'cta', title: 'Invest with Confidence Through a Disciplined Risk Framework', content: 'Connect with Cubez Capital to explore secure, structured investment opportunities backed by careful risk management.', ctaText: 'Request Investor Package', ctaLink: '/investments', isActive: true },
  // Contact Page
  { key: 'contact-hero', page: 'contact', section: 'hero', title: "Let's Start a Conversation", subtitle: 'Contact Us', content: 'Ready to explore investment opportunities? Schedule a confidential consultation with our team.', isActive: true },
  // How It Works Page
  { key: 'howitworks-hero', page: 'how-it-works', section: 'hero', title: 'How It Works', subtitle: 'A streamlined process designed for clarity and your peace of mind.', isActive: true }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected');

    let added = 0, updated = 0;
    for (const item of missingContent) {
      const existing = await ContentSection.findOne({ key: item.key });
      if (existing) {
        await ContentSection.findByIdAndUpdate(existing._id, item);
        updated++;
      } else {
        await ContentSection.create(item);
        added++;
      }
      console.log(`${existing ? 'Updated' : 'Added'}: ${item.key}`);
    }

    const total = await ContentSection.countDocuments();
    console.log(`\nDone! Added: ${added}, Updated: ${updated}, Total: ${total}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seed();