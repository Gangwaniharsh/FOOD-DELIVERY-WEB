const MenuItem = require('../models/MenuItem');

// @route   GET /api/menu/:restaurantId
// @access  Public
const getMenuByRestaurant = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { restaurant: req.params.restaurantId, isAvailable: true };

    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }

    const items = await MenuItem.find(query).sort({ popular: -1, category: 1, name: 1 });

    // Group by category
    const grouped = items.reduce((acc, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

    res.json({ success: true, items, grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/menu/item/:id
// @access  Public
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate('restaurant', 'name image');
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/menu
// @access  Admin
const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/menu/:id
// @access  Admin
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/menu/:id
// @access  Admin
const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.json({ success: true, message: 'Menu item deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMenuByRestaurant, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };
