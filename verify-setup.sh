#!/bin/bash
# Quick Bites Project Verification Script
# This script helps verify that all components are properly set up

echo "🍽️  Quick Bites - Project Verification"
echo "======================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    node_version=$(node -v)
    echo "  ✅ Node.js $node_version found"
else
    echo "  ❌ Node.js not found. Please install Node.js v14+"
    exit 1
fi

# Check npm
echo ""
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    npm_version=$(npm -v)
    echo "  ✅ npm $npm_version found"
else
    echo "  ❌ npm not found"
    exit 1
fi

# Check MongoDB
echo ""
echo "✓ Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "  ✅ MongoDB found"
else
    echo "  ⚠️  MongoDB not found locally. You can use MongoDB Atlas instead."
fi

# Check backend directory
echo ""
echo "✓ Checking backend setup..."
if [ -d "backend" ]; then
    if [ -f "backend/package.json" ]; then
        echo "  ✅ Backend package.json found"
    else
        echo "  ❌ Backend package.json missing"
        exit 1
    fi
    
    if [ -f "backend/.env" ]; then
        echo "  ✅ Backend .env found"
    else
        echo "  ❌ Backend .env missing"
        exit 1
    fi
else
    echo "  ❌ Backend directory not found"
    exit 1
fi

# Check frontend directory
echo ""
echo "✓ Checking frontend setup..."
if [ -d "FOOD-DELIVERY-WEB" ]; then
    if [ -f "FOOD-DELIVERY-WEB/package.json" ]; then
        echo "  ✅ Frontend package.json found"
    else
        echo "  ❌ Frontend package.json missing"
        exit 1
    fi
    
    if [ -f "FOOD-DELIVERY-WEB/.env" ]; then
        echo "  ✅ Frontend .env found"
    else
        echo "  ❌ Frontend .env missing"
        exit 1
    fi
    
    if [ -f "FOOD-DELIVERY-WEB/src/App.jsx" ]; then
        echo "  ✅ Frontend App.jsx found"
    else
        echo "  ❌ Frontend App.jsx missing"
        exit 1
    fi
else
    echo "  ❌ Frontend directory not found"
    exit 1
fi

# Check documentation
echo ""
echo "✓ Checking documentation..."
if [ -f "SETUP_GUIDE.md" ]; then
    echo "  ✅ SETUP_GUIDE.md found"
else
    echo "  ⚠️  SETUP_GUIDE.md missing"
fi

if [ -f "QUICK_START.md" ]; then
    echo "  ✅ QUICK_START.md found"
else
    echo "  ⚠️  QUICK_START.md missing"
fi

if [ -f "PROJECT_SUMMARY.md" ]; then
    echo "  ✅ PROJECT_SUMMARY.md found"
else
    echo "  ⚠️  PROJECT_SUMMARY.md missing"
fi

echo ""
echo "======================================="
echo "✅ All systems ready!"
echo ""
echo "🚀 Next steps:"
echo "   1. Start MongoDB: mongod"
echo "   2. cd backend && npm run seed && npm run dev"
echo "   3. cd FOOD-DELIVERY-WEB && npm install && npm run dev"
echo "   4. Open http://localhost:5173"
echo ""
echo "📖 For detailed instructions, see QUICK_START.md"
echo ""
