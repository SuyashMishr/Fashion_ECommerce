const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }


const admin = new User({
  name: 'Super Admin',
  email: 'admin@example.com',
  password: 'Admin@123', // ✅ Let pre-save handle hashing
  role: 'admin',
  phone: '9999999999',
  isEmailVerified: true,
  isActive: true
});

    await admin.save();
    console.log('✅ Admin created successfully');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
};

module.exports = createAdmin;
