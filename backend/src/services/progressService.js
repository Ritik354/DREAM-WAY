import Progress from "../models/Progress.js";
import Topic from "../models/Topic.js";
import { appendPhaseCompletionEntry } from "../utils/markdownLogger.js";

export const progressService = {
  getUserProgress: async (userId) => {
    const progress = await Progress.find({ user: userId }).lean();
    const completedTopicIds = progress
      .filter((item) => item.completed)
      .map((item) => item.topic.toString());

    const totalCompleted = completedTopicIds.length;
    return { completedTopicIds, totalCompleted };
  },

  updateTopicProgress: async (userId, topicId, completed = true) => {
    const topic = await Topic.findById(topicId).populate({
      path: "module",
      populate: { path: "roadmap" },
    });
    if (!topic) {
      throw new Error("Topic not found");
    }

    const module = topic.module;
    if (!module) {
      throw new Error("Topic module not found");
    }

    const moduleTopics = await Topic.find({ module: module._id }).lean();
    const moduleTopicIds = moduleTopics.map((item) => item._id);

    const existingTopicProgress = await Progress.findOne({
      user: userId,
      topic: topicId,
    }).lean();
    const alreadyCompleted = existingTopicProgress?.completed === true;

    const prevCompletedCount = await Progress.countDocuments({
      user: userId,
      topic: { $in: moduleTopicIds },
      completed: true,
    });

    const progress = await Progress.findOneAndUpdate(
      { user: userId, topic: topicId },
      { completed },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    const totalTopics = moduleTopicIds.length;
    if (
      completed &&
      !alreadyCompleted &&
      prevCompletedCount + 1 === totalTopics &&
      totalTopics > 0
    ) {
      await appendPhaseCompletionEntry({
        userId,
        roadmapTitle: topic.module.roadmap?.title || "Unknown roadmap",
        moduleTitle: topic.module.title,
        topicTitle: topic.title,
        totalTopics,
        completedAt: new Date(),
      });
    }

    return progress;
  },
};
