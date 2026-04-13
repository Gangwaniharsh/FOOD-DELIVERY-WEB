require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});

  console.log('🗑️  Cleared existing data');

  // Create admin user
  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@quickbites.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543210',
    address: 'Quick Bites HQ, Bangalore',
  });

  // Create test user
  await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john1234',
    role: 'user',
    phone: '9123456789',
    address: '12 MG Road, Bangalore',
  });

  console.log('👤 Created users');

  // Create restaurants
  const restaurantsData = [
    {
      name: "Spice Symphony",
      description: "Authentic North Indian cuisine with rich curries and tandoor specialties.",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
      cuisine: ["North Indian", "Mughlai", "Tandoor"],
      location: { address: "45 MG Road", city: "Bangalore" },
      rating: 4.5, totalRatings: 1240, deliveryTime: 35, deliveryFee: 30,
      minOrder: 199, priceRange: "$$", isOpen: true, featured: true,
      tags: ["popular", "must-try", "biryani"],
    },
    {
      name: "Dragon Palace",
      description: "Classic Chinese and Pan-Asian dishes, from dim sum to noodles.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
      coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
      cuisine: ["Chinese", "Thai", "Pan-Asian"],
      location: { address: "78 Brigade Road", city: "Bangalore" },
      rating: 4.3, totalRatings: 856, deliveryTime: 30, deliveryFee: 25,
      minOrder: 149, priceRange: "$$", isOpen: true, featured: true,
      tags: ["chinese", "noodles", "dim-sum"],
    },
    {
      name: "Pizza Paradiso",
      description: "Wood-fired Italian pizzas with gourmet toppings and creamy pastas.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
      cuisine: ["Italian", "Pizza", "Pasta"],
      location: { address: "102 Indiranagar", city: "Bangalore" },
      rating: 4.6, totalRatings: 2103, deliveryTime: 25, deliveryFee: 0,
      minOrder: 299, priceRange: "$$$", isOpen: true, featured: true,
      tags: ["pizza", "italian", "pasta", "free-delivery"],
    },
    {
      name: "Burger Barn",
      description: "Juicy gourmet burgers, crispy wings, and loaded fries since 2018.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      cuisine: ["American", "Burgers", "Fast Food"],
      location: { address: "55 Koramangala", city: "Bangalore" },
      rating: 4.4, totalRatings: 1567, deliveryTime: 20, deliveryFee: 20,
      minOrder: 149, priceRange: "$$", isOpen: true, featured: true,
      tags: ["burgers", "fast-food", "quick-delivery"],
    },
    {
      name: "Sushi Sakura",
      description: "Premium Japanese sushi rolls, sashimi, and ramen bowls.",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
      coverImage: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
      cuisine: ["Japanese", "Sushi", "Asian"],
      location: { address: "23 UB City", city: "Bangalore" },
      rating: 4.7, totalRatings: 934, deliveryTime: 40, deliveryFee: 50,
      minOrder: 499, priceRange: "$$$$", isOpen: true, featured: true,
      tags: ["sushi", "premium", "japanese"],
    },
    {
      name: "Green Leaf",
      description: "Healthy vegan and vegetarian meals packed with nutrients and flavour.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      cuisine: ["Vegan", "Salads", "Healthy"],
      location: { address: "67 HSR Layout", city: "Bangalore" },
      rating: 4.2, totalRatings: 478, deliveryTime: 25, deliveryFee: 15,
      minOrder: 199, priceRange: "$$", isOpen: true, featured: false,
      tags: ["vegan", "healthy", "salads"],
    },
    {
      name: "The Kebab House",
      description: "Succulent kebabs, shawarma, and Middle Eastern mezze platters.",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
      coverImage: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
      cuisine: ["Middle Eastern", "Kebabs", "Shawarma"],
      location: { address: "34 Whitefield", city: "Bangalore" },
      rating: 4.3, totalRatings: 712, deliveryTime: 30, deliveryFee: 30,
      minOrder: 249, priceRange: "$$", isOpen: true, featured: false,
      tags: ["kebabs", "shawarma", "halal"],
    },
    {
      name: "South Spice",
      description: "Authentic South Indian dosas, idlis, sambar, and filter coffee.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
      coverImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      cuisine: ["South Indian", "Breakfast", "Vegetarian"],
      location: { address: "89 JP Nagar", city: "Bangalore" },
      rating: 4.4, totalRatings: 1890, deliveryTime: 20, deliveryFee: 10,
      minOrder: 99, priceRange: "$", isOpen: true, featured: false,
      tags: ["dosa", "south-indian", "breakfast"],
    },
  ];

  const restaurants = await Restaurant.insertMany(restaurantsData);
  console.log(`🏪 Created ${restaurants.length} restaurants`);

  // Create menu items
  const menuData = [
    // Spice Symphony
    { restaurant: restaurants[0]._id, name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken pieces", price: 320, category: "Main Course", isVeg: false, spiceLevel: "Medium", popular: true, rating: 4.6, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300" },
    { restaurant: restaurants[0]._id, name: "Dal Makhani", description: "Slow-cooked black lentils in a rich buttery sauce", price: 240, category: "Main Course", isVeg: true, spiceLevel: "Mild", popular: true, rating: 4.5, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300" },
    { restaurant: restaurants[0]._id, name: "Chicken Biryani", description: "Fragrant basmati rice cooked with spiced chicken", price: 350, category: "Rice & Biryani", isVeg: false, spiceLevel: "Hot", popular: true, rating: 4.7, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300" },
    { restaurant: restaurants[0]._id, name: "Garlic Naan", description: "Soft bread baked in tandoor with garlic & butter", price: 60, category: "Bread", isVeg: true, spiceLevel: "None", popular: false, rating: 4.3, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300" },
    { restaurant: restaurants[0]._id, name: "Paneer Tikka", description: "Marinated paneer cubes grilled in tandoor", price: 280, category: "Starters", isVeg: true, spiceLevel: "Medium", popular: true, rating: 4.4, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300" },
    { restaurant: restaurants[0]._id, name: "Mango Lassi", description: "Chilled sweet mango yogurt drink", price: 100, category: "Drinks", isVeg: true, spiceLevel: "None", popular: false, rating: 4.5, image: "https://images.unsplash.com/photo-1571006682285-4cf5754df84b?w=300" },

    // Dragon Palace
    { restaurant: restaurants[1]._id, name: "Kung Pao Chicken", description: "Spicy stir-fried chicken with peanuts and chili", price: 290, category: "Main Course", isVeg: false, spiceLevel: "Hot", popular: true, rating: 4.4, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300" },
    { restaurant: restaurants[1]._id, name: "Veg Dim Sum (8 pcs)", description: "Steamed dumplings stuffed with vegetables", price: 220, category: "Dim Sum", isVeg: true, spiceLevel: "None", popular: true, rating: 4.3, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300" },
    { restaurant: restaurants[1]._id, name: "Fried Rice", description: "Wok-tossed rice with vegetables and soy sauce", price: 180, category: "Rice", isVeg: true, spiceLevel: "Mild", popular: false, rating: 4.2, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300" },
    { restaurant: restaurants[1]._id, name: "Hakka Noodles", description: "Stir-fried noodles with veggies, Indo-Chinese style", price: 190, category: "Noodles", isVeg: true, spiceLevel: "Medium", popular: true, rating: 4.3, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300" },

    // Pizza Paradiso
    { restaurant: restaurants[2]._id, name: "Margherita Pizza", description: "Classic tomato base, fresh mozzarella and basil", price: 349, category: "Pizza", isVeg: true, spiceLevel: "None", popular: true, rating: 4.6, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300" },
    { restaurant: restaurants[2]._id, name: "BBQ Chicken Pizza", description: "Smoky BBQ sauce, grilled chicken, onions, peppers", price: 449, category: "Pizza", isVeg: false, spiceLevel: "Mild", popular: true, rating: 4.7, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300" },
    { restaurant: restaurants[2]._id, name: "Pasta Arrabiata", description: "Penne pasta in spicy tomato sauce with herbs", price: 279, category: "Pasta", isVeg: true, spiceLevel: "Hot", popular: false, rating: 4.4, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300" },
    { restaurant: restaurants[2]._id, name: "Garlic Bread", description: "Toasted ciabatta with garlic butter and herbs", price: 149, category: "Sides", isVeg: true, spiceLevel: "None", popular: false, rating: 4.3, image: "https://images.unsplash.com/photo-1619535860434-cf9b902a5d0b?w=300" },
    { restaurant: restaurants[2]._id, name: "Tiramisu", description: "Classic Italian mascarpone dessert with espresso", price: 199, category: "Desserts", isVeg: true, spiceLevel: "None", popular: true, rating: 4.8, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300" },

    // Burger Barn
    { restaurant: restaurants[3]._id, name: "Classic Smash Burger", description: "Double smashed patty, cheddar, pickles, onion", price: 249, category: "Burgers", isVeg: false, spiceLevel: "Mild", popular: true, rating: 4.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300" },
    { restaurant: restaurants[3]._id, name: "Crispy Chicken Burger", description: "Fried chicken fillet, coleslaw, spicy mayo", price: 229, category: "Burgers", isVeg: false, spiceLevel: "Medium", popular: true, rating: 4.4, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300" },
    { restaurant: restaurants[3]._id, name: "Loaded Fries", description: "Crispy fries topped with cheese sauce and jalapeños", price: 149, category: "Sides", isVeg: true, spiceLevel: "Hot", popular: false, rating: 4.3, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300" },
    { restaurant: restaurants[3]._id, name: "Veg Mushroom Burger", description: "Grilled portobello mushroom with avocado and greens", price: 199, category: "Burgers", isVeg: true, spiceLevel: "None", popular: false, rating: 4.2, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300" },
    { restaurant: restaurants[3]._id, name: "Buffalo Wings (8 pcs)", description: "Crispy chicken wings tossed in buffalo sauce", price: 299, category: "Starters", isVeg: false, spiceLevel: "Hot", popular: true, rating: 4.6, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300" },

    // Sushi Sakura
    { restaurant: restaurants[4]._id, name: "Dragon Roll (8 pcs)", description: "Shrimp tempura, avocado, cucumber, eel sauce", price: 580, category: "Rolls", isVeg: false, spiceLevel: "None", popular: true, rating: 4.8, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300" },
    { restaurant: restaurants[4]._id, name: "Salmon Sashimi (6 pcs)", description: "Fresh-cut premium salmon served with soy and wasabi", price: 620, category: "Sashimi", isVeg: false, spiceLevel: "None", popular: true, rating: 4.9, image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=300" },
    { restaurant: restaurants[4]._id, name: "Miso Ramen", description: "Rich miso broth with noodles, tofu, and soft egg", price: 450, category: "Ramen", isVeg: false, spiceLevel: "Mild", popular: false, rating: 4.6, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300" },
    { restaurant: restaurants[4]._id, name: "Edamame", description: "Steamed salted soybeans, a classic Japanese starter", price: 199, category: "Starters", isVeg: true, spiceLevel: "None", popular: false, rating: 4.4, image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300" },

    // Green Leaf
    { restaurant: restaurants[5]._id, name: "Quinoa Buddha Bowl", description: "Quinoa, roasted veggies, chickpeas, tahini dressing", price: 320, category: "Bowls", isVeg: true, spiceLevel: "None", popular: true, rating: 4.5, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300" },
    { restaurant: restaurants[5]._id, name: "Avocado Toast", description: "Sourdough toast with smashed avocado and seeds", price: 220, category: "Breakfast", isVeg: true, spiceLevel: "None", popular: false, rating: 4.3, image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300" },
    { restaurant: restaurants[5]._id, name: "Garden Caesar Salad", description: "Romaine, croutons, parmesan, Caesar dressing", price: 249, category: "Salads", isVeg: true, spiceLevel: "None", popular: false, rating: 4.2, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300" },

    // South Spice
    { restaurant: restaurants[7]._id, name: "Masala Dosa", description: "Crispy rice crepe stuffed with spiced potato filling", price: 120, category: "Breakfast", isVeg: true, spiceLevel: "Medium", popular: true, rating: 4.6, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" },
    { restaurant: restaurants[7]._id, name: "Idli Sambar (4 pcs)", description: "Steamed rice cakes served with sambar and chutney", price: 80, category: "Breakfast", isVeg: true, spiceLevel: "Mild", popular: true, rating: 4.5, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" },
    { restaurant: restaurants[7]._id, name: "Vada (2 pcs)", description: "Crispy fried lentil donuts with sambar", price: 70, category: "Breakfast", isVeg: true, spiceLevel: "None", popular: false, rating: 4.4, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" },
    { restaurant: restaurants[7]._id, name: "Filter Coffee", description: "Traditional South Indian decoction coffee with milk", price: 60, category: "Drinks", isVeg: true, spiceLevel: "None", popular: true, rating: 4.8, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300" },
  ];

  await MenuItem.insertMany(menuData);
  console.log(`🍔 Created ${menuData.length} menu items`);

  console.log('\n✅ Database seeded successfully!');
  console.log('👤 Admin: admin@quickbites.com / admin123');
  console.log('👤 User:  john@example.com / john1234');

  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
