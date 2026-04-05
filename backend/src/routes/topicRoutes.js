import express from "express";
import { topicController } from "../controllers/topicController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.put("/:id", authMiddleware, topicController.updateTopic);
router.delete("/:id", authMiddleware, topicController.deleteTopic);

export default router;
