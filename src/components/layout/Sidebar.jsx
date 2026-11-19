import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Users,
  FileText,
  CalendarDays,
  Settings,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { name: "Audience", path: "/audience", icon: Users },
  { name: "Posts", path: "/posts", icon: FileText },
  { name: "Calendar", path: "/calendar", icon: CalendarDays },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <Sparkles size={28} />
        <span>SocialPulse</span>
      </div>

      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-avatar">SP</div>
        <div>
          <strong>SocialPulse</strong>
          <p>Admin Workspace</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;