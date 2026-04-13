const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// @route   POST /api/orders
// @access  Protected
const placeOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must have at least one item.' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    // Calculate prices
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = restaurant.deliveryFee || 0;
    const tax = parseFloat((subtotal * 0.05).toFixed(2)); // 5% GST
    const totalPrice = parseFloat((subtotal + deliveryFee + tax).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      deliveryAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      notes,
      subtotal,
      deliveryFee,
      tax,
      totalPrice,
      estimatedDeliveryTime: restaurant.deliveryTime || 30,
      statusHistory: [{ status: 'Placed', note: 'Order placed successfully' }],
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('restaurant', 'name image location')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/my-orders
// @access  Protected
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('restaurant', 'name image location')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/:id
// @access  Protected
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name image location deliveryTime')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Ensure user owns the order (or is admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { statusHistory: { status, note: note || '', timestamp: new Date() } },
        ...(status === 'Delivered' ? { paymentStatus: 'Paid' } : {}),
      },
      { new: true }
    ).populate('restaurant', 'name').populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders (admin - all orders)
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    let query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate('restaurant', 'name')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)), orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders };
