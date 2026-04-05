import API from "./api.js";

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
  logout: () => {
    localStorage.removeItem("token");
  },
};

export const roadmapAPI = {
  getRoadmaps: () => API.get("/roadmaps"),
  createRoadmap: (data) => API.post("/roadmaps", data),
  getRoadmap: (id) => API.get(`/roadmaps/${id}`),
  updateRoadmap: (id, data) => API.put(`/roadmaps/${id}`, data),
  deleteRoadmap: (id) => API.delete(`/roadmaps/${id}`),
};

export const moduleAPI = {
  getModules: (roadmapId) => API.get(`/roadmaps/${roadmapId}/modules`),
  createModule: (roadmapId, data) =>
    API.post(`/roadmaps/${roadmapId}/modules`, data),
  updateModule: (id, data) => API.put(`/modules/${id}`, data),
  deleteModule: (id) => API.delete(`/modules/${id}`),
};

export const topicAPI = {
  getTopics: (moduleId) => API.get(`/modules/${moduleId}/topics`),
  createTopic: (moduleId, data) =>
    API.post(`/modules/${moduleId}/topics`, data),
  updateTopic: (id, data) => API.put(`/topics/${id}`, data),
  deleteTopic: (id) => API.delete(`/topics/${id}`),
};

export const progressAPI = {
  updateProgress: (data) => API.post("/progress/update", data),
  getProgress: () => API.get("/progress/user"),
};
