export const authUtils = {
  setToken: (token) => localStorage.setItem("token", token),
  getToken: () => localStorage.getItem("token"),
  removeToken: () => localStorage.removeItem("token"),
  logout: () => localStorage.removeItem("token"),
  isAuthenticated: () => !!localStorage.getItem("token"),
};

export const storageUtils = {
  Set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  Get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  Remove: (key) => localStorage.removeItem(key),
};
