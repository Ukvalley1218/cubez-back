import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SiteSettings from '../models/SiteSettings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const defaultSettings = [
  // Contact Information
  { key: 'contact.email', value: 'invest@cubezcapital.com', type: 'string', group: 'contact', label: 'Email Address' },
  { key: 'contact.phone', value: '+1 (416) 555-0123', type: 'string', group: 'contact', label: 'Phone Number' },
  { key: 'contact.address', value: '100 King Street West, Suite 5700, Toronto, ON M5X 1C9, Canada', type: 'string', group: 'contact', label: 'Office Address' },

  // Company Information
  { key: 'company.name', value: 'Cubez Capital Inc.', type: 'string', group: 'company', label: 'Company Name' },
  { key: 'company.tagline', value: 'Building Wealth Through Strategic, Asset-Backed Investments', type: 'string', group: 'company', label: 'Tagline' },
  { key: 'company.description', value: 'Cubez Capital Inc. is a Canadian private investment company focused on asset-backed investments, including real estate, private lending, and strategic equity projects.', type: 'string', group: 'company', label: 'Description' },
  { key: 'company.founded', value: '2012', type: 'string', group: 'company', label: 'Year Founded' },

  // Social Links
  { key: 'social.linkedin', value: 'https://linkedin.com/company/cubezcapital', type: 'string', group: 'social', label: 'LinkedIn URL' },
  { key: 'social.twitter', value: '', type: 'string', group: 'social', label: 'Twitter/X URL' },
  { key: 'social.facebook', value: '', type: 'string', group: 'social', label: 'Facebook URL' },

  // SEO Settings
  { key: 'seo.title', value: 'Cubez Capital Inc. - Asset-Backed Investments', type: 'string', group: 'seo', label: 'Site Title' },
  { key: 'seo.description', value: 'Cubez Capital Inc. is a Canadian private investment company specializing in secure, asset-backed investments with predictable returns.', type: 'string', group: 'seo', label: 'Meta Description' },
];

const seedSettings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let created = 0;
    let updated = 0;

    for (const setting of defaultSettings) {
      const existing = await SiteSettings.findOne({ key: setting.key });

      if (!existing) {
        await SiteSettings.create(setting);
        console.log(`✅ Created: ${setting.key}`);
        created++;
      } else {
        // Optionally update existing settings
        // await SiteSettings.updateOne({ key: setting.key }, setting);
        console.log(`⏭️ Already exists: ${setting.key}`);
      }
    }

    // Show all settings
    const allSettings = await SiteSettings.find({}).sort({ group: 1, key: 1 });
    console.log('\n📋 All settings in database:');
    allSettings.forEach(s => {
      console.log(`   [${s.group}] ${s.key}: ${s.value?.substring(0, 50)}${s.value?.length > 50 ? '...' : ''}`);
    });

    console.log(`\n✅ Created ${created} new settings`);
    console.log(`📊 Total settings: ${allSettings.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedSettings();