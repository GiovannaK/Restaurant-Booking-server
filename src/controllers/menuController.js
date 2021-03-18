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
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      status: 500,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const menu = await Menu.find({
      restaurant: req.params.restaurantId,
    });

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant has no menu',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      menu,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show menu foods',
      status: 400,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: 'Menu food does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      menu,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show this food menu',
      status: 400,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: 'Menu food does not exists',
        status: 400,
      });
    }

    const updatedMenu = await Menu.findOneAndUpdate({ _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      });

    return res.status(200).json({
      success: true,
      updatedMenu,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot update menu food',
      status: 400,
    });
  }
};

exports.menuDelete = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: 'Menu food does not exists',
        status: 400,
      });
    }

    await menu.remove();

    return res.status(200).json(null);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot update menu food',
      status: 400,
    });
  }
};
