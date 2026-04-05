# PHASE 1 - Quick Start Guide

## Prerequisites

- Node.js installed
- MongoDB account (local or MongoDB Atlas)
- Terminal/Command Prompt

## 1️⃣ Backend Setup (5 minutes)

### Clone/Navigate to Backend

```bash
cd backend
npm install
```

### Set Up Environment

```bash
cp .env.example .env
```

### Edit `.env` file

```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/dream-way
JWT_SECRET=your_super_secret_key_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

**Getting MongoDB URI:**

- Free option: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster → Get connection string
- Replace username, password, and cluster name

### Start Backend

```bash
npm run dev
```

✅ Backend runs on `http://localhost:5000`

Test it:

```bash
curl http://localhost:5000/api/health
# Response: {"message":"Dream Way Backend is running!"}
```

---

## 2️⃣ Frontend Setup (3 minutes)

### Navigate to Frontend

```bash
cd frontend
npm install
```

### Start Frontend

```bash
npm run dev
```

✅ Frontend runs on `http://localhost:3000`

---

## 3️⃣ Test Authentication Flow

### A. Sign Up

1. Go to `http://localhost:3000/signup`
2. Fill in:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Sign Up"
4. ✅ Should redirect to dashboard

### B. View Dashboard

1. See personalized welcome message
2. View your email and member since date
3. Click "Logout"

### C. Login

1. Go to `http://localhost:3000/login`
2. **Email**: john@example.com
3. **Password**: password123
4. Click "Login"
5. ✅ Redirected to dashboard

### D. Test Protected Routes

1. Open DevTools → Application → Cookies/Storage
2. Find token in localStorage (key: `token`)
3. Try accessing `http://localhost:3000/dashboard` - works ✅
4. Delete token from localStorage manually
5. Try accessing dashboard again - redirects to login ✅

---

## 4️⃣ Test API Endpoints (Using Postman/cURL)

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password456"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password456"
  }'
```

Copy the token from response.

### Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5️⃣ Common Issues & Fixes

### "Cannot connect to MongoDB"

- Check MongoDB URI is correct
- Make sure cluster IP whitelist includes your IP or 0.0.0.0/0
- Verify username/password in connection string

### "Token errors on frontend"

- Clear localStorage: DevTools → Application → Clear All
- Restart frontend: `npm run dev`

### "Port 5000 already in use"

- Find process: `lsof -i :5000` (Mac/Linux)
- Or change PORT in `.env` to something like 5001

### "CORS errors"

- Backend has CORS enabled by default
- Check that frontend proxy is correct in vite.config.js

---

## 6️⃣ File Structure Reference

```
backend/
├── src/
│   ├── models/User.js
│   ├── controllers/userController.js
│   ├── services/authService.js
│   ├── routes/authRoutes.js
│   ├── middleware/auth.js
│   ├── utils/jwt.js & password.js
│   └── server.js
└── package.json

frontend/
├── src/
│   ├── pages/LoginPage.jsx & SignupPage.jsx & DashboardPage.jsx
│   ├── components/ProtectedRoute.jsx
│   ├── services/api.js & endpoints.js
│   ├── styles/auth.css & dashboard.css
│   └── App.jsx
└── package.json
```

---

## ✅ Phase 1 Complete!

You now have:

- ✅ User registration & login
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Secure password storage
- ✅ Beautiful auth UI
- ✅ User dashboard

---

## 🚀 Next: Phase 2 - Roadmap Core

Request the next phase:

> "Create roadmap schema and APIs including Roadmap, Module, and Topic models with get endpoints"

This will add:

- Roadmap selection screen
- Module navigation
- Topic display
