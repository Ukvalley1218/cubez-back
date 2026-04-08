import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import all models
import Page from '../models/Page.js';
import Section from '../models/Section.js';
import Field from '../models/Field.js';
import Asset from '../models/Asset.js';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n=== Clearing Database ===\n');

    // Clear new models
    console.log('Clearing Pages...');
    const pagesResult = await Page.deleteMany({});
    console.log(`  Deleted ${pagesResult.deletedCount} pages`);

    console.log('Clearing Sections...');
    const sectionsResult = await Section.deleteMany({});
    console.log(`  Deleted ${sectionsResult.deletedCount} sections`);

    console.log('Clearing Fields...');
    const fieldsResult = await Field.deleteMany({});
    console.log(`  Deleted ${fieldsResult.deletedCount} fields`);

    console.log('Clearing Assets...');
    const assetsResult = await Asset.deleteMany({});
    console.log(`  Deleted ${assetsResult.deletedCount} assets`);

    // Clear old ContentSection model
    console.log('Clearing old ContentSections...');
    const contentResult = await ContentSection.deleteMany({});
    console.log(`  Deleted ${contentResult.deletedCount} content sections`);

    console.log('\n=== Database cleared successfully! ===\n');
    console.log('Run "npm run seed" to populate with initial data.');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

// Ask for confirmation
console.log('\n⚠️  WARNING: This will delete ALL content from the database!');
console.log('This includes: Pages, Sections, Fields, Assets, and old ContentSections.');
console.log('\nPress Ctrl+C to cancel, or wait 5 seconds to continue...\n');

setTimeout(() => {
  clearDatabase();
}, 5000);