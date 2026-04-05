import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not set in your .env file! Add: JWT_SECRET=your_secret_key_here",
    );
  }

  try {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw error;
  }
};

export const verifyToken = (token) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not set!");
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Token verification error:", error.message);
    return null;
  }
};
