const User = require('../models/User');

exports.show = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });

    return res.status(200).json({
      success: true,
      user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot found user information',
      status: 400,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
        status: 400,
      });
    }

    const newData = await User.findOneAndUpdate({ _id: req.userId }, req.body, {
      new: true,
      runValidators: true,
    });

    const {
      id, firstName, lastName, email, phone,
    } = newData;
    return res.status(200).json({
      id,
      firstName,
      lastName,
      email,
      phone,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot update user information',
      status: 400,
    });
  }
};
