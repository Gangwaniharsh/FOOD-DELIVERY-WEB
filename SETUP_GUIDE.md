# Quick Bites - Food Delivery Web Application

A complete full-stack MERN food delivery application with modern UI/UX and comprehensive features.

**Live Demo Features:**

- 🏪 Browse multiple restaurants with filtering and search
- 🛒 Add items to cart from multiple restaurants
- 👤 User authentication and profile management
- 📦 Place orders and track delivery status in real-time
- 💳 Multiple payment methods support
- 📱 Fully responsive mobile-first design
- 🎨 Modern dark theme with Tailwind CSS
- ⚡ Fast, optimized performance with Vite

---

## 🏗️ Project Structure

```
Food-web delivery/
├── backend/                          # Node.js + Express API server
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (login, signup, profile)
│   │   ├── restaurantController.js  # Restaurant CRUD & filtering
│   │   ├── menuController.js        # Menu items management
│   │   └── orderController.js       # Order creation & tracking
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication & authorization
│   ├── models/
│   │   ├── User.js                  # User schema with password hashing
│   │   ├── Restaurant.js            # Restaurant data with ratings
│   │   ├── MenuItem.js              # Menu items with categories
│   │   └── Order.js                 # Order details with status tracking
│   ├── routes/
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── restaurants.js           # Restaurant endpoints
│   │   ├── menu.js                  # Menu endpoints
│   │   └── orders.js                # Order endpoints
│   ├── seed/
│   │   └── seed.js                  # Database seeding with sample data
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── server.js                    # Express app setup
│
└── FOOD-DELIVERY-WEB/               # React + Vite frontend
    ├── src/
    │   ├── api/                     # API client calls
    │   │   ├── auth.js
    │   │   ├── restaurants.js
    │   │   ├── menu.js
    │   │   ├── orders.js
    │   │   └── axiosConfig.js       # Axios interceptors & setup
    │   ├── components/              # Reusable components
    │   │   ├── Navbar.jsx           # Top navigation
    │   │   ├── MenuItem.jsx
    │   │   ├── MenuItemCard.jsx
    │   │   ├── RestaurantCard.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── Footer.jsx
    │   ├── context/                 # Context API state
    │   │   ├── AuthContext.jsx      # User authentication state
    │   │   └── CartContext.jsx      # Shopping cart state
    │   ├── pages/                   # Page components
    │   │   ├── Home.jsx             # Landing page
    │   │   ├── Restaurants.jsx      # Restaurants listing with filters
    │   │   ├── RestaurantMenu.jsx   # Restaurant details & menu
    │   │   ├── RestaurantDetails.jsx # Restaurant info page
    │   │   ├── Cart.jsx             # Shopping cart with checkout
    │   │   ├── Checkout.jsx         # Order confirmation
    │   │   ├── Auth.jsx             # Login/Signup
    │   │   └── Orders.jsx           # User's order history
    │   ├── sections/                # Layout sections
    │   │   ├── Hero.jsx
    │   │   └── FeaturedRest.jsx
    │   ├── App.jsx                  # Main app with routing
    │   ├── main.jsx                 # Entry point
    │   └── index.css                # Global styles
    ├── .env                         # Frontend environment variables
    ├── vite.config.js              # Vite configuration
    ├── package.json
    └── index.html
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+) and npm
- **MongoDB** (local or Atlas)
- **Git**

### 1️⃣ Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# Edit backend/.env and update MONGO_URI if needed:
PORT=5000
MONGO_URI=mongodb://localhost:27017/quick-bites
JWT_SECRET=quickbites_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=development

# Start MongoDB (if using local)
mongod

# Seed the database with sample data
npm run seed

# Start development server
npm run dev

# Server runs on: http://localhost:5000
```

### 2️⃣ Setup Frontend

```bash
# In a new terminal, navigate to frontend
cd FOOD-DELIVERY-WEB

# Install dependencies
npm install

# Frontend .env is already set up:
# VITE_API_BASE_URL=http://localhost:5000/api
# VITE_APP_NAME=Quick Bites

# Start development server
npm run dev

# Frontend runs on: http://localhost:5173
```

### 3️⃣ Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 🔐 Demo Credentials

### Admin Account

- **Email:** admin@quickbites.com
- **Password:** admin123
- Features: Add/edit restaurants, manage menu items, view all orders

### Regular User Account

- **Email:** john@example.com
- **Password:** john1234
- Features: Browse restaurants, order food, track orders

---

## 📋 Features Implemented

### ✅ User Management

- [x] User registration with email validation
- [x] Secure login with JWT tokens
- [x] Password hashing with bcrypt
- [x] Profile management and address update
- [x] User session persistence

### ✅ Restaurant Management

- [x] Browse all restaurants with pagination
- [x] Filter by cuisine type
- [x] Sort by rating, delivery time, delivery fee
- [x] Search restaurants by name/location
- [x] View featured restaurants on home page
- [x] Restaurant detail pages with full info
- [x] Admin: Add/edit/delete restaurants

### ✅ Menu Management

- [x] View menu items by restaurant
- [x] Filter by category (appetizers, mains, desserts, etc.)
- [x] Filter vegetarian/non-vegetarian items
- [x] Item ratings and descriptions
- [x] Product images and pricing
- [x] Admin: Add/edit/delete menu items

### ✅ Shopping Cart

- [x] Add items to cart from different restaurants
- [x] Adjust item quantities
- [x] Remove items from cart
- [x] Single-restaurant cart enforcement
- [x] Real-time price calculations
- [x] Tax calculation (5%)
- [x] Delivery fee inclusion
- [x] Cart persistence (localStorage)

