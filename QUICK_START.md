# ⚡ Quick Bites - Quick Start Checklist

## ✅ Pre-Launch Checklist

### System Requirements

- [ ] Node.js v14+ installed
- [ ] npm installed
- [ ] MongoDB installed OR MongoDB Atlas account
- [ ] Git installed
- [ ] A code editor (VS Code recommended)

### Backend Setup

- [ ] Navigate to `/backend` folder
- [ ] Run `npm install`
- [ ] Verify `.env` file exists with correct MongoDB URI
- [ ] Start MongoDB: `mongod` (if using local)
- [ ] Run `npm run seed` to populate database
- [ ] Start backend: `npm run dev`
- [ ] Verify: http://localhost:5000/api/health returns ✓
- [ ] Check console logs for "Quick Bites API is running!"

### Frontend Setup

- [ ] Navigate to `/FOOD-DELIVERY-WEB` folder
- [ ] Run `npm install`
- [ ] Verify `.env` file exists
- [ ] Start frontend: `npm run dev`
- [ ] App opens at http://localhost:5173

---

## 🚀 First Run Instructions

### Step 1: Backend Initialization

```bash
cd backend
npm install
npm run seed
npm run dev
```

✅ Backend ready on port 5000

### Step 2: Frontend Start

```bash
# In new terminal
cd FOOD-DELIVERY-WEB
npm install
npm run dev
```

✅ Frontend ready on port 5173

### Step 3: Access Application

- Open: http://localhost:5173
- You should see the Quick Bites home page

---

## 🔑 Demo Accounts

### Option 1: Create Your Own Account

1. Click "Sign Up" on login page
2. Enter your details
3. Click "Create Account"
4. Redirect to restaurants page

### Option 2: Use Demo Accounts

- **Admin User**
  - Email: `admin@quickbites.com`
  - Password: `admin123`

- **Regular User**
  - Email: `john@example.com`
  - Password: `john1234`

---

## 📱 Features to Test

### 👤 Authentication

- [ ] Login with demo account
- [ ] See user name in navbar
- [ ] Logout and verify
- [ ] Create new account

### 🏪 Restaurants

- [ ] Browse all restaurants on home page
- [ ] Use search to find restaurant
- [ ] Filter by cuisine
- [ ] Sort by rating/delivery time
- [ ] Click restaurant to see menu

### 🛒 Shopping

- [ ] Add items to cart
- [ ] See cart count in navbar
- [ ] Open cart page
- [ ] Update item quantities
- [ ] Remove items
- [ ] See total price calculation

### 📦 Checkout

- [ ] Click checkout
- [ ] Enter delivery address
- [ ] Select payment method
- [ ] Place order
- [ ] See order confirmation
- [ ] View order status

### 📋 Orders

- [ ] Navigate to "My Orders"
- [ ] See order history
- [ ] Click order to see details
- [ ] See real-time status

---

## 🐛 Common Issues & Solutions

### "Cannot GET /api/health"

**Problem:** Backend not running
**Solution:**

```bash
cd backend
npm run dev
```

### "API request failed" or "Cannot reach server"

**Problem:** Frontend can't connect to backend
**Solution:**

1. Check backend is running on port 5000
2. Verify VITE_API_BASE_URL in frontend/.env
3. Check CORS in backend server.js

### "Database connection failed"

**Problem:** MongoDB not running or URI wrong
**Solution:**

1. Start MongoDB: `mongod`
2. Check MONGO_URI in backend/.env
3. For Atlas: Verify IP is whitelisted

### Port 5000/5173 already in use

**Solution:**

```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### Seed script not working

**Solution:**

```bash
cd backend
npm run seed
```

### Changes not reflecting

**Solution:**

1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear localStorage: DevTools → Application → Storage
3. Restart development servers

---

## 📊 Project Status

### Completed ✅

- [x] Backend API with all endpoints
- [x] Frontend pages and routing
- [x] Authentication system
- [x] Shopping cart functionality
- [x] Order management
- [x] Database models and relationships
- [x] API interceptors and error handling
- [x] Responsive UI design
- [x] Sample data seeding

### Features Ready

- [x] User registration & login
- [x] Restaurant browsing with filters
- [x] Menu viewing and item selection
- [x] Shopping cart management
- [x] Order placement
- [x] Order tracking
- [x] Admin functions (partial)

---

## 🔧 Development Commands

### Backend

```bash
cd backend
npm install        # Install dependencies
npm run dev        # Start with nodemon
npm start          # Start production
npm run seed       # Seed database
```

### Frontend

```bash
cd FOOD-DELIVERY-WEB
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

---

## 📚 File Locations

### Important Files

- Backend config: `backend/.env`
- Frontend config: `FOOD-DELIVERY-WEB/.env`
- Database seed: `backend/seed/seed.js`
- Main API: `backend/server.js`
- Main App: `FOOD-DELIVERY-WEB/src/App.jsx`
- Routes: `FOOD-DELIVERY-WEB/src/App.jsx`

---

## 💾 Database Management

### Backup data

```bash
# MongoDB local
mongodump --db quick-bites --out ./backup

# MongoDB Atlas
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/quick-bites" --out ./backup
```

### Restore data

```bash
mongorestore ./backup
```

### Clear database

```bash
# Delete in mongo shell
use quick-bites
db.dropDatabase()
```

---

## 🚢 Ready for Production?

### Backend Deployment Checklist

- [ ] Set `NODE_ENV=production` in .env
- [ ] Use strong `JWT_SECRET`
- [ ] Set `MONGO_URI` to production database
- [ ] Add error logging (Sentry, LogRocket, etc.)
- [ ] Set up monitoring
- [ ] Enable rate limiting
- [ ] Add payment gateway integration
- [ ] Deploy to Heroku/Render/DigitalOcean

### Frontend Deployment Checklist

- [ ] Update `VITE_API_BASE_URL` to production backend
- [ ] Run `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Deploy to Vercel/Netlify/AWS
- [ ] Set up CDN for images
- [ ] Enable compression
- [ ] Monitor performance

---

## 📞 Need Help?

1. Check console for error messages
2. Look at network tab for API errors
3. Verify .env files are correct
4. Make sure ports aren't in use
5. Restart development servers
6. Clear browser cache and localStorage

---

## 🎉 Next Steps

After successful launch:

1. Customize branding (colors, logo, name)
2. Add more restaurants and menu items
3. Implement payment gateway
4. Add admin dashboard
5. Deploy to production
6. Set up analytics
7. Add user reviews and ratings
8. Implement real-time notifications

---

**Enjoy building Quick Bites! 🚀**
