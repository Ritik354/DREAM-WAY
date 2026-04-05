import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { progressAPI } from "../services/endpoints.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { getLastTopicState, normalizeVideoUrl, setLastTopicState } from "../utils/roadmap.js";

const fallbackTopic = {
  _id: "fallback-topic",
  title: "Choose a lesson from your roadmap",
  description:
    "Open a topic from the roadmap view to load the full lesson context, video, and resource stack here.",
  resources: [],
  videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
  completed: false,
  moduleTitle: "Learning path",
  roadmapTitle: "Dream Way",
  previousTopic: null,
  nextTopic: null,
};

function Player() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [saving, setSaving] = useState(false);
  const [resourceSaved, setResourceSaved] = useState(false);
  const cachedState = getLastTopicState();

  const resolvedTopic = useMemo(() => {
    if (state?.topic) {
      return state.topic;
    }

    if (cachedState?.topic?._id === topicId) {
      return cachedState.topic;
    }

    return fallbackTopic;
  }, [state, cachedState, topicId]);

  const [completed, setCompleted] = useState(resolvedTopic.completed ?? false);

  useEffect(() => {
    setCompleted(resolvedTopic.completed ?? false);
  }, [resolvedTopic]);

  useEffect(() => {
    if (resolvedTopic._id !== fallbackTopic._id) {
      setLastTopicState({ topic: resolvedTopic });
    }
  }, [resolvedTopic]);

  const videoUrl = normalizeVideoUrl(resolvedTopic.videoUrl);

  const handleToggleComplete = async () => {
    if (!topicId || resolvedTopic._id === fallbackTopic._id) {
      navigate("/roadmaps");
      return;
    }

    setSaving(true);
    try {
      await progressAPI.updateProgress({ topicId, completed: !completed });
      const nextState = {
        topic: {
          ...resolvedTopic,
          completed: !completed,
        },
      };
      setCompleted((prev) => !prev);
      setLastTopicState(nextState);
    } catch (error) {
      console.error("Failed to save progress", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveResources = () => {
    setResourceSaved(true);
    window.setTimeout(() => setResourceSaved(false), 1600);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
            Lesson player
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold text-white">
            {resolvedTopic.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            {resolvedTopic.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => navigate("/roadmaps")}>
            Back to roadmap
          </Button>
          <Button variant="ghost">
            {resolvedTopic.moduleTitle || "Current module"}
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-3xl bg-[#6366f1]/10 px-4 py-2 text-sm font-semibold text-[#c7d2fe]">
              {resolvedTopic.roadmapTitle}
            </span>
            <span className="rounded-3xl bg-[#111827] px-4 py-2 text-sm text-muted">
              {resolvedTopic.moduleTitle}
            </span>
            <span
              className={`rounded-3xl px-4 py-2 text-sm font-semibold ${
                completed
                  ? "bg-[#22c55e]/10 text-[#86efac]"
                  : "bg-[#f59e0b]/10 text-[#fcd34d]"
              }`}
            >
              {completed ? "Completed" : "In progress"}
            </span>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-black shadow-soft">
            <iframe
              className="h-full w-full"
              src={videoUrl}
              title="Topic video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/85 p-5">
              <p className="text-sm text-muted">Lesson status</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {completed ? "Mastered" : "Ready to finish"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/85 p-5">
              <p className="text-sm text-muted">Resources</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {resolvedTopic.resources?.length || 0}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/85 p-5">
              <p className="text-sm text-muted">Learning mode</p>
              <p className="mt-3 text-xl font-semibold text-white">
                Guided roadmap
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                Resource stack
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Learn with the right references
              </h2>
            </div>
            <button
              type="button"
              onClick={handleSaveResources}
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#111827] text-[#6366f1] transition hover:bg-[#1b2540]"
            >
              <Bookmark className="h-5 w-5" />
            </button>
          </div>

          <div className="rounded-[1.5rem] bg-[#111827]/85 p-5">
            <p className="text-sm text-muted">
              {resourceSaved
                ? "This resource set is pinned in your current session."
                : "Use these curated links to reinforce the lesson while you watch."}
            </p>
          </div>

          <div className="space-y-3">
            {resolvedTopic.resources?.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.5rem] border border-white/10 bg-[#111827]/90 px-5 py-4 transition duration-200 hover:border-[#6366f1] hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {resource.title}
                    </p>
                    <p className="mt-2 text-sm text-muted">{resource.url}</p>
                  </div>
                  <ExternalLink className="mt-0.5 h-4 w-4 text-[#94a3b8]" />
                </div>
              </a>
            ))}

            {!resolvedTopic.resources?.length && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#111827]/70 px-5 py-6 text-sm leading-7 text-muted">
                This lesson does not have attached resources yet. Return to the
                roadmap and continue with another topic if you want a richer
                reference set.
              </div>
            )}
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={handleToggleComplete}
            disabled={saving}
          >
            {saving
              ? "Saving progress..."
              : completed
                ? "Mark as incomplete"
                : "Mark as complete"}
          </Button>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#a5b4fc]" />
            <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
              Lesson guidance
            </p>
          </div>
          <p className="text-sm leading-7 text-muted">
            Watch the lesson first, open the linked references while the ideas
            are fresh, and then mark the topic complete when you can explain it
            back in your own words.
          </p>
          <div className="rounded-[1.5rem] border border-white/10 bg-[#111827]/85 p-5">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-5 w-5 text-[#22c55e]" />
              <p className="text-base font-semibold text-white">
                Stay in the roadmap flow
              </p>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              Each topic is connected to the next one, so the fastest progress
              usually comes from following the sequence instead of jumping
              around.
            </p>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#86efac]" />
            <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
              Navigation
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {resolvedTopic.previousTopic ? (
              <Link
                to={`/player/${resolvedTopic.previousTopic._id}`}
                state={{ topic: resolvedTopic.previousTopic }}
                className="rounded-[1.5rem] border border-white/10 bg-[#111827]/90 px-5 py-4 transition duration-200 hover:border-[#6366f1] hover:bg-white/5"
              >
                <p className="inline-flex items-center gap-2 text-sm text-muted">
                  <ArrowLeft className="h-4 w-4" />
                  Previous topic
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {resolvedTopic.previousTopic.title}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#111827]/50 px-5 py-4 text-sm text-muted">
                This is the first topic in the roadmap.
              </div>
            )}

            {resolvedTopic.nextTopic ? (
              <Link
                to={`/player/${resolvedTopic.nextTopic._id}`}
                state={{ topic: resolvedTopic.nextTopic }}
                className="rounded-[1.5rem] border border-white/10 bg-[#111827]/90 px-5 py-4 transition duration-200 hover:border-[#6366f1] hover:bg-white/5"
              >
                <p className="inline-flex items-center gap-2 text-sm text-muted">
                  Next topic
                  <ArrowRight className="h-4 w-4" />
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {resolvedTopic.nextTopic.title}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#111827]/50 px-5 py-4 text-sm text-muted">
                You are at the end of this roadmap sequence.
              </div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Player;
