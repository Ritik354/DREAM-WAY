import { roadmapService } from "../services/roadmapService.js";

export const moduleController = {
  createModule: async (req, res) => {
    try {
      const { roadmapId } = req.params;
      const { title, description, order } = req.body;
      const module = await roadmapService.createModule(roadmapId, {
        title,
        description,
        order,
      });
      res.status(201).json({ success: true, data: module });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  getModulesByRoadmap: async (req, res) => {
    try {
      const modules = await roadmapService.getModulesByRoadmap(
        req.params.roadmapId,
      );
      res.status(200).json({ success: true, data: modules });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateModule: async (req, res) => {
    try {
      const { id } = req.params;
      const module = await roadmapService.updateModule(id, req.body);
      res.status(200).json({ success: true, data: module });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteModule: async (req, res) => {
    try {
      const { id } = req.params;
      await roadmapService.deleteModule(id);
      res
        .status(200)
        .json({ success: true, message: "Module deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
