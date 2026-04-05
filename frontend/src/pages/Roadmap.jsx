import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { roadmapAPI, progressAPI } from "../services/endpoints.js";
import {
  buildRoadmapProgress,
  createTopicState,
  getSelectedRoadmapId,
  setLastTopicState,
  setSelectedRoadmapId,
} from "../utils/roadmap.js";

function Roadmap() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmapId, setSelectedRoadmap] = useState(
    getSelectedRoadmapId(),
  );
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({
    completedTopicIds: [],
    totalCompleted: 0,
  });
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoadmaps = async () => {
      try {
        const [roadmapsResponse, progressResponse] = await Promise.all([
          roadmapAPI.getRoadmaps(),
          progressAPI.getProgress(),
        ]);

        const roadmapList = roadmapsResponse.data.data;
        const initialRoadmapId =
          selectedRoadmapId && roadmapList.some((item) => item._id === selectedRoadmapId)
            ? selectedRoadmapId
            : roadmapList[0]?._id || null;

        setRoadmaps(roadmapList);
        setProgress(progressResponse.data.data);
        setSelectedRoadmap(initialRoadmapId);
        setSelectedRoadmapId(initialRoadmapId);
      } catch (error) {
        console.error("Failed to load roadmaps:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmaps();
  }, []);

  useEffect(() => {
    const loadRoadmap = async () => {
      if (!selectedRoadmapId) {
        return;
      }

      setLoading(true);
      try {
        const response = await roadmapAPI.getRoadmap(selectedRoadmapId);
        const nextRoadmap = response.data.data;
        const roadmapProgress = buildRoadmapProgress(
          nextRoadmap,
          progress.completedTopicIds,
        );

        setRoadmap(nextRoadmap);
        setSelectedRoadmapId(selectedRoadmapId);
        setExpanded((current) => {
          if (Object.keys(current).length > 0) {
            return current;
          }

          const initialExpanded = {};
          nextRoadmap.modules.forEach((module) => {
            initialExpanded[module._id] =
              module._id === roadmapProgress.nextTopic?.moduleId;
          });
          return initialExpanded;
        });
      } catch (error) {
        console.error("Unable to load roadmap", error);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [selectedRoadmapId, progress.completedTopicIds]);

  const roadmapProgress = useMemo(
    () => buildRoadmapProgress(roadmap, progress.completedTopicIds),
    [roadmap, progress.completedTopicIds],
  );
  const completedIds = useMemo(
    () => new Set(progress.completedTopicIds || []),
    [progress.completedTopicIds],
  );

  const getModuleStatus = (module) => {
    const allComplete = (module.topics || []).every((topic) =>
      completedIds.has(topic._id),
    );

    if (allComplete) {
      return "complete";
    }

    if (module._id === roadmapProgress.nextTopic?.moduleId) {
      return "current";
    }

    const moduleIndex = roadmap?.modules?.findIndex((item) => item._id === module._id) ?? -1;
    const nextModuleIndex =
      roadmap?.modules?.findIndex(
        (item) => item._id === roadmapProgress.nextTopic?.moduleId,
      ) ?? -1;

    return moduleIndex <= nextModuleIndex ? "available" : "locked";
  };

  const getTopicStatus = (topic) => {
    if (completedIds.has(topic._id)) {
      return "complete";
    }

    if (topic._id === roadmapProgress.nextTopic?._id) {
      return "current";
    }

    const topicIndex = roadmapProgress.topics.findIndex((item) => item._id === topic._id);
    const nextTopicIndex = roadmapProgress.topics.findIndex(
      (item) => item._id === roadmapProgress.nextTopic?._id,
    );

    return topicIndex <= nextTopicIndex ? "available" : "locked";
  };

  const openTopic = (module, topic) => {
    const topicState = createTopicState({
      roadmap,
      module,
      topic,
      completedTopicIds: progress.completedTopicIds,
    });

    setLastTopicState(topicState);
    navigate(`/player/${topic._id}`, { state: topicState });
  };

  if (loading && !roadmap) {
    return <div className="text-text">Loading roadmap timeline...</div>;
  }

  if (!roadmaps.length) {
    return <div className="text-text">No roadmaps available yet.</div>;
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.16),_transparent_24%),linear-gradient(135deg,_#111827,_#0f172a_58%,_#1e293b)] p-8 shadow-soft sm:p-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm uppercase tracking-[0.32em] text-[#94a3b8]">
              Roadmap studio
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              {roadmap?.title || "Choose a roadmap"}
            </h1>
            <p className="text-sm leading-7 text-muted sm:text-base">
              {roadmap?.description ||
                "Select a roadmap and follow the modules in sequence to keep your learning focused."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Completion
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.completionPercent}%
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Lessons
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.completedTopics}/{roadmapProgress.totalTopics}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Resources
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.totalResources}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {roadmaps.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => {
                setSelectedRoadmap(item._id);
                setExpanded({});
              }}
              className={`rounded-3xl border px-4 py-3 text-sm transition duration-200 ${
                item._id === selectedRoadmapId
                  ? "border-[#6366f1] bg-[#6366f1]/15 text-white"
                  : "border-white/10 bg-[#111827]/75 text-muted hover:border-[#6366f1] hover:text-text"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                Next lesson
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {roadmapProgress.nextTopic?.title || "Everything completed"}
              </h2>
            </div>
            <Button
              variant="primary"
              onClick={() =>
                roadmapProgress.nextTopic &&
                openTopic(
                  roadmap.modules.find(
                    (module) => module._id === roadmapProgress.nextTopic.moduleId,
                  ),
                  roadmapProgress.nextTopic,
                )
              }
              disabled={!roadmapProgress.nextTopic}
            >
              Continue
            </Button>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#111827]/85 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#94a3b8]">
                  {roadmapProgress.nextTopic?.moduleTitle || "Current roadmap"}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {roadmapProgress.nextTopic?.description ||
                    "You have completed every lesson in this roadmap. Explore another track to keep going."}
                </p>
              </div>
              <span className="rounded-3xl bg-[#22c55e]/10 px-4 py-2 text-sm font-semibold text-[#86efac]">
                {roadmapProgress.nextTopic?.resources?.length || 0} resources
              </span>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#22c55e]"
                style={{ width: `${roadmapProgress.completionPercent}%` }}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#111827] p-5">
              <p className="text-sm text-muted">Modules completed</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.completedModules}/{roadmapProgress.totalModules}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#111827] p-5">
              <p className="text-sm text-muted">Hours remaining</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.estimatedHoursLeft}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#111827] p-5">
              <p className="text-sm text-muted">Attached resources</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {roadmapProgress.totalResources}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
              Resource highlights
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Top links in this roadmap
            </h2>
          </div>

          <div className="space-y-3">
            {roadmapProgress.topics
              .flatMap((topic) =>
                (topic.resources || []).map((resource) => ({
                  ...resource,
                  topicTitle: topic.title,
                })),
              )
              .slice(0, 4)
              .map((resource) => (
                <a
                  key={`${resource.url}-${resource.topicTitle}`}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.5rem] border border-white/10 bg-[#111827]/85 px-5 py-4 transition duration-200 hover:border-[#6366f1] hover:bg-white/5"
                >
                  <p className="text-sm font-semibold text-white">
                    {resource.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    From {resource.topicTitle}
                  </p>
                </a>
              ))}
          </div>

          {!roadmapProgress.totalResources && (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#111827]/70 px-5 py-6 text-sm leading-7 text-muted">
              No resources are attached yet for this roadmap.
            </div>
          )}
        </Card>
      </section>

      <Card className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
              Learning timeline
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Move module by module
            </h2>
          </div>
          <span className="rounded-3xl bg-[#111827] px-4 py-2 text-sm text-muted">
            {roadmap?.modules?.length || 0} modules
          </span>
        </div>

        {roadmap?.modules?.map((module, moduleIndex) => {
          const moduleStatus = getModuleStatus(module);
          const statusStyles = {
            complete: "bg-[#22c55e]/10 text-[#86efac]",
            current: "bg-[#6366f1]/10 text-[#c7d2fe]",
            available: "bg-[#f59e0b]/10 text-[#fcd34d]",
            locked: "bg-white/5 text-muted",
          };
          const statusText = {
            complete: "Completed",
            current: "Current module",
            available: "Ready to explore",
            locked: "Locked",
          };

          return (
            <div key={module._id} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111827]/70 p-6">
              {moduleIndex < (roadmap.modules?.length || 0) - 1 && (
                <div className="absolute left-11 top-20 h-full w-px bg-white/10" />
              )}

              <div className="flex items-start gap-4">
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-[#0f172a] text-[#6366f1]">
                  {moduleStatus === "complete" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : moduleStatus === "current" ? (
                    <Sparkles className="h-5 w-5" />
                  ) : moduleStatus === "available" ? (
                    <Compass className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-white">
                        {module.title}
                      </h3>
                      <p className="max-w-3xl text-sm leading-7 text-muted">
                        {module.description ||
                          "Follow this module to move through the roadmap in order."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-3xl px-4 py-2 text-sm font-semibold ${statusStyles[moduleStatus]}`}
                      >
                        {statusText[moduleStatus]}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((state) => ({
                            ...state,
                            [module._id]: !state[module._id],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-text transition duration-200 hover:bg-white/10"
                      >
                        {expanded[module._id] ? "Hide lessons" : "Show lessons"}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expanded[module._id] ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {module.topics.length} lessons
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {(module.topics || []).reduce(
                        (count, topic) => count + (topic.resources?.length || 0),
                        0,
                      )}{" "}
                      resources
                    </span>
                  </div>

                  {expanded[module._id] && (
                    <div className="grid gap-3 pt-2">
                      {module.topics.map((topic) => {
                        const topicStatus = getTopicStatus(topic);
                        const clickable = topicStatus !== "locked";
                        const statusIcon =
                          topicStatus === "complete" ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : topicStatus === "current" ? (
                            <PlayCircle className="h-5 w-5" />
                          ) : topicStatus === "available" ? (
                            <Compass className="h-5 w-5" />
                          ) : (
                            <Lock className="h-5 w-5" />
                          );

                        return (
                          <button
                            key={topic._id}
                            type="button"
                            onClick={() => clickable && openTopic(module, topic)}
                            className={`w-full rounded-[1.5rem] border px-5 py-4 text-left transition duration-200 ${
                              clickable
                                ? "border-white/10 bg-[#0f172a]/85 hover:border-[#6366f1] hover:bg-white/5"
                                : "cursor-not-allowed border-white/5 bg-[#0f172a]/40"
                            }`}
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-start gap-4">
                                <span
                                  className={`mt-1 inline-flex h-11 w-11 items-center justify-center rounded-3xl ${
                                    topicStatus === "complete"
                                      ? "bg-[#22c55e]/10 text-[#86efac]"
                                      : topicStatus === "current"
                                        ? "bg-[#6366f1]/10 text-[#c7d2fe]"
                                        : topicStatus === "available"
                                          ? "bg-[#f59e0b]/10 text-[#fcd34d]"
                                          : "bg-white/5 text-muted"
                                  }`}
                                >
                                  {statusIcon}
                                </span>
                                <div>
                                  <p className="text-base font-semibold text-white">
                                    {topic.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-7 text-muted">
                                    {topic.description ||
                                      "Open this lesson to watch the video and review its resources."}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-3xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.28em] text-[#94a3b8]">
                                  {topicStatus}
                                </span>
                                <span className="rounded-3xl bg-[#111827] px-3 py-2 text-sm text-muted">
                                  {topic.resources?.length || 0} resources
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default Roadmap;
