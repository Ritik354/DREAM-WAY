import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import dns from "dns";
// Load environment variables
dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    `❌ ERROR: Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  console.error("Please create a .env file with required values:");
  console.error("  cp .env.example .env");
  console.error("  # Then edit .env with your MongoDB URI and JWT_SECRET");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(async () => {
  // Seed the database with sample roadmaps
  try {
    const { roadmapService } = await import("./services/roadmapService.js");
    await roadmapService.seedSampleRoadmaps();
    console.log("✅ Database seeded with sample roadmaps");
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.json({ message: "Dream Way Backend is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
