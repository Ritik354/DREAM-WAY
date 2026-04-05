#!/usr/bin/env node

/**
 * Quick Database Check
 * Check if roadmaps are seeded
 */

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

console.log("🔍 Checking database...");

await mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Roadmap = mongoose.model("Roadmap");
const roadmaps = await Roadmap.find().select("title").lean();

console.log(`Found ${roadmaps.length} roadmaps:`);
roadmaps.forEach((r, i) => console.log(`  ${i + 1}. ${r.title}`));

await mongoose.connection.close();
