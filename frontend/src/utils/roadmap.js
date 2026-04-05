const SELECTED_ROADMAP_KEY = "dream-way-selected-roadmap";
const LAST_TOPIC_KEY = "dream-way-last-topic";

export function getSelectedRoadmapId() {
  return localStorage.getItem(SELECTED_ROADMAP_KEY);
}

export function setSelectedRoadmapId(roadmapId) {
  if (roadmapId) {
    localStorage.setItem(SELECTED_ROADMAP_KEY, roadmapId);
  }
}

export function getLastTopicState() {
  const raw = localStorage.getItem(LAST_TOPIC_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setLastTopicState(topicState) {
  localStorage.setItem(LAST_TOPIC_KEY, JSON.stringify(topicState));
}

export function normalizeVideoUrl(url) {
  if (!url) {
    return "https://www.youtube.com/embed/dGcsHMXbSOA";
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : "https://www.youtube.com/embed/dGcsHMXbSOA";
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : "https://www.youtube.com/embed/dGcsHMXbSOA";
    }
  } catch {
    return url;
  }

  return url;
}

export function getRoadmapTopics(roadmap) {
  if (!roadmap?.modules) {
    return [];
  }

  return roadmap.modules.flatMap((module) =>
    (module.topics || []).map((topic, index) => ({
      ...topic,
      moduleId: module._id,
      moduleTitle: module.title,
      moduleDescription: module.description,
      moduleOrder: module.order ?? 0,
      topicOrder: topic.order ?? index,
      normalizedVideoUrl: normalizeVideoUrl(topic.videoUrl),
    })),
  );
}

export function buildRoadmapProgress(roadmap, completedTopicIds = []) {
  const completedSet = new Set(completedTopicIds || []);
  const topics = getRoadmapTopics(roadmap);
  const totalTopics = topics.length;
  const completedTopics = topics.filter((topic) =>
    completedSet.has(topic._id),
  ).length;
  const nextTopic =
    topics.find((topic) => !completedSet.has(topic._id)) || topics[0] || null;
  const totalResources = topics.reduce(
    (count, topic) => count + (topic.resources?.length || 0),
    0,
  );
  const completedModules =
    roadmap?.modules?.filter((module) =>
      (module.topics || []).every((topic) => completedSet.has(topic._id)),
    ).length || 0;

  return {
    topics,
    totalTopics,
    completedTopics,
    completionPercent:
      totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    completedModules,
    totalModules: roadmap?.modules?.length || 0,
    totalResources,
    nextTopic,
    estimatedHoursLeft: Math.max(1, Math.ceil((totalTopics - completedTopics) * 0.75)),
  };
}

export function createTopicState({
  roadmap,
  module,
  topic,
  completedTopicIds = [],
}) {
  const flattenedTopics = getRoadmapTopics(roadmap);
  const currentIndex = flattenedTopics.findIndex((item) => item._id === topic._id);
  const previousTopic = currentIndex > 0 ? flattenedTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < flattenedTopics.length - 1
      ? flattenedTopics[currentIndex + 1]
      : null;
  const completedSet = new Set(completedTopicIds);
  const mapTopicPreview = (item) =>
    item
      ? {
          _id: item._id,
          title: item.title,
          description:
            item.description ||
            "Continue this lesson to keep moving through your roadmap.",
          videoUrl: normalizeVideoUrl(item.videoUrl),
          resources: item.resources || [],
          completed: completedSet.has(item._id),
          moduleTitle: item.moduleTitle,
          roadmapTitle: roadmap?.title || "Roadmap",
        }
      : null;

  return {
    topic: {
      _id: topic._id,
      title: topic.title,
      description:
        topic.description ||
        "Start this lesson to keep moving through your roadmap with momentum.",
      videoUrl: normalizeVideoUrl(topic.videoUrl),
      resources: topic.resources || [],
      completed: completedSet.has(topic._id),
      moduleTitle: module?.title || topic.moduleTitle,
      roadmapTitle: roadmap?.title || "Roadmap",
      previousTopic: mapTopicPreview(previousTopic),
      nextTopic: mapTopicPreview(nextTopic),
    },
  };
}
