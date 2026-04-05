#!/usr/bin/env node

/**
 * Environment Setup Checker
 * Run this to verify your .env configuration before starting the backend
 * Usage: node verify-setup.js
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";

console.log("\n🔍 Dream Way Backend - Setup Verification\n");
console.log("═".repeat(50));

// Check if .env file exists
const envPath = ".env";
const envExamplePath = ".env.example";

console.log("\n1️⃣ Checking .env file...");
if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found!");
  console.log("\nQuick fix:");
  console.log(`  cp ${envExamplePath} .env`);
  console.log("  # Then edit .env with your values");
  process.exit(1);
} else {
  console.log("✅ .env file found");
}

// Load environment variables
dotenv.config();

// Check required variables
console.log("\n2️⃣ Checking required environment variables...");
const requiredVars = [
  { key: "PORT", defaultValue: "5000" },
  { key: "JWT_SECRET", critical: true },
  { key: "MONGODB_URI", critical: true },
  { key: "JWT_EXPIRE", defaultValue: "7d" },
  { key: "NODE_ENV", defaultValue: "development" },
];

let hasError = false;

requiredVars.forEach(({ key, critical, defaultValue }) => {
  const value = process.env[key];

  if (!value) {
    if (critical) {
      console.error(`❌ ${key}: NOT SET (required!)`);
      hasError = true;
    } else if (defaultValue) {
      console.warn(`⚠️ ${key}: Not set, will use default: ${defaultValue}`);
    } else {
      console.warn(`⚠️ ${key}: Not set`);
    }
  } else {
    // Mask sensitive values
    const maskValue = (val) => {
      if (key === "JWT_SECRET" || key === "MONGODB_URI") {
        return val.substring(0, 10) + "***" + val.substring(val.length - 5);
      }
      return val;
    };

    console.log(`✅ ${key}: ${maskValue(value)}`);
  }
});

if (hasError) {
  console.error("\n❌ Setup verification failed!");
  console.error("\nPlease fix the missing values in your .env file:");
  console.error("  nano .env  # or your preferred editor");
  process.exit(1);
}

// Check MongoDB connection (optional)
console.log("\n3️⃣ Checking MongoDB configuration...");
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  if (mongoUri.includes("mongodb://")) {
    console.log("✅ Local MongoDB URI detected");
  } else if (mongoUri.includes("mongodb+srv://")) {
    console.log("✅ MongoDB Atlas URI detected");
  } else {
    console.warn("⚠️ Unrecognized MongoDB URI format");
  }
} else {
  console.error("❌ MONGODB_URI not set");
  hasError = true;
}

// Check JWT configuration
console.log("\n4️⃣ Checking JWT configuration...");
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret && jwtSecret.length < 10) {
  console.warn("⚠️ JWT_SECRET is quite short (less than 10 characters)");
  console.log("   Recommended: 32+ characters for better security");
} else if (jwtSecret) {
  console.log(`✅ JWT_SECRET is ${jwtSecret.length} characters`);
}

// Verification complete
console.log("\n" + "═".repeat(50));

if (!hasError) {
  console.log("\n✅ All checks passed!");
  console.log("\nYou can now start the backend:");
  console.log("  npm run dev");
  console.log("\n");
} else {
  console.error("\n❌ Some checks failed. Please fix the issues above.");
  process.exit(1);
}
