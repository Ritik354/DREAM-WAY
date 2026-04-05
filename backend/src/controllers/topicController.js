import { roadmapService } from "../services/roadmapService.js";

export const topicController = {
  createTopic: async (req, res) => {
    try {
      const { moduleId } = req.params;
      const { title, description, videoUrl, resources, order } = req.body;
      const topic = await roadmapService.createTopic(moduleId, {
        title,
        description,
        videoUrl,
        resources,
        order,
      });
      res.status(201).json({ success: true, data: topic });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  getTopicsByModule: async (req, res) => {
    try {
      const topics = await roadmapService.getTopicsByModule(
        req.params.moduleId,
      );
      res.status(200).json({ success: true, data: topics });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateTopic: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await roadmapService.updateTopic(id, req.body);
      res.status(200).json({ success: true, data: topic });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteTopic: async (req, res) => {
    try {
      const { id } = req.params;
      await roadmapService.deleteTopic(id);
      res
        .status(200)
        .json({ success: true, message: "Topic deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
