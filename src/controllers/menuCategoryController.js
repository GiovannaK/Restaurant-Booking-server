const MenuCategory = require('../models/MenuCategory');
const Menu = require('../models/Menu');

exports.index = async (req, res) => {
  try {
    const menuCategories = await MenuCategory.find({});

    if (!menuCategories) {
      return res.status(400).json({
        success: false,
        message: 'Menu categories does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      menuCategories,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show menu categories',
      status: 400,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const menuCategory = await Menu.find({
      menuCategory: req.params.id,
    }).populate('restaurant');

    if (!menuCategory) {
      return res.status(400).json({
        success: false,
        message: 'Menu category does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      menuCategory,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show this menu category',
      status: 400,
    });
  }
};
