#!/usr/bin/env node

/**
 * Database Seeder
 * Usage:
 *   node seed-database.js
 *   node seed-database.js --reset
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import Roadmap from "./src/models/Roadmap.js";
import { roadmapService } from "./src/services/roadmapService.js";

dotenv.config();

const shouldReset = process.argv.includes("--reset");

console.log("\nDream Way Database Seeder\n");
console.log("=".repeat(50));

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI not found in .env file.");
  process.exit(1);
}

console.log("Connecting to MongoDB...");
await mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connected to MongoDB");

try {
  if (shouldReset) {
    console.log("\nResetting roadmap, module, topic, and progress data...");
    await roadmapService.resetAndSeedSampleRoadmaps();
    console.log("Roadmap data reset and seeded successfully.");
  } else {
    console.log("\nSeeding roadmaps if database is empty...");
    await roadmapService.seedSampleRoadmaps();
    console.log("Seed step completed.");
  }

  console.log("\nVerifying seeded data...");
  const roadmaps = await Roadmap.find().select("title description").lean();

  console.log(`Found ${roadmaps.length} roadmaps:`);
  roadmaps.forEach((roadmap, index) => {
    console.log(`  ${index + 1}. ${roadmap.title}`);
  });
} catch (error) {
  console.error("\nSeeder failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.connection.close();
  console.log("\nDatabase connection closed.");
  console.log("=".repeat(50));
}
