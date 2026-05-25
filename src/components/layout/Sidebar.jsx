import { Home, Briefcase, BarChart3, ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-900 to-gray-900 border-r border-green-500/20 z-50 transform transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* 🔥 HEADER (TOP ALIGNED PERFECT) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-green-500/10">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/JMI.jpeg"
            alt="logo"
            className="w-10 h-10 object-cover rounded-lg"
          />
          <h1 className="text-lg font-bold text-green-400 tracking-wide">
            JobInsight
          </h1>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-green-400 transition"
        >
          <ChevronLeft />
        </button>
      </div>

      {/* 🔥 NAVIGATION */}
      <nav className="flex flex-col gap-2 px-3 mt-6">

        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-green-500/10 text-green-400 border-l-4 border-green-400"
                    : "text-gray-400 hover:bg-green-500/5 hover:text-green-400"
                }`
              }
            >
              <Icon
                size={20}
                className="group-hover:scale-110 transition"
              />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default Sidebar;