import express from "express";
import { moduleController } from "../controllers/moduleController.js";
import { topicController } from "../controllers/topicController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/:moduleId/topics", topicController.getTopicsByModule);
router.put("/:id", authMiddleware, moduleController.updateModule);
router.delete("/:id", authMiddleware, moduleController.deleteModule);
router.post("/:moduleId/topics", authMiddleware, topicController.createTopic);

export default router;
