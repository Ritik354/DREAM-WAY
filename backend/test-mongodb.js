#!/usr/bin/env node

/**
 * MongoDB Connection Tester
 * Run this to diagnose MongoDB connection issues
 * Usage: node test-mongodb.js
 */

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("\n🧪 MongoDB Connection Diagnostic Tool\n");
console.log("═".repeat(50));

// Step 1: Check if MONGODB_URI is set
const mongoURI = process.env.MONGODB_URI;

console.log("\n1️⃣ Checking MONGODB_URI...");
if (!mongoURI) {
  console.error("❌ MONGODB_URI is not set in .env file!");
  console.error("Add this to your .env:");
  console.error(
    "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dream-way",
  );
  process.exit(1);
} else {
  // Mask sensitive info
  const masked = mongoURI.replace(/:[^:]*@/, ":****@").substring(0, 60) + "...";
  console.log(`✅ MONGODB_URI is set: ${masked}`);
}

// Step 2: Parse URI
console.log("\n2️⃣ Parsing URI...");
try {
  const url = new URL(mongoURI.replace("mongodb+srv://", "mongodb://"));
  console.log(`✅ Protocol: ${url.protocol}`);
  console.log(`✅ Hostname: ${url.hostname || "(Atlas URI)"}`);
} catch (e) {
  console.error("❌ Invalid URI format:", e.message);
  process.exit(1);
}

// Step 3: Check connection type
console.log("\n3️⃣ Checking connection type...");
if (mongoURI.includes("mongodb+srv://")) {
  console.log("✅ MongoDB Atlas (Cloud) - SRV connection");
} else if (mongoURI.includes("mongodb://")) {
  console.log("✅ Local MongoDB");
} else {
  console.error("❌ Unknown connection type");
  process.exit(1);
}

// Step 4: Attempt connection
console.log("\n4️⃣ Attempting connection...");
console.log("⏳ This may take up to 10 seconds...\n");

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!\n");

    // Test by creating/checking a collection
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log(
      `✅ Database accessible. Found ${collections.length} collections.`,
    );

    if (collections.length === 0) {
      console.log("ℹ️  Database is empty (this is normal for new setup)");
    } else {
      collections.forEach((col) => console.log(`   - ${col.name}`));
    }

    console.log("\n" + "═".repeat(50));
    console.log("✅ MongoDB is configured correctly!\n");
    console.log("You can now start the backend:");
    console.log("  npm run dev\n");

    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Connection Failed!\n");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);

    // Provide specific help
    if (error.code === "ECONNREFUSED") {
      console.error("\n🆘 ECONNREFUSED - Connection Refused");
      console.error("Common solutions:");
      console.error("  1. MongoDB Atlas: Whitelist your IP");
      console.error("     → Add 0.0.0.0/0 in Network Access");
      console.error("  2. Check username/password in MONGODB_URI");
      console.error("  3. Check internet connection");
    } else if (error.code === "ENOTFOUND") {
      console.error("\n🆘 ENOTFOUND - Hostname not found");
      console.error("Solutions:");
      console.error("  1. Check internet connection");
      console.error("  2. Verify MongoDB URI is correct");
      console.error("  3. Check DNS resolution");
    } else if (error.message.includes("authentication failed")) {
      console.error("\n🆘 Authentication Failed");
      console.error("Solutions:");
      console.error("  1. Double-check username in MONGODB_URI");
      console.error("  2. Double-check password in MONGODB_URI");
      console.error("  3. Verify user has access to database");
    } else if (error.message.includes("TIMEOUT")) {
      console.error("\n🆘 Connection Timeout");
      console.error("Solutions:");
      console.error("  1. Check if MongoDB is running");
      console.error("  2. Check network connectivity");
      console.error("  3. Verify MongoDB URI is accessible");
    }

    console.error("\n📝 For more help, see TROUBLESHOOTING.md");
    console.error("═".repeat(50) + "\n");

    process.exit(1);
  });
