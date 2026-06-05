const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dev_portfolio_jwt_secret_9988', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      res.status(400);
      throw new Error('Please provide username or email and password');
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { email: usernameOrEmail.toLowerCase() },
        { username: usernameOrEmail }
      ]
    }).select('+password');

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid username/email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getAdminProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
};
