import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roadmapAPI, moduleAPI, topicAPI } from "../services/endpoints.js";
import { authUtils } from "../utils/storage.js";

function ManageRoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRoadmap, setNewRoadmap] = useState({ title: "", description: "" });
  const [moduleForms, setModuleForms] = useState({});
  const [topicForms, setTopicForms] = useState({});
  const [editRoadmapId, setEditRoadmapId] = useState(null);
  const [editRoadmapData, setEditRoadmapData] = useState({
    title: "",
    description: "",
  });
  const [editModuleId, setEditModuleId] = useState(null);
  const [editModuleData, setEditModuleData] = useState({
    title: "",
    description: "",
  });
  const [editTopicId, setEditTopicId] = useState(null);
  const [editTopicData, setEditTopicData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    resourceTitle: "",
    resourceUrl: "",
  });
  const [moduleLists, setModuleLists] = useState({});
  const [topicLists, setTopicLists] = useState({});
  const [expandedRoadmaps, setExpandedRoadmaps] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  const navigate = useNavigate();

  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      authUtils.logout();
      navigate("/login");
      return;
    }
    setError(error.response?.data?.error || "Something went wrong");
  };

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await roadmapAPI.getRoadmaps();
      setRoadmaps(response.data.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchModules = async (roadmapId) => {
    try {
      const response = await moduleAPI.getModules(roadmapId);
      setModuleLists((prev) => ({ ...prev, [roadmapId]: response.data.data }));
    } catch (error) {
      handleApiError(error);
    }
  };

  const fetchTopics = async (moduleId) => {
    try {
      const response = await topicAPI.getTopics(moduleId);
      setTopicLists((prev) => ({ ...prev, [moduleId]: response.data.data }));
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCreateRoadmap = async (e) => {
    e.preventDefault();
    try {
      await roadmapAPI.createRoadmap(newRoadmap);
      setNewRoadmap({ title: "", description: "" });
      fetchRoadmaps();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateRoadmap = async (roadmapId) => {
    try {
      await roadmapAPI.updateRoadmap(roadmapId, editRoadmapData);
      setEditRoadmapId(null);
      setEditRoadmapData({ title: "", description: "" });
      fetchRoadmaps();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteRoadmap = async (roadmapId) => {
    if (!window.confirm("Delete this roadmap?")) return;
    try {
      await roadmapAPI.deleteRoadmap(roadmapId);
      setRoadmaps((prev) =>
        prev.filter((roadmap) => roadmap._id !== roadmapId),
      );
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCreateModule = async (roadmapId) => {
    try {
      const form = moduleForms[roadmapId] || {
        title: "",
        description: "",
        order: 0,
      };
      await moduleAPI.createModule(roadmapId, form);
      setModuleForms((prev) => ({
        ...prev,
        [roadmapId]: { title: "", description: "", order: 0 },
      }));
      fetchModules(roadmapId);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateModule = async (moduleId) => {
    try {
      await moduleAPI.updateModule(moduleId, editModuleData);
      setEditModuleId(null);
      setEditModuleData({ title: "", description: "" });
      const roadmapId = Object.keys(moduleLists).find((roadmapId) =>
        moduleLists[roadmapId]?.some((module) => module._id === moduleId),
      );
      if (roadmapId) {
        fetchModules(roadmapId);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await moduleAPI.deleteModule(moduleId);
      setModuleLists((prev) => {
        const updated = {};
        Object.entries(prev).forEach(([roadmapId, modules]) => {
          updated[roadmapId] = modules.filter(
            (module) => module._id !== moduleId,
          );
        });
        return updated;
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCreateTopic = async (moduleId) => {
    try {
      const form = topicForms[moduleId] || {
        title: "",
        description: "",
        videoUrl: "",
        resourceTitle: "",
        resourceUrl: "",
        order: 0,
      };
      const resources =
        form.resourceTitle && form.resourceUrl
          ? [{ title: form.resourceTitle, url: form.resourceUrl }]
          : [];
      await topicAPI.createTopic(moduleId, {
        title: form.title,
        description: form.description,
        videoUrl: form.videoUrl,
        resources,
        order: form.order,
      });
      setTopicForms((prev) => ({
        ...prev,
        [moduleId]: {
          title: "",
          description: "",
          videoUrl: "",
          resourceTitle: "",
          resourceUrl: "",
          order: 0,
        },
      }));
      fetchTopics(moduleId);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateTopic = async (topicId) => {
    try {
      const data = {
        title: editTopicData.title,
        description: editTopicData.description,
        videoUrl: editTopicData.videoUrl,
      };
      if (editTopicData.resourceTitle && editTopicData.resourceUrl) {
        data.resources = [
          {
            title: editTopicData.resourceTitle,
            url: editTopicData.resourceUrl,
          },
        ];
      }
      await topicAPI.updateTopic(topicId, data);
      setEditTopicId(null);
      setEditTopicData({
        title: "",
        description: "",
        videoUrl: "",
        resourceTitle: "",
        resourceUrl: "",
      });
      const moduleId = Object.keys(topicLists).find((id) =>
        topicLists[id]?.some((topic) => topic._id === topicId),
      );
      if (moduleId) fetchTopics(moduleId);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await topicAPI.deleteTopic(topicId);
      setTopicLists((prev) => {
        const updated = {};
        Object.entries(prev).forEach(([moduleId, topics]) => {
          updated[moduleId] = topics.filter((topic) => topic._id !== topicId);
        });
        return updated;
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const toggleRoadmap = (roadmapId) => {
    setExpandedRoadmaps((prev) => ({ ...prev, [roadmapId]: !prev[roadmapId] }));
    if (!expandedRoadmaps[roadmapId]) fetchModules(roadmapId);
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
    if (!expandedModules[moduleId]) fetchTopics(moduleId);
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading manager...</div>;
  }

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#f4f6fb" }}>
      <h1>Manage Roadmaps</h1>
      {error && (
        <div style={{ color: "#b00020", marginBottom: "20px" }}>{error}</div>
      )}

      <section
        style={{
          marginBottom: "32px",
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h2>Create New Roadmap</h2>
        <form onSubmit={handleCreateRoadmap}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Title
            </label>
            <input
              type="text"
              value={newRoadmap.title}
              onChange={(e) =>
                setNewRoadmap({ ...newRoadmap, title: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Description
            </label>
            <textarea
              value={newRoadmap.description}
              onChange={(e) =>
                setNewRoadmap({ ...newRoadmap, description: e.target.value })
              }
              required
              rows={3}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            style={{
              padding: "10px 18px",
              background: "#2a9d8f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Roadmap
          </button>
        </form>
      </section>

      {roadmaps.map((roadmap) => (
        <section
          key={roadmap._id}
          style={{
            marginBottom: "24px",
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              {editRoadmapId === roadmap._id ? (
                <div>
                  <input
                    type="text"
                    value={editRoadmapData.title}
                    onChange={(e) =>
                      setEditRoadmapData({
                        ...editRoadmapData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Title"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    value={editRoadmapData.description}
                    onChange={(e) =>
                      setEditRoadmapData({
                        ...editRoadmapData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                    rows={3}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleUpdateRoadmap(roadmap._id)}
                      style={{
                        padding: "10px 18px",
                        background: "#264653",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditRoadmapId(null)}
                      style={{
                        padding: "10px 18px",
                        background: "#e76f51",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 style={{ margin: 0 }}>{roadmap.title}</h2>
                  <p style={{ color: "#555", marginTop: "8px" }}>
                    {roadmap.description}
                  </p>
                </>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setEditRoadmapId(roadmap._id);
                  setEditRoadmapData({
                    title: roadmap.title,
                    description: roadmap.description,
                  });
                }}
                style={{
                  padding: "10px 18px",
                  background: "#2a9d8f",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRoadmap(roadmap._id)}
                style={{
                  padding: "10px 18px",
                  background: "#e63946",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => toggleRoadmap(roadmap._id)}
                style={{
                  padding: "10px 18px",
                  background: "#457b9d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {expandedRoadmaps[roadmap._id]
                  ? "Hide Modules"
                  : "Manage Modules"}
              </button>
            </div>
          </div>

          {expandedRoadmaps[roadmap._id] && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid #e9edf5",
              }}
            >
              <h3 style={{ marginBottom: "16px" }}>Modules</h3>

              <div
                style={{
                  marginBottom: "20px",
                  padding: "18px",
                  background: "#f8fafc",
                  borderRadius: "10px",
                }}
              >
                <h4 style={{ marginBottom: "12px" }}>Create Module</h4>
                <input
                  type="text"
                  placeholder="Module title"
                  value={moduleForms[roadmap._id]?.title || ""}
                  onChange={(e) =>
                    setModuleForms((prev) => ({
                      ...prev,
                      [roadmap._id]: {
                        ...(prev[roadmap._id] || { description: "", order: 0 }),
                        title: e.target.value,
                      },
                    }))
                  }
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <textarea
                  placeholder="Module description"
                  value={moduleForms[roadmap._id]?.description || ""}
                  onChange={(e) =>
                    setModuleForms((prev) => ({
                      ...prev,
                      [roadmap._id]: {
                        ...(prev[roadmap._id] || { title: "", order: 0 }),
                        description: e.target.value,
                      },
                    }))
                  }
                  rows={2}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() => handleCreateModule(roadmap._id)}
                  style={{
                    padding: "10px 18px",
                    background: "#2a9d8f",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Add Module
                </button>
              </div>

              {moduleLists[roadmap._id]?.map((module) => (
                <div
                  key={module._id}
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e9edf5",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {editModuleId === module._id ? (
                        <div>
                          <input
                            type="text"
                            value={editModuleData.title}
                            onChange={(e) =>
                              setEditModuleData({
                                ...editModuleData,
                                title: e.target.value,
                              })
                            }
                            placeholder="Module title"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <textarea
                            value={editModuleData.description}
                            onChange={(e) =>
                              setEditModuleData({
                                ...editModuleData,
                                description: e.target.value,
                              })
                            }
                            placeholder="Module description"
                            rows={2}
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => handleUpdateModule(module._id)}
                              style={{
                                padding: "10px 18px",
                                background: "#264653",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditModuleId(null)}
                              style={{
                                padding: "10px 18px",
                                background: "#e76f51",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 style={{ margin: 0 }}>{module.title}</h4>
                          <p style={{ color: "#555", marginTop: "8px" }}>
                            {module.description}
                          </p>
                        </>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <button
                        onClick={() => {
                          setEditModuleId(module._id);
                          setEditModuleData({
                            title: module.title,
                            description: module.description,
                          });
                        }}
                        style={{
                          padding: "10px 18px",
                          background: "#457b9d",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module._id)}
                        style={{
                          padding: "10px 18px",
                          background: "#e63946",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleModule(module._id)}
                        style={{
                          padding: "10px 18px",
                          background: "#2a9d8f",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {expandedModules[module._id]
                          ? "Hide Topics"
                          : "Manage Topics"}
                      </button>
                    </div>
                  </div>

                  {expandedModules[module._id] && (
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "18px",
                        background: "#f8fafc",
                        borderRadius: "10px",
                      }}
                    >
                      <h5 style={{ marginBottom: "14px" }}>Topics</h5>
                      <div style={{ marginBottom: "16px" }}>
                        <input
                          type="text"
                          placeholder="Topic title"
                          value={topicForms[module._id]?.title || ""}
                          onChange={(e) =>
                            setTopicForms((prev) => ({
                              ...prev,
                              [module._id]: {
                                ...(prev[module._id] || {
                                  description: "",
                                  videoUrl: "",
                                  resourceTitle: "",
                                  resourceUrl: "",
                                  order: 0,
                                }),
                                title: e.target.value,
                              },
                            }))
                          }
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Topic description"
                          value={topicForms[module._id]?.description || ""}
                          onChange={(e) =>
                            setTopicForms((prev) => ({
                              ...prev,
                              [module._id]: {
                                ...(prev[module._id] || {
                                  title: "",
                                  videoUrl: "",
                                  resourceTitle: "",
                                  resourceUrl: "",
                                  order: 0,
                                }),
                                description: e.target.value,
                              },
                            }))
                          }
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Video URL"
                          value={topicForms[module._id]?.videoUrl || ""}
                          onChange={(e) =>
                            setTopicForms((prev) => ({
                              ...prev,
                              [module._id]: {
                                ...(prev[module._id] || {
                                  title: "",
                                  description: "",
                                  resourceTitle: "",
                                  resourceUrl: "",
                                  order: 0,
                                }),
                                videoUrl: e.target.value,
                              },
                            }))
                          }
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Resource title"
                            value={topicForms[module._id]?.resourceTitle || ""}
                            onChange={(e) =>
                              setTopicForms((prev) => ({
                                ...prev,
                                [module._id]: {
                                  ...(prev[module._id] || {
                                    title: "",
                                    description: "",
                                    videoUrl: "",
                                    resourceUrl: "",
                                    order: 0,
                                  }),
                                  resourceTitle: e.target.value,
                                },
                              }))
                            }
                            style={{
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <input
                            type="url"
                            placeholder="Resource URL"
                            value={topicForms[module._id]?.resourceUrl || ""}
                            onChange={(e) =>
                              setTopicForms((prev) => ({
                                ...prev,
                                [module._id]: {
                                  ...(prev[module._id] || {
                                    title: "",
                                    description: "",
                                    videoUrl: "",
                                    resourceTitle: "",
                                    order: 0,
                                  }),
                                  resourceUrl: e.target.value,
                                },
                              }))
                            }
                            style={{
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                        </div>
                        <button
                          onClick={() => handleCreateTopic(module._id)}
                          style={{
                            padding: "10px 18px",
                            background: "#2a9d8f",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Add Topic
                        </button>
                      </div>

                      {topicLists[module._id]?.map((topic) => (
                        <div
                          key={topic._id}
                          style={{
                            marginBottom: "14px",
                            padding: "16px",
                            background: "white",
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "20px",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              {editTopicId === topic._id ? (
                                <div>
                                  <input
                                    type="text"
                                    value={editTopicData.title}
                                    onChange={(e) =>
                                      setEditTopicData({
                                        ...editTopicData,
                                        title: e.target.value,
                                      })
                                    }
                                    placeholder="Topic title"
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      padding: "10px",
                                      borderRadius: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                  <textarea
                                    rows={2}
                                    value={editTopicData.description}
                                    onChange={(e) =>
                                      setEditTopicData({
                                        ...editTopicData,
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="Topic description"
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      padding: "10px",
                                      borderRadius: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                  <input
                                    type="url"
                                    value={editTopicData.videoUrl}
                                    onChange={(e) =>
                                      setEditTopicData({
                                        ...editTopicData,
                                        videoUrl: e.target.value,
                                      })
                                    }
                                    placeholder="Video URL"
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      padding: "10px",
                                      borderRadius: "8px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "1fr 1fr",
                                      gap: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      value={editTopicData.resourceTitle}
                                      onChange={(e) =>
                                        setEditTopicData({
                                          ...editTopicData,
                                          resourceTitle: e.target.value,
                                        })
                                      }
                                      placeholder="Resource title"
                                      style={{
                                        padding: "10px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    />
                                    <input
                                      type="url"
                                      value={editTopicData.resourceUrl}
                                      onChange={(e) =>
                                        setEditTopicData({
                                          ...editTopicData,
                                          resourceUrl: e.target.value,
                                        })
                                      }
                                      placeholder="Resource URL"
                                      style={{
                                        padding: "10px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                      onClick={() =>
                                        handleUpdateTopic(topic._id)
                                      }
                                      style={{
                                        padding: "10px 18px",
                                        background: "#264653",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditTopicId(null)}
                                      style={{
                                        padding: "10px 18px",
                                        background: "#e76f51",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <h5 style={{ margin: 0 }}>{topic.title}</h5>
                                  <p
                                    style={{ color: "#555", marginTop: "8px" }}
                                  >
                                    {topic.description}
                                  </p>
                                  {topic.videoUrl && (
                                    <p
                                      style={{
                                        marginTop: "6px",
                                        color: "#555",
                                      }}
                                    >
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
                                </>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setEditTopicId(topic._id);
                                  setEditTopicData({
                                    title: topic.title,
                                    description: topic.description || "",
                                    videoUrl: topic.videoUrl || "",
                                    resourceTitle:
                                      topic.resources?.[0]?.title || "",
                                    resourceUrl:
                                      topic.resources?.[0]?.url || "",
                                  });
                                }}
                                style={{
                                  padding: "10px 18px",
                                  background: "#457b9d",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTopic(topic._id)}
                                style={{
                                  padding: "10px 18px",
                                  background: "#e63946",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default ManageRoadmapsPage;
