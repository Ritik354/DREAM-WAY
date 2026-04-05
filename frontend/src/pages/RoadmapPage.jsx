import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roadmapAPI, progressAPI } from "../services/endpoints.js";
import { authUtils } from "../utils/storage.js";

function RoadmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({ completedTopicIds: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const [roadmapResponse, progressResponse] = await Promise.all([
          roadmapAPI.getRoadmap(id),
          progressAPI.getProgress(),
        ]);

        setRoadmap(roadmapResponse.data.data);
        setProgress(progressResponse.data.data);
      } catch (err) {
        console.error("Failed to load roadmap:", err);
        setError("Unable to load roadmap. Please try again.");
        if (err.response?.status === 401) {
          authUtils.logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id, navigate]);

  const toggleCompletion = async (topicId, completed) => {
    try {
      await progressAPI.updateProgress({ topicId, completed });
      setProgress((current) => {
        const updated = { ...current };
        if (completed) {
          updated.completedTopicIds = Array.from(
            new Set([...updated.completedTopicIds, topicId]),
          );
        } else {
          updated.completedTopicIds = updated.completedTopicIds.filter(
            (item) => item !== topicId,
          );
        }
        return updated;
      });
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading roadmap...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#f5f7fa" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 18px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        &larr; Back to Dashboard
      </button>

      <h1>{roadmap.title}</h1>
      <p style={{ marginTop: "12px", color: "#555" }}>{roadmap.description}</p>
      <p style={{ marginTop: "10px", color: "#777" }}>
        Completed topics: {progress.completedTopicIds.length}
      </p>

      {roadmap.modules?.length > 0 ? (
        roadmap.modules.map((module) => (
          <div
            key={module._id}
            style={{
              marginTop: "32px",
              padding: "24px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            <h2>{module.title}</h2>
            <p style={{ color: "#666" }}>{module.description}</p>
            <div style={{ marginTop: "16px" }}>
              {module.topics?.length > 0 ? (
                module.topics.map((topic) => {
                  const completed = progress.completedTopicIds.includes(
                    topic._id,
                  );
                  return (
                    <div
                      key={topic._id}
                      style={{
                        padding: "16px",
                        borderTop: "1px solid #eee",
                        background: completed ? "#f0fff4" : "transparent",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <h3 style={{ marginBottom: "8px" }}>{topic.title}</h3>
                          <p style={{ marginBottom: "6px", color: "#555" }}>
                            {topic.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            toggleCompletion(topic._id, !completed)
                          }
                          style={{
                            padding: "8px 14px",
                            background: completed ? "#e76f51" : "#2a9d8f",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {completed ? "Mark incomplete" : "Mark complete"}
                        </button>
                      </div>
                      {topic.videoUrl && (
                        <p style={{ marginBottom: "6px" }}>
                          Video:{" "}
                          <a
                            href={topic.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Watch
                          </a>
                        </p>
                      )}
                      {topic.resources?.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <strong>Resources:</strong>
                          <ul>
                            {topic.resources.map((resource) => (
                              <li key={resource.url}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {resource.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#888" }}>No topics available yet.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p style={{ marginTop: "24px", color: "#888" }}>
          This roadmap has no modules yet.
        </p>
      )}
    </div>
  );
}

export default RoadmapPage;
