import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/dream-way";

    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("\n❌ MongoDB Connection Failed!\n");

    if (error.code === "ECONNREFUSED") {
      console.error("Error: Connection Refused");

      if (error.hostname === "_mongodb._tcp.cluster0.skoomtt.mongodb.net") {
        console.error("\nThis is a MongoDB Atlas connection issue.");
        console.error("Common causes:");
        console.error("  1. Your IP is not whitelisted in MongoDB Atlas");
        console.error("  2. Wrong credentials in MONGODB_URI");
        console.error("  3. Network connectivity issue");
        console.error("\n📝 To fix:");
        console.error("  1. Go to MongoDB Atlas Dashboard");
        console.error("  2. Network Access → Add IP Address");
        console.error("  3. Add 0.0.0.0/0 (allow all) for development");
        console.error("  4. Or add verify your current IP\n");
      }
    } else if (error.message.includes("authentication failed")) {
      console.error("Error: Authentication Failed");
      console.error("Your MongoDB credentials are incorrect.");
      console.error("Check username and password in MONGODB_URI\n");
    } else if (error.code === "ENOTFOUND") {
      console.error("Error: DNS Not Found");
      console.error("Could not resolve MongoDB hostname.");
      console.error("Check your internet connection or MONGODB_URI format\n");
    }

    console.error("Full error:", error.message);
    console.error("\n🆘 Need help?");
    console.error("Check TROUBLESHOOTING.md for more solutions");
    console.error("Or run: node test-mongodb.js\n");

    process.exit(1);
  }
};
