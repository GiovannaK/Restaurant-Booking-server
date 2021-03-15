const User = require('../models/User');

const checkIfIsPartner = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
        status: 400,
      });
    }

    if (!user.isPartner) {
      return res.status(401).json({
        success: false,
        message: 'Not Allowed',
        status: 401,
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      status: 500,
    });
  }
};

module.exports = checkIfIsPartner;
