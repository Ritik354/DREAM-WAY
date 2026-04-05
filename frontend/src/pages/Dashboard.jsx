import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Layers,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { authAPI, roadmapAPI, progressAPI } from "../services/endpoints.js";
import { authUtils } from "../utils/storage.js";
import {
  buildRoadmapProgress,
  createTopicState,
  getSelectedRoadmapId,
  setLastTopicState,
  setSelectedRoadmapId,
} from "../utils/roadmap.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [progress, setProgress] = useState({
    completedTopicIds: [],
    totalCompleted: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, roadmapResponse, progressResponse] =
          await Promise.all([
            authAPI.getMe(),
            roadmapAPI.getRoadmaps(),
            progressAPI.getProgress(),
          ]);

        const roadmapList = roadmapResponse.data.data;
        const savedRoadmapId = getSelectedRoadmapId();
        const initialRoadmap =
          roadmapList.find((roadmap) => roadmap._id === savedRoadmapId) ||
          roadmapList[0] ||
          null;

        setUser(userResponse.data.data);
        setRoadmaps(roadmapList);
        setProgress(progressResponse.data.data);

        if (initialRoadmap?._id) {
          setSelectedRoadmapId(initialRoadmap._id);
          const activeRoadmapResponse = await roadmapAPI.getRoadmap(
            initialRoadmap._id,
          );
          setActiveRoadmap(activeRoadmapResponse.data.data);
        }
      } catch (error) {
        authUtils.logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <div className="text-text">Loading your dashboard...</div>;
  }

  const activeProgress = buildRoadmapProgress(
    activeRoadmap,
    progress.completedTopicIds,
  );
  const nextTopic = activeProgress.nextTopic;
  const nextModule = activeRoadmap?.modules?.find(
    (module) => module._id === nextTopic?.moduleId,
  );
  const weeklyGoal = Math.min(
    100,
    Math.round((activeProgress.completedTopics / Math.max(1, activeProgress.totalTopics || 6)) * 100),
  );

  const statCards = [
    {
      title: "Roadmaps live",
      value: roadmaps.length,
      detail: "Tracks available in your learning library",
      icon: Layers,
      accent: "bg-[#6366f1]/10 text-[#a5b4fc]",
    },
    {
      title: "Topics completed",
      value: progress.totalCompleted,
      detail: "Milestones you have already locked in",
      icon: BookOpen,
      accent: "bg-[#22c55e]/10 text-[#86efac]",
    },
    {
      title: "Current completion",
      value: `${activeProgress.completionPercent}%`,
      detail: activeRoadmap
        ? `${activeProgress.completedModules}/${activeProgress.totalModules} modules finished in ${activeRoadmap.title}`
        : "Choose a roadmap to start learning",
      icon: Compass,
      accent: "bg-[#f59e0b]/10 text-[#fcd34d]",
    },
    {
      title: "Hours left",
      value: activeProgress.estimatedHoursLeft,
      detail: "Estimated focused study time to finish the current roadmap",
      icon: TimerReset,
      accent: "bg-[#38bdf8]/10 text-[#7dd3fc]",
    },
  ];

  const handleContinue = () => {
    if (!activeRoadmap || !nextTopic || !nextModule) {
      navigate("/roadmaps");
      return;
    }

    const topicState = createTopicState({
      roadmap: activeRoadmap,
      module: nextModule,
      topic: nextTopic,
      completedTopicIds: progress.completedTopicIds,
    });

    setLastTopicState(topicState);
    navigate(`/player/${nextTopic._id}`, { state: topicState });
  };

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_28%),linear-gradient(135deg,_#111827,_#0f172a_55%,_#1e293b)] p-8 shadow-soft sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.38em] text-[#94a3b8]">
                Learner dashboard
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {user?.name ? `${user.name}, your next win is ready.` : "Your next win is ready."}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
                Keep your momentum with a clear roadmap, a focused next lesson,
                and a resource stack that makes each study session easier to
                finish.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                  Active roadmap
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {activeRoadmap?.title || "No roadmap selected"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                  Next lesson
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {nextTopic?.title || "Browse roadmaps"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                  Resource bank
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {activeProgress.totalResources} saved links
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={handleContinue}>
                {nextTopic ? "Continue learning" : "Explore roadmaps"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/roadmaps")}
              >
                Open roadmap library
              </Button>
            </div>
          </div>

          <Card className="space-y-6 bg-[#0f172a]/70 p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                  Focus lane
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {nextTopic?.title || "Pick your next lesson"}
                </h2>
              </div>
              <span className="rounded-3xl bg-[#6366f1]/10 px-4 py-2 text-sm font-semibold text-[#c7d2fe]">
                {activeProgress.completionPercent}% complete
              </span>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-muted">
                {nextTopic?.moduleTitle || "Learning path"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#cbd5e1]">
                {nextTopic?.description ||
                  "Choose a roadmap and we will guide you to the best next topic automatically."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Roadmap progress</span>
                <span>
                  {activeProgress.completedTopics}/{activeProgress.totalTopics || 0} lessons
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22c55e]"
                  style={{ width: `${activeProgress.completionPercent}%` }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#111827] p-4">
                <p className="text-sm text-muted">Modules done</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {activeProgress.completedModules}/{activeProgress.totalModules}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-[#111827] p-4">
                <p className="text-sm text-muted">Weekly pace</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {weeklyGoal}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="space-y-4 p-7">
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${item.accent}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                {item.title}
              </p>
              <p className="text-4xl font-semibold text-white">{item.value}</p>
              <p className="text-sm leading-7 text-muted">{item.detail}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                Recommended next step
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {nextTopic?.title || "No active lesson yet"}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#a5b4fc] transition hover:text-white"
            >
              Jump in
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/90 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Roadmap
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {activeRoadmap?.title || "Choose a roadmap"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/90 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Module
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {nextTopic?.moduleTitle || "Waiting for selection"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/90 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[#94a3b8]">
                Resources
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {nextTopic?.resources?.length || 0} links attached
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-muted">
            {nextTopic?.description ||
              "Once you select a roadmap, this panel will keep your next lesson and resource stack front and center."}
          </p>
        </Card>

        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
              Resource snapshot
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              What supports this roadmap
            </h2>
          </div>

          <div className="space-y-3">
            {(nextTopic?.resources || []).slice(0, 3).map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.5rem] border border-white/10 bg-[#111827]/85 px-5 py-4 transition duration-200 hover:border-[#6366f1] hover:bg-white/5"
              >
                <p className="text-sm font-semibold text-white">
                  {resource.title}
                </p>
                <p className="mt-2 text-sm text-muted">{resource.url}</p>
              </a>
            ))}

            {!nextTopic?.resources?.length && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#111827]/70 px-5 py-6 text-sm leading-7 text-muted">
                This next lesson does not have curated resources yet, but the
                roadmap timeline is ready for you in the roadmaps view.
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/roadmaps")}
          >
            Browse full roadmap resources
          </Button>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
