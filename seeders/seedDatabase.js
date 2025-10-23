const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');

// Seeder function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    console.log('🧹 Clearing existing users...');
    await User.deleteMany({});
    console.log('✅ Existing users cleared');

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@luxestay.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff'
    });

    await adminUser.save();
    console.log('✅ Admin user created: admin@luxestay.com / admin123');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@luxestay.com / admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
