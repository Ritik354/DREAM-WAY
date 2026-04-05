import { authService } from "../services/authService.js";

export const userController = {
  // Register user
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide name, email, and password" });
      }

      const result = await authService.registerUser(name, email, password);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },

  // Login user
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide email and password" });
      }

      const result = await authService.loginUser(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  },

  // Get current user
  getCurrentUser: async (req, res, next) => {
    try {
      const user = await authService.getUserById(req.userId);

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  },
};
