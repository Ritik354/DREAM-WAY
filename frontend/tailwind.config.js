export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#1e293b",
        primary: "#6366f1",
        accent: "#22c55e",
        text: "#e2e8f0",
        muted: "#94a3b8",
      },
      boxShadow: {
        soft: "0 25px 80px rgba(15, 23, 42, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
