import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, roadmapAPI, progressAPI } from "../services/endpoints.js";
import { authUtils } from "../utils/storage.js";
import "../styles/dashboard.css";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
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

        setUser(userResponse.data.data);
        setRoadmaps(roadmapResponse.data.data);
        setProgress(progressResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        authUtils.logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    authUtils.logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dream Way Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {user?.name}!</h2>
          <p>Email: {user?.email}</p>
          <p className="member-since">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="roadmap-section">
          <h3>Available Roadmaps</h3>
          {roadmaps.length === 0 ? (
            <p style={{ color: "#999", marginTop: "20px" }}>
              No roadmaps are available yet.
            </p>
          ) : (
            <div className="roadmap-list">
              {roadmaps.map((roadmap) => (
                <div key={roadmap._id} className="roadmap-card">
                  <h4>{roadmap.title}</h4>
                  <p>{roadmap.description}</p>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    <button
                      onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                      className="btn-primary"
                    >
                      View roadmap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="progress-section">
          <h3>Your Progress</h3>
          <p style={{ color: "#333", marginTop: "10px" }}>
            Completed topics: <strong>{progress.totalCompleted}</strong>
          </p>
          <p style={{ color: "#777", marginTop: "8px" }}>
            Progress is saved per topic and will update as you complete lessons.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
