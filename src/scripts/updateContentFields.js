import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ContentSection from '../models/ContentSection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const updateContentFields = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all existing content
    const allContent = await ContentSection.find({});
    console.log(`📋 Found ${allContent.length} content items`);

    let updated = 0;

    for (const item of allContent) {
      let needsUpdate = false;
      const updates = {};

      // Ensure all new fields exist with default values
      if (item.description === undefined) {
        updates.description = '';
        needsUpdate = true;
      }
      if (item.number === undefined) {
        updates.number = '';
        needsUpdate = true;
      }
      if (item.highlight === undefined) {
        updates.highlight = '';
        needsUpdate = true;
      }
      if (item.percentage === undefined) {
        updates.percentage = '';
        needsUpdate = true;
      }
      if (item.icon === undefined) {
        updates.icon = '';
        needsUpdate = true;
      }
      if (item.label === undefined) {
        updates.label = '';
        needsUpdate = true;
      }
      if (item.value === undefined) {
        updates.value = '';
        needsUpdate = true;
      }
      if (item.isActive === undefined) {
        updates.isActive = true;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await ContentSection.updateOne({ _id: item._id }, { $set: updates });
        console.log(`✅ Updated: ${item.key}`);
        updated++;
      }
    }

    // Show all content with their fields
    console.log('\n📋 All content items:');
    const updatedContent = await ContentSection.find({}).sort({ page: 1, key: 1 });
    updatedContent.forEach(item => {
      console.log(`\n[${item.page}] ${item.key}:`);
      console.log(`  - title: "${item.title || ''}"`);
      console.log(`  - description: "${item.description || ''}"`);
      console.log(`  - isActive: ${item.isActive}`);
    });

    console.log(`\n✅ Updated ${updated} items`);
    console.log(`📊 Total items: ${allContent.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateContentFields();