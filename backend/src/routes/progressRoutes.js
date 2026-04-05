import express from "express";
import { progressController } from "../controllers/progressController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/user", authMiddleware, progressController.getUserProgress);
router.post("/update", authMiddleware, progressController.updateTopicProgress);

export default router;
