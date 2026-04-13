const express = require('express');
const {
  getRestaurants,
  getFeaturedRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/featured', getFeaturedRestaurants);
router.get('/:id', getRestaurantById);

// Admin routes
router.post('/', protect, adminOnly, createRestaurant);
router.put('/:id', protect, adminOnly, updateRestaurant);
router.delete('/:id', protect, adminOnly, deleteRestaurant);

module.exports = router;
