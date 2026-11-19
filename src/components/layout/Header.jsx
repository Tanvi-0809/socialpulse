import { Bell, Search, ChevronDown } from "lucide-react";

function Header() {
  return (
    <header className="top-header">
      <div className="header-search">
        <Search size={19} />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="header-actions">
        <span className="header-date">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="header-profile">
          <div className="small-avatar">SP</div>
          <span>Admin</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Header;