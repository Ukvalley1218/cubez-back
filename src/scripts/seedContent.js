import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../models/Page.js';
import Section from '../models/Section.js';
import Field from '../models/Field.js';

dotenv.config();

// Define pages
const pages = [
  { name: 'Home', slug: 'home', title: 'Home Page', order: 1 },
  { name: 'About', slug: 'about', title: 'About Us', order: 2 },
  { name: 'Investments', slug: 'investments', title: 'Investments', order: 3 },
  { name: 'Investment Strategy', slug: 'investment-strategy', title: 'Investment Strategy', order: 4 },
  { name: 'Investor Offering', slug: 'investor-offering', title: 'Investor Offering', order: 5 },
  { name: 'Current Opportunities', slug: 'current-opportunities', title: 'Current Opportunities', order: 6 },
  { name: 'How It Works', slug: 'how-it-works', title: 'How It Works', order: 7 },
  { name: 'Risk Management', slug: 'risk-management', title: 'Risk Management', order: 8 },
  { name: 'Contact', slug: 'contact', title: 'Contact Us', order: 9 }
];

// Define sections with their field schemas
const sectionsSchema = {
  home: [
    {
      name: 'Hero',
      slug: 'hero',
      order: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'backgroundImage', type: 'image', label: 'Background Image' },
        { name: 'ctaText', type: 'text', label: 'CTA Button Text' },
        { name: 'ctaLink', type: 'text', label: 'CTA Button Link' }
      ]
    },
    {
      name: 'Trust Bar',
      slug: 'trustbar',
      order: 2,
      fields: [
        { name: 'items', type: 'repeater', label: 'Trust Items', subfields: [
          { name: 'value', type: 'text', label: 'Value', required: true },
          { name: 'label', type: 'text', label: 'Label', required: true }
        ]}
      ]
    },
    {
      name: 'What We Do',
      slug: 'whatwedo',
      order: 3,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'items', type: 'repeater', label: 'Services', subfields: [
          { name: 'title', type: 'text', label: 'Title', required: true },
          { name: 'description', type: 'textarea', label: 'Description' },
          { name: 'image', type: 'image', label: 'Image' }
        ]}
      ]
    },
    {
      name: 'Why Choose Us',
      slug: 'whychooseus',
      order: 4,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'items', type: 'repeater', label: 'Benefits', subfields: [
          { name: 'title', type: 'text', label: 'Title', required: true },
          { name: 'description', type: 'textarea', label: 'Description' }
        ]}
      ]
    },
    {
      name: 'Investment Strategy',
      slug: 'investmentstrategy',
      order: 5,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'image', type: 'image', label: 'Section Image' },
        { name: 'items', type: 'repeater', label: 'Strategy Points', subfields: [
          { name: 'title', type: 'text', label: 'Title' },
          { name: 'description', type: 'textarea', label: 'Description' }
        ]}
      ]
    },
    {
      name: 'Process Steps',
      slug: 'process',
      order: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'steps', type: 'repeater', label: 'Steps', subfields: [
          { name: 'number', type: 'text', label: 'Step Number' },
          { name: 'title', type: 'text', label: 'Step Title' },
          { name: 'description', type: 'textarea', label: 'Step Description' }
        ]}
      ]
    },
    {
      name: 'Call to Action',
      slug: 'cta',
      order: 7,
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'backgroundImage', type: 'image', label: 'Background Image' },
        { name: 'ctaText', type: 'text', label: 'CTA Button Text' },
        { name: 'ctaLink', type: 'text', label: 'CTA Button Link' }
      ]
    }
  ],
  about: [
    {
      name: 'Hero',
      slug: 'hero',
      order: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'backgroundImage', type: 'image', label: 'Background Image' }
      ]
    },
    {
      name: 'Our Story',
      slug: 'story',
      order: 2,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'content', type: 'richtext', label: 'Story Content' },
        { name: 'image', type: 'image', label: 'Section Image' }
      ]
    },
    {
      name: 'Values',
      slug: 'values',
      order: 3,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'items', type: 'repeater', label: 'Values', subfields: [
          { name: 'title', type: 'text', label: 'Title' },
          { name: 'description', type: 'textarea', label: 'Description' }
        ]}
      ]
    },
    {
      name: 'Team',
      slug: 'team',
      order: 4,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'members', type: 'repeater', label: 'Team Members', subfields: [
          { name: 'name', type: 'text', label: 'Name' },
          { name: 'role', type: 'text', label: 'Role' },
          { name: 'image', type: 'image', label: 'Photo' },
          { name: 'bio', type: 'textarea', label: 'Bio' }
        ]}
      ]
    }
  ],
  investments: [
    {
      name: 'Hero',
      slug: 'hero',
      order: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'backgroundImage', type: 'image', label: 'Background Image' }
      ]
    },
    {
      name: 'Overview',
      slug: 'overview',
      order: 2,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'content', type: 'richtext', label: 'Overview Content' }
      ]
    },
    {
      name: 'Investment Types',
      slug: 'types',
      order: 3,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'items', type: 'repeater', label: 'Investment Types', subfields: [
          { name: 'title', type: 'text', label: 'Title' },
          { name: 'description', type: 'textarea', label: 'Description' },
          { name: 'image', type: 'image', label: 'Image' }
        ]}
      ]
    }
  ],
  'how-it-works': [
    {
      name: 'Hero',
      slug: 'hero',
      order: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Hero Title', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Hero Subtitle' },
        { name: 'content', type: 'textarea', label: 'Hero Description' },
        { name: 'backgroundImage', type: 'image', label: 'Hero Background Image' }
      ]
    },
    {
      name: 'Process Overview',
      slug: 'process-overview',
      order: 2,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' }
      ]
    },
    {
      name: 'Journey Steps',
      slug: 'journey-steps',
      order: 3,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'steps', type: 'repeater', label: 'Journey Steps', subfields: [
          { name: 'number', type: 'text', label: 'Step Number' },
          { name: 'title', type: 'text', label: 'Step Title', required: true },
          { name: 'description', type: 'textarea', label: 'Step Description', required: true },
          { name: 'highlights', type: 'textarea', label: 'Highlights (one per line)' },
          { name: 'image', type: 'image', label: 'Step Image' },
          { name: 'layout', type: 'select', label: 'Layout', options: ['left', 'right'] }
        ]}
      ]
    },
    {
      name: 'Journey Introduction',
      slug: 'journey-intro',
      order: 4,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'content', type: 'textarea', label: 'Introduction Text' }
      ]
    },
    {
      name: 'After Investment',
      slug: 'after-invest',
      order: 5,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'steps', type: 'repeater', label: 'After Invest Steps', subfields: [
          { name: 'title', type: 'text', label: 'Step Title', required: true },
          { name: 'description', type: 'textarea', label: 'Step Description', required: true }
        ]}
      ]
    },
    {
      name: 'Communication',
      slug: 'communication',
      order: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'content', type: 'textarea', label: 'Section Description' },
        { name: 'points', type: 'repeater', label: 'Communication Points', subfields: [
          { name: 'title', type: 'text', label: 'Point Title', required: true },
          { name: 'description', type: 'textarea', label: 'Point Description', required: true }
        ]},
        { name: 'image', type: 'image', label: 'Section Image' }
      ]
    },
    {
      name: 'Timeline',
      slug: 'timeline',
      order: 7,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'items', type: 'repeater', label: 'Timeline Items', subfields: [
          { name: 'phase', type: 'text', label: 'Phase Name', required: true },
          { name: 'description', type: 'textarea', label: 'Phase Description', required: true }
        ]}
      ]
    },
    {
      name: 'Trust Points',
      slug: 'trust-points',
      order: 8,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'subtitle', type: 'textarea', label: 'Section Subtitle' },
        { name: 'points', type: 'repeater', label: 'Trust Points', subfields: [
          { name: 'title', type: 'text', label: 'Point Title', required: true },
          { name: 'description', type: 'textarea', label: 'Point Description', required: true }
        ]}
      ]
    }
  ],
  contact: [
    {
      name: 'Hero',
      slug: 'hero',
      order: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'backgroundImage', type: 'image', label: 'Background Image' }
      ]
    },
    {
      name: 'Contact Info',
      slug: 'contactinfo',
      order: 2,
      fields: [
        { name: 'title', type: 'text', label: 'Section Title' },
        { name: 'email', type: 'text', label: 'Email Address' },
        { name: 'phone', type: 'text', label: 'Phone Number' },
        { name: 'address', type: 'textarea', label: 'Address' }
      ]
    }
  ]
};

