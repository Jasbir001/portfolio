const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db');
    console.log('Connected to DB for seeding...');

    // Check if admin already exists and delete to overwrite/reset password
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists. Resetting password...');
      await Admin.deleteOne({ username: 'admin' });
    }

    // Create default admin
    const defaultAdmin = new Admin({
      username: 'admin',
      email: 'jasbirverma441441@gmail.com',
      password: 'Nexbyte1P1' // This will be hashed by AdminSchema pre-save hook
    });

    await defaultAdmin.save();
    console.log('\n==================================================');
    console.log('Admin User Seeded Successfully!');
    console.log('Username: admin');
    console.log('Email: jasbirverma441441@gmail.com');
    console.log('Password: Nexbyte1P1');
    console.log('==================================================\n');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
