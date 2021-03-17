const Restaurant = require('../models/Restaurant');

exports.store = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create({
      ...req.body,
      user: req.userId,
      openingHours: {
        monday: {
          startHours: req.body.monday.startHours,
          endHours: req.body.monday.endHours,
          startMinutes: req.body.monday.startMinutes,
          endMinutes: req.body.monday.endMinutes,
        },
        tuesday: {
          startHours: req.body.tuesday.startHours,
          endHours: req.body.tuesday.endHours,
          startMinutes: req.body.tuesday.startMinutes,
          endMinutes: req.body.tuesday.endMinutes,
        },
        wednesday: {
          startHours: req.body.wednesday.startHours,
          endHours: req.body.wednesday.endHours,
          startMinutes: req.body.wednesday.startMinutes,
          endMinutes: req.body.wednesday.endMinutes,
        },
        thursday: {
          startHours: req.body.thursday.startHours,
          endHours: req.body.thursday.endHours,
          startMinutes: req.body.thursday.startMinutes,
          endMinutes: req.body.thursday.endMinutes,
        },
        friday: {
          startHours: req.body.friday.startHours,
          endHours: req.body.friday.endHours,
          startMinutes: req.body.friday.startMinutes,
          endMinutes: req.body.friday.endMinutes,
        },
        saturday: {
          startHours: req.body.saturday.startHours,
          endHours: req.body.saturday.endHours,
          startMinutes: req.body.saturday.startMinutes,
          endMinutes: req.body.saturday.endMinutes,
        },
        sunday: {
          startHours: req.body.sunday.startHours,
          endHours: req.body.sunday.endHours,
          startMinutes: req.body.sunday.startMinutes,
          endMinutes: req.body.sunday.endMinutes,
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: 'Restaurant created successfully',
      status: 200,
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot create restaurant',
      status: 400,
    });
  }
};