// Default section schemas for other pages
const defaultSections = [
  {
    name: 'Hero',
    slug: 'hero',
    order: 1,
    fields: [
      { name: 'title', type: 'text', label: 'Title', required: true },
      { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
      { name: 'backgroundImage', type: 'image', label: 'Background Image' }
    ]
  },
  {
    name: 'Content',
    slug: 'content',
    order: 2,
    fields: [
      { name: 'title', type: 'text', label: 'Section Title' },
      { name: 'content', type: 'richtext', label: 'Content' },
      { name: 'image', type: 'image', label: 'Section Image' }
    ]
  },
  {
    name: 'Call to Action',
    slug: 'cta',
    order: 3,
    fields: [
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'description', type: 'textarea', label: 'Description' },
      { name: 'ctaText', type: 'text', label: 'Button Text' },
      { name: 'ctaLink', type: 'text', label: 'Button Link' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Field.deleteMany({});
    await Section.deleteMany({});
    await Page.deleteMany({});
    console.log('Existing data cleared');

    // Create pages
    console.log('Creating pages...');
    const createdPages = [];
    for (const pageData of pages) {
      const page = await Page.create(pageData);
      createdPages.push(page);
      console.log(`Created page: ${page.name}`);
    }

    // Create sections for each page
    console.log('Creating sections...');
    for (const page of createdPages) {
      const pageSections = sectionsSchema[page.slug] || defaultSections;

      for (const sectionData of pageSections) {
        const section = await Section.create({
          page: page._id,
          name: sectionData.name,
          slug: sectionData.slug,
          order: sectionData.order || 0,
          fields: sectionData.fields || []
        });
        console.log(`Created section: ${page.name} - ${section.name}`);
      }
    }

    console.log('\n=== Database seeded successfully! ===');
    console.log(`Created ${createdPages.length} pages`);
    console.log('You can now use the admin panel to edit content.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();