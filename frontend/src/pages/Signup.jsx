import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/endpoints.js";
import { authUtils } from "../utils/storage.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await authAPI.register(form);
      authUtils.setToken(response.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-text">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
            Create account
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Become a premium learner
          </h1>
          <p className="text-sm leading-7 text-muted">
            Sign up and start exploring curated roadmaps and guided learning
            paths.
          </p>
        </div>

        <Card className="space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#cbd5e1]">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Ritik "
                className="w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-text outline-none transition duration-200 focus:border-[#6366f1]"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#cbd5e1]">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-text outline-none transition duration-200 focus:border-[#6366f1]"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#cbd5e1]">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-text outline-none transition duration-200 focus:border-[#6366f1]"
                required
              />
            </div>

            {error && <p className="text-sm text-[#f87171]">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#6366f1] hover:text-[#5859d9]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
