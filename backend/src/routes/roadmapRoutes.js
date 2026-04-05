import express from "express";
import { roadmapController } from "../controllers/roadmapController.js";
import { moduleController } from "../controllers/moduleController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", roadmapController.getRoadmaps);
router.get("/:id", roadmapController.getRoadmapById);
router.post("/", authMiddleware, roadmapController.createRoadmap);
router.put("/:id", authMiddleware, roadmapController.updateRoadmap);
router.delete("/:id", authMiddleware, roadmapController.deleteRoadmap);
router.post(
  "/:roadmapId/modules",
  authMiddleware,
  moduleController.createModule,
);
router.get(
  "/:roadmapId/modules",
  authMiddleware,
  moduleController.getModulesByRoadmap,
);

export default router;
