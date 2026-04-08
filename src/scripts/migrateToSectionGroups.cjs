const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// SectionGroup schema
const sectionGroupSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  page: { type: String, required: true },
  section: { type: String, required: true },
  label: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  backgroundImage: { type: String, default: '' },
  backgroundOverlay: { type: Boolean, default: false },
  backgroundColor: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' },
  items: [{
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    number: { type: String, default: '' },
    highlight: { type: String, default: '' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],
  highlights: [{ text: { type: String, default: '' }, icon: { type: String, default: '' } }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const SectionGroup = mongoose.model('SectionGroup', sectionGroupSchema);

// Define section groups with their configurations
const sectionGroupsConfig = [
  // HOME PAGE
  {
    key: 'home-hero',
    page: 'home',
    section: 'hero',
    label: 'Hero Section',
    fields: ['title', 'subtitle', 'backgroundImage', 'ctaText', 'ctaLink']
  },
  {
    key: 'home-trustbar',
    page: 'home',
    section: 'trustbar',
    label: 'Trust Bar (Stats)',
    hasItems: true,
    itemFields: ['icon', 'value', 'label']
  },
  {
    key: 'home-whatwedo',
    page: 'home',
    section: 'whatwedo',
    label: 'What We Do (Services)',
    fields: ['title', 'subtitle'],
    hasItems: true,
    itemFields: ['title', 'description', 'image']
  },
  {
    key: 'home-whychooseus',
    page: 'home',
    section: 'whychooseus',
    label: 'Why Choose Us',
    fields: ['title', 'subtitle', 'backgroundImage'],
    hasItems: true,
    itemFields: ['number', 'title', 'description', 'highlight', 'icon']
  },
  {
    key: 'home-investor-benefits',
    page: 'home',
    section: 'investor-benefits',
    label: 'Investor Benefits',
    fields: ['title', 'subtitle'],
    hasItems: true,
    itemFields: ['icon', 'title', 'description', 'image']
  },
  {
    key: 'home-about-preview',
    page: 'home',
    section: 'about-preview',
    label: 'About Preview',
    fields: ['title', 'subtitle', 'content', 'backgroundImage', 'value', 'label', 'ctaText', 'ctaLink'],
    hasHighlights: true
  },
  {
    key: 'home-process',
    page: 'home',
    section: 'process',
    label: 'How It Works (Process)',
    fields: ['title', 'subtitle', 'backgroundImage'],
    hasItems: true,
    itemFields: ['number', 'title', 'description']
  },
  {
    key: 'home-offering',
    page: 'home',
    section: 'offering',
    label: 'Investor Offering',
    fields: ['title', 'subtitle', 'content', 'backgroundImage'],
    hasItems: true,
    itemFields: ['icon', 'title', 'label']
  },
  {
    key: 'home-risk',
    page: 'home',
    section: 'risk',
    label: 'Risk Management',
    fields: ['title', 'subtitle', 'backgroundImage'],
    hasItems: true,
    itemFields: ['icon', 'title', 'description']
  },
  {
    key: 'home-cta',
    page: 'home',
    section: 'cta',
    label: 'Call to Action',
    fields: ['title', 'content', 'backgroundImage', 'ctaText', 'ctaLink']
  },
  // ABOUT PAGE
  {
    key: 'about-hero',
    page: 'about',
    section: 'hero',
    label: 'Hero Section',
    fields: ['title', 'subtitle', 'backgroundImage']
  },
  {
    key: 'about-who',
    page: 'about',
    section: 'who',
    label: 'Who We Are',
    fields: ['title', 'subtitle', 'content', 'value', 'label', 'backgroundImage']
  },
  {
    key: 'about-values',
    page: 'about',
    section: 'values',
    label: 'Our Values',
    hasItems: true,
    itemFields: ['icon', 'title', 'description']
  },
  {
    key: 'about-vision',
    page: 'about',
    section: 'vision',
    label: 'Our Vision',
    fields: ['title', 'content'],
    hasHighlights: true
  },
  {
    key: 'about-mission',
    page: 'about',
    section: 'mission',
    label: 'Our Mission',
    fields: ['title', 'content'],
    hasHighlights: true
  },
  {
    key: 'about-trust',
    page: 'about',
    section: 'trust',
    label: 'Trust & Security',
    fields: ['title', 'backgroundImage'],
    hasItems: true,
    itemFields: ['icon', 'title', 'description']
  },
  {
    key: 'about-why',
    page: 'about',
    section: 'why',
    label: 'Why Choose Us',
    hasItems: true,
    itemFields: ['icon', 'title', 'description']
  },
  // INVESTMENT STRATEGY PAGE
  {
    key: 'strategy-hero',
    page: 'investment-strategy',
    section: 'hero',
    label: 'Hero Section',
    fields: ['title', 'subtitle', 'backgroundImage']
  },
  {
    key: 'strategy-intro',
    page: 'investment-strategy',
    section: 'intro',
    label: 'Introduction',
    fields: ['title', 'subtitle', 'content', 'backgroundImage'],
    hasHighlights: true
  },
  {
    key: 'strategy-types',
    page: 'investment-strategy',
    section: 'strategies',
    label: 'Investment Types',
    hasItems: true,
    itemFields: ['title', 'description', 'image']
  },
  {
    key: 'strategy-cta',
    page: 'investment-strategy',
    section: 'cta',
    label: 'Call to Action',
    fields: ['title', 'content', 'ctaText', 'ctaLink', 'backgroundImage']
  },
  // RISK MANAGEMENT PAGE
  {
    key: 'risk-hero',
    page: 'risk-management',
    section: 'hero',
    label: 'Hero Section',
    fields: ['title', 'subtitle', 'backgroundImage']
  },
  {
    key: 'risk-philosophy',
    page: 'risk-management',
    section: 'philosophy',
    label: 'Risk Philosophy',
    fields: ['title', 'subtitle', 'content', 'backgroundImage'],
    hasHighlights: true
  },
  {
    key: 'risk-pillars',
    page: 'risk-management',
    section: 'pillars',
    label: 'Risk Pillars',
    hasItems: true,
    itemFields: ['icon', 'title', 'description']
  },
  // CONTACT PAGE
  {
    key: 'contact-hero',
    page: 'contact',
    section: 'hero',
    label: 'Hero Section',
    fields: ['title', 'subtitle', 'content', 'backgroundImage']
  }
];

async function migrateContent() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const contentCollection = db.collection('contentsections');

    let created = 0;
    let updated = 0;

    for (const config of sectionGroupsConfig) {
      // Check if section group already exists
      let existing = await SectionGroup.findOne({ key: config.key });

      // Get related content items from contentsections
      const query = { page: config.page };
      if (config.section) {
        query.section = config.section;
      }

      const contentItems = await contentCollection.find(query).sort({ order: 1 }).toArray();

      // Build section group data
      const groupData = {
        key: config.key,
        page: config.page,
        section: config.section,
        label: config.label,
        order: 0,
        isActive: true
      };

      // Get title from first matching content
      const titleContent = contentItems.find(item => item.key === config.key || item.key.includes('-title'));
      if (titleContent) {
        groupData.title = titleContent.title || '';
        groupData.subtitle = titleContent.subtitle || '';
        groupData.description = titleContent.description || titleContent.content || '';
        groupData.backgroundImage = titleContent.image || '';
      }

      // Get items if this section has multiple items
      if (config.hasItems) {
        const itemKeys = contentItems
          .filter(item => item.key !== config.key && !item.key.includes('-title') && !item.key.includes('-items'))
          .map(item => ({
            title: item.title || '',
            subtitle: item.subtitle || '',
            description: item.description || item.content || '',
            content: item.content || '',
            icon: item.icon || '',
            image: item.image || '',
            number: item.number || '',
            highlight: item.highlight || '',
            value: item.value || '',
            label: item.label || '',
            order: item.order || 0
          }));

        if (itemKeys.length > 0) {
          groupData.items = itemKeys;
        }
      }

      // Get highlights
      if (config.hasHighlights) {
        const highlightContent = contentItems.find(item => item.key.includes('-highlight') || item.highlights);
        if (highlightContent) {
          let highlights = highlightContent.highlights || highlightContent.content;
          if (typeof highlights === 'string') {
            try {
              highlights = JSON.parse(highlights);
            } catch (e) {
              highlights = [];
            }
          }
          if (Array.isArray(highlights)) {
            groupData.highlights = highlights.map(h => ({
              text: typeof h === 'string' ? h : h.text || '',
              icon: typeof h === 'object' ? h.icon || '' : ''
            }));
          }
        }
      }

      if (existing) {
        await SectionGroup.findByIdAndUpdate(existing._id, groupData);
        updated++;
        console.log(`Updated: ${config.key}`);
      } else {
        await SectionGroup.create(groupData);
        created++;
        console.log(`Created: ${config.key}`);
      }
    }

    console.log('\n=== SUMMARY ===');
    console.log(`Created: ${created}`);
    console.log(`Updated: ${updated}`);
    console.log(`Total Section Groups: ${await SectionGroup.countDocuments()}`);

    await mongoose.disconnect();
    console.log('\n✅ Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

migrateContent();