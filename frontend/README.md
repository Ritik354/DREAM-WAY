# Dream Way Frontend

React + Vite frontend for the Dream Way learning platform.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
frontend/src/
├── components/    # Reusable React components
├── pages/         # Page components (routes)
├── hooks/         # Custom React hooks
├── services/      # API calls
└── store/         # State management (Redux, Zustand, etc)
```

## API Integration

- API requests proxy to `http://localhost:5000`
- Configure base URL in axios service
