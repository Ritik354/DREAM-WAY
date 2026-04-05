# Dream Way Backend

Express.js + MongoDB backend for the Dream Way learning platform.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Add your MongoDB URI and JWT secret to `.env`

4. Run development server:
   ```bash
   npm run dev
   ```

## Seed Roadmap Data

If you want to insert sample roadmap data only when the database is empty:

```bash
npm run seed
```

If your database already contains older roadmap data and you want to refresh it
from `src/services/roadmapService.js`, run:

```bash
npm run seed:reset
```

This reset command clears roadmap-related collections (`roadmaps`, `modules`,
`topics`, and `progress`) and then seeds the latest roadmap content again. It
does not delete users.

## Project Structure

```
backend/src/
├── config/        # Configuration files (DB connection, etc)
├── controllers/   # Request handlers
├── middleware/    # Express middleware
├── models/        # Mongoose schemas
├── routes/        # API routes
├── services/      # Business logic
└── utils/         # Utility functions
```

## API Endpoints

Coming in Phase 1 (Authentication)
