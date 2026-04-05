# Dream Way - Structured Learning Platform

A modern, scalable MERN stack application designed to guide learners through structured roadmaps (MERN, DSA, etc.) with embedded videos, progress tracking, and an interactive learning experience.

## 📁 Project Structure

```
dream-way/
├── backend/                    # Express.js + MongoDB API
│   ├── src/
│   │   ├── config/            # Database & configuration
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   └── server.js          # Entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Page components
    │   ├── hooks/             # Custom React hooks
    │   ├── services/          # API integration
    │   ├── store/             # State management
    │   ├── utils/             # Helper functions
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📋 Development Roadmap

### PHASE 0: ✅ Project Setup (COMPLETE)

- ✅ Folder structure
- ✅ Express server setup
- ✅ React + Vite setup
- ✅ MongoDB connection config
- ✅ Basic routing template

### PHASE 1: Auth + User System (NEXT)

- User registration & login
- JWT authentication
- Protected routes
- User model & schema

### PHASE 2: Roadmap Core

- Roadmap, Module, Topic models
- Structured learning tree
- Navigation system

### PHASE 3: Video & Learning

- Embedded YouTube videos
- Timestamps & note-taking
- Resource links

### PHASE 4: Progress Tracking

- Mark topics complete
- Save progress
- Dashboard stats

### PHASE 5: Dashboard

- Progress overview
- Current roadmap view
- Resume learning button

### PHASE 6: Next Step Engine

- Smart topic unlocking
- Practice suggestions
- Call-to-action system

### PHASE 7: Notes & Bookmarks

- Save topic notes
- Bookmark topics
- Personal notes view

### PHASE 8: Admin Panel

- Content management
- CRUD operations
- Admin authentication

### PHASE 9: Polish

- Search feature
- Dark mode
- Mobile responsive
- Loading states

### PHASE 10: Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 🔧 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: (To be configured)

## 🔐 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend

Uses Vite proxy for API calls (configured in vite.config.js)

## 📝 API Endpoints (Planned)

```
Authentication:
- POST   /api/auth/register
- POST   /api/auth/login
- GET    /api/auth/me

Roadmaps:
- GET    /api/roadmaps
- GET    /api/roadmaps/:id

Progress:
- POST   /api/progress/update
- GET    /api/progress/user
```

## 🎯 Key Features (Planned)

✨ **Structured Learning Paths**: Pre-built roadmaps for MERN, DSA, etc.
📚 **Video Embedded Learning**: YouTube videos with timestamps
📊 **Progress Tracking**: Visual progress bars and completion tracking
🎮 **Gamification**: Next step suggestions and learning streaks
📝 **Note Taking**: Save notes per topic
🔖 **Bookmarking**: Mark important topics
🌙 **Dark Mode**: Comfortable viewing experience
📱 **Mobile Responsive**: Learn on any device

## 🚀 Next Steps

1. Start with **PHASE 1** - Implement user authentication
2. Then **PHASE 2** - Build roadmap structure
3. Continue systematically through each phase

## 📖 Instructions

Use these specific prompts for implementing features:

```
"Create Express backend with MVC structure and MongoDB connection"
"Create user authentication with JWT in Node.js"
"Create React dashboard with sidebar and routing"
"Create roadmap schema and APIs"
```

## 👨‍💻 Author

Built with ❤️ as a full-stack portfolio project

## 📄 License

ISC
