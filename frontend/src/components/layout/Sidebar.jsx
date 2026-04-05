import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Layers,
  BookOpen,
  Bookmark,
  FileText,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { authUtils } from "../../utils/storage.js";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Roadmaps", icon: Layers, path: "/roadmaps" },
  { label: "Courses", icon: BookOpen, path: "/courses" },
  { label: "Bookmarks", icon: Bookmark, path: "/bookmarks" },
  { label: "Notes", icon: FileText, path: "/notes" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.logout();
    navigate("/login");
  };

  return (
    <aside
      className={`flex h-screen flex-col justify-between border-r border-white/10 bg-surface/95 px-4 py-5 transition-all duration-300 backdrop-blur-xl ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#22c55e] text-sm font-semibold text-white shadow-soft">
            DW
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
                Dream Way
              </p>
              <p className="text-xl font-semibold text-text">Learning</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm transition duration-200 ${
                    isActive
                      ? "bg-[#2f3654] text-white shadow-soft"
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }`
                }
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 text-[#a5b4fc] transition duration-200 group-hover:bg-[#6366f1]/10 group-hover:text-[#6366f1]">
                  <Icon className="h-5 w-5" />
                </span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setCollapsed((state) => !state)}
          className="group inline-flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-muted transition duration-200 hover:border-[#6366f1] hover:text-text"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 text-[#6366f1] transition duration-200 group-hover:bg-[#6366f1]/10">
            {collapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </span>
          {!collapsed && <span>Collapse sidebar</span>}
        </button>

        <button
          onClick={handleLogout}
          className="group inline-flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-red-500/10 px-4 py-3 text-sm text-red-400 transition duration-200 hover:bg-red-500/20 hover:border-red-500/30"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 transition duration-200 group-hover:bg-red-500/20">
            <LogOut className="h-5 w-5" />
          </span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
