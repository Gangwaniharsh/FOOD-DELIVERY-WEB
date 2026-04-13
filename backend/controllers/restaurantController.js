const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const { search, cuisine, rating, priceRange, sort, page = 1, limit = 12 } = req.query;

    let query = {};

    // Search by name, cuisine, city
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by cuisine
    if (cuisine && cuisine !== 'All') {
      query.cuisine = { $in: [new RegExp(cuisine, 'i')] };
    }

    // Filter by rating
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    // Filter by price range
    if (priceRange && priceRange !== 'All') {
      query.priceRange = priceRange;
    }

    // Sort options
    let sortOption = {};
    if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'deliveryTime') sortOption = { deliveryTime: 1 };
    else if (sort === 'deliveryFee') sortOption = { deliveryFee: 1 };
    else sortOption = { featured: -1, createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Restaurant.countDocuments(query);

    const restaurants = await Restaurant.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/restaurants/featured
// @access  Public
const getFeaturedRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ featured: true, isOpen: true }).limit(6);
    res.json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }
    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/restaurants
// @access  Admin
const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/restaurants/:id
// @access  Admin
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }
    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/restaurants/:id
// @access  Admin
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }
    // Delete all menu items for this restaurant
    await MenuItem.deleteMany({ restaurant: req.params.id });
    res.json({ success: true, message: 'Restaurant deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRestaurants,
  getFeaturedRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
