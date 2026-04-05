import { progressService } from "../services/progressService.js";

export const progressController = {
  getUserProgress: async (req, res) => {
    try {
      const progress = await progressService.getUserProgress(req.userId);
      res.status(200).json({ success: true, data: progress });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateTopicProgress: async (req, res) => {
    try {
      const { topicId, completed } = req.body;
      if (!topicId) {
        return res
          .status(400)
          .json({ success: false, error: "topicId is required" });
      }

      const progress = await progressService.updateTopicProgress(
        req.userId,
        topicId,
        completed === false ? false : true,
      );

      res.status(200).json({ success: true, data: progress });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
