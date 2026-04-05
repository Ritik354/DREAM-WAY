import { roadmapService } from "../services/roadmapService.js";

export const roadmapController = {
  getRoadmaps: async (req, res) => {
    try {
      const roadmaps = await roadmapService.getAllRoadmaps();
      res.status(200).json({ success: true, data: roadmaps });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getRoadmapById: async (req, res) => {
    try {
      const roadmap = await roadmapService.getRoadmapById(req.params.id);
      res.status(200).json({ success: true, data: roadmap });
    } catch (error) {
      res.status(404).json({ success: false, error: error.message });
    }
  },

  createRoadmap: async (req, res) => {
    try {
      const roadmap = await roadmapService.createRoadmap(req.body);
      res.status(201).json({ success: true, data: roadmap });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  updateRoadmap: async (req, res) => {
    try {
      const roadmap = await roadmapService.updateRoadmap(
        req.params.id,
        req.body,
      );
      res.status(200).json({ success: true, data: roadmap });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteRoadmap: async (req, res) => {
    try {
      await roadmapService.deleteRoadmap(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Roadmap deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
