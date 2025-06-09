const User = require('../models/User');

/**
 * Creates a default admin user if it does not already exist.
 * This function checks for an existing admin by email and creates
 * a new admin user with predefined credentials if none is found.
 * Password hashing is handled by the User model's pre-save middleware.
 */
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create new admin user
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '9999999999',
      isEmailVerified: true,
      isActive: true
    });

    // Save admin user to database
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

module.exports = createAdmin;
