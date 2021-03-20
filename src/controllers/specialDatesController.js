const SpecialDate = require('../models/SpecialDate');

exports.index = async (req, res) => {
  try {
    const specialDates = await SpecialDate.find({});

    if (!specialDates) {
      return res.status(400).json({
        success: false,
        message: 'Cannot found special dates',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      specialDates,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show special dates',
      status: 400,
    });
  }
};
