import User from '../models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: 'admin@cubezcapital.com' });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists:');
      console.log('   Email:', existingAdmin.email);
      console.log('   Name:', existingAdmin.name);
      console.log('   Role:', existingAdmin.role);
      console.log('   Active:', existingAdmin.isActive);

      // Update role to admin if needed
      if (existingAdmin.role !== 'admin' && existingAdmin.role !== 'superadmin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Updated role to admin');
      }

      // Ensure user is active
      if (!existingAdmin.isActive) {
        existingAdmin.isActive = true;
        await existingAdmin.save();
        console.log('✅ Activated user account');
      }
    } else {
      // Create new admin user
      const adminUser = await User.create({
        email: 'admin@cubezcapital.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
        isActive: true
      });

      console.log('✅ Admin user created successfully:');
      console.log('   Email:', adminUser.email);
      console.log('   Password: admin123');
      console.log('   Role:', adminUser.role);
    }

    // List all users
    const allUsers = await User.find({}).select('email role isActive');
    console.log('\n📋 All users in database:');
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - Active: ${user.isActive}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();