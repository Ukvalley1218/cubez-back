import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSection from '../models/ContentSection.js';

dotenv.config();

const updateAboutWhoFields = async () => {
  try {
    const mongoUri = 'mongodb+srv://shruti-cubez:cubez0303@cubez-front.ylq11wr.mongodb.net/?appName=cubez-front';
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Find the about-who content entry
    const aboutWho = await ContentSection.findOne({ key: 'about-who' });
    
    if (!aboutWho) {
      console.log('❌ about-who content not found. Creating it...');
      
      // Create the about-who entry with all fields
      const newAboutWho = new ContentSection({
        key: 'about-who',
        page: 'about',
        section: 'who',
        title: 'Building Long-Term Value',
        image: 'https://via.placeholder.com/600x400?text=Image+1',
        image2: 'https://via.placeholder.com/600x400?text=Image+2',
        content: 'Cubez Capital Inc. is a federally incorporated Canadian investment company focused on creating secure, high-yield opportunities for private investors. Since 2012, we have successfully deployed over $250 million in capital while maintaining zero principal losses—a testament to our disciplined, conservative approach.',
        value: '12+',
        label: 'Years',
        highlight: 'Regulated Financial Services Company',
        highlight2: 'Asset-Backed Investments',
        isActive: true,
      });
      
      await newAboutWho.save();
      console.log('✅ Created about-who with new fields');
    } else {
      console.log('📝 Found about-who, updating with new fields...');
      console.log('Current data:', {
        image: aboutWho.image ? '✓' : '✗',
        image2: aboutWho.image2 ? '✓' : '✗',
        title: aboutWho.title ? '✓' : '✗',
        content: aboutWho.content ? '✓' : '✗',
        value: aboutWho.value ? '✓' : '✗',
        label: aboutWho.label ? '✓' : '✗',
        highlight: aboutWho.highlight ? '✓' : '✗',
        highlight2: aboutWho.highlight2 ? '✓' : '✗',
      });

      // Update with new fields if missing
      if (!aboutWho.image2) aboutWho.image2 = 'https://via.placeholder.com/600x400?text=Image+2';
      if (!aboutWho.value) aboutWho.value = '12+';
      if (!aboutWho.label) aboutWho.label = 'Years';
      if (!aboutWho.highlight) aboutWho.highlight = 'Regulated Financial Services Company';
      if (!aboutWho.highlight2) aboutWho.highlight2 = 'Asset-Backed Investments';
      
      await aboutWho.save();
      console.log('✅ Updated about-who with new fields');
    }

    console.log('\n📊 Verification - Updated about-who content:');
    const updated = await ContentSection.findOne({ key: 'about-who' });
    console.log(JSON.stringify(updated, null, 2));

    await mongoose.connection.close();
    console.log('\n✅ Script completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateAboutWhoFields();