### ✅ Order Management

- [x] Place orders with delivery address
- [x] Multiple payment methods (Cash, Card, UPI, Wallet)
- [x] Order confirmation page
- [x] Real-time order status tracking
- [x] Order history view
- [x] Status update timeline (Placed → Delivered)
- [x] Admin: View all orders and update status

### ✅ UI/UX

- [x] Modern dark theme design
- [x] Fully responsive mobile/tablet/desktop
- [x] Loading spinners and skeleton screens
- [x] Error messages and validation
- [x] Smooth animations and transitions
- [x] Lucide React icons
- [x] Tailwind CSS styling

---

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18
- **Database:** MongoDB 5.0+ (Mongoose ODM)
- **Authentication:** JWT + bcryptjs
- **Validation:** express-validator
- **CORS:** Enabled for frontend access

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 4 + @tailwindcss/vite
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Icons:** Lucide React
- **State Management:** React Context API + Hooks

---

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/signup                # Register new user
POST   /api/auth/login                 # Login user
GET    /api/auth/me                    # Get current user (protected)
PUT    /api/auth/profile               # Update profile (protected)
```

### Restaurants

```
GET    /api/restaurants                # Get all restaurants (with filters)
GET    /api/restaurants/featured       # Get featured restaurants
GET    /api/restaurants/:id            # Get restaurant by ID
POST   /api/restaurants                # Create restaurant (admin)
PUT    /api/restaurants/:id            # Update restaurant (admin)
DELETE /api/restaurants/:id            # Delete restaurant (admin)
```

### Menu Items

```
GET    /api/menu/restaurant/:id        # Get menu by restaurant
GET    /api/menu/item/:id              # Get single menu item
POST   /api/menu                       # Create menu item (admin)
PUT    /api/menu/:id                   # Update menu item (admin)
DELETE /api/menu/:id                   # Delete menu item (admin)
```

### Orders

```
POST   /api/orders                     # Place order (protected)
GET    /api/orders/my-orders           # Get user's orders (protected)
GET    /api/orders/:id                 # Get order details (protected)
PUT    /api/orders/:id/status          # Update order status (admin)
GET    /api/orders/all                 # Get all orders (admin)
```

---

## 🔄 State Management

### AuthContext

Manages user authentication state:

- `user` - Current logged-in user
- `token` - JWT token
- `loading` - Auth initialization status
- `login(userData, token)` - Login user
- `logout()` - Logout user

### CartContext

Manages shopping cart state:

- `cartItems` - Array of cart items
- `cartRestaurant` - Current restaurant
- `addToCart(item, restaurant)` - Add item
- `removeFromCart(itemId)` - Remove item
- `updateQuantity(itemId, quantity)` - Update quantity
- `clearCart()` - Empty cart
- `total`, `subtotal`, `tax`, `deliveryFee` - Price calculations

---

## 🚢 Deployment

### Deploy Backend (Heroku/Render)

1. Push to GitHub
2. Connect repository to Heroku/Render
3. Add environment variables:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<strong-secret-key>
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```
4. Deploy main branch

### Deploy Frontend (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   ```
   VITE_API_BASE_URL=<backend-url>
   ```
4. Deploy

---

## 📦 Installation & Dependencies

### Backend Dependencies

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "jsonwebtoken": "JWT authentication",
  "bcryptjs": "Password hashing",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables",
  "express-validator": "Input validation"
}
```

### Frontend Dependencies

```json
{
  "react": "UI framework",
  "react-router-dom": "Client routing",
  "axios": "HTTP client",
  "lucide-react": "Icons",
  "tailwindcss": "Styling"
}
```

---

## 🧪 Testing

### Test User Scenarios

1. **Browse restaurants:**
   - Visit home page
   - Use filters and search
   - Click on restaurant to view menu

2. **Make an order:**
   - Sign up/login
   - Select restaurant and items
   - Go to cart
   - Enter delivery address
   - Confirm payment method
   - Place order

3. **Track order:**
   - View order in "My Orders"
   - Check real-time status updates
   - See delivery timeline

4. **Admin functions:**
   - Login with admin account
   - Add new restaurant
   - Add menu items
   - View and update order status

---

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**

```bash
# Kill process on port 5000
npx kill-port 5000
# Or change PORT in .env
```

**MongoDB connection failed:**

- Check MongoDB is running: `mongod`
- Verify MONGO_URI in .env
- For Atlas: Add IP to whitelist

**Seed script fails:**

```bash
# Clear existing data and reseed
npm run seed
```

### Frontend Issues

**API calls failing:**

- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Inspect browser console for errors

**Build errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📝 Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/quick-bites
JWT_SECRET=quickbites_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Quick Bites
```

---

## 🎨 Design System

### Colors

- **Primary:** Emerald (#10b981)
- **Dark:** Slate (#0f172a)
- **Text:** White (#ffffff)
- **Muted:** Slate-400 (#94a3b8)

### Typography

- **Font Family:** Outfit (headers), System stack (body)
- **Heading:** Bold black, Outfit
- **Body:** Regular, 14-16px

### Components

- **Buttons:** Gradient emerald, rounded-xl
- **Cards:** Dark slate background, border-slate-800
- **Inputs:** Dark background, green focus state
- **Icons:** Lucide React, 18-24px

---

## 📞 Contact & Support

For issues or questions:

- Check GitHub issues
- Review API documentation
- Test with provided demo credentials

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Thank You

Thank you for using Quick Bites! Enjoy your meal delivery experience.

**Happy Coding! 🚀**
