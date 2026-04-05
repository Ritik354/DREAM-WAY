import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { authAPI } from "../../services/endpoints.js";
import { authUtils } from "../../utils/storage.js";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.data);
      } catch (error) {
        authUtils.logout();
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authUtils.logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-surface/85 px-4 py-3 shadow-soft max-w-md">
          <Search className="h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search learning paths..."
            className="w-full bg-transparent text-text placeholder:text-muted outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-surface/95 text-muted transition duration-200 hover:bg-[#111827] hover:text-text">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-2 ring-background" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 rounded-3xl border border-white/10 bg-surface/95 px-4 py-3 shadow-soft hover:bg-[#111827] transition duration-200"
            >
              <div className="grid h-10 w-10 place-items-center rounded-3xl bg-gradient-to-br from-[#6366f1] to-[#22c55e] text-sm font-semibold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="hidden min-w-0 flex-col sm:flex">
                <span className="truncate text-sm font-semibold text-text">
                  {user?.name || "User"}
                </span>
                <span className="truncate text-sm text-muted">
                  Premium learner
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-soft py-2 z-30">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-text">
                    {user?.name}
                  </p>
                  <p className="text-sm text-muted">{user?.email}</p>
                </div>
                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-text transition duration-200">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-text transition duration-200">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted hover:bg-red-500/10 hover:text-red-400 transition duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
