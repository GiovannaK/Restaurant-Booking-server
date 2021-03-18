const Menu = require('../models/Menu');

exports.store = async (req, res) => {
  try {
    const newMenu = await Menu.create({
      ...req.body,
      restaurant: req.params.restaurantId,
    });

    if (!newMenu) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create menu food',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      newMenu,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      status: 500,
    });
  }
};
