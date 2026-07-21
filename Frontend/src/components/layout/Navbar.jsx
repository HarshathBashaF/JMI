import { Menu, Home, Briefcase, BarChart3, FileText } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Jobs", path: "/jobs", icon: Briefcase },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Resume", path: "/resume", icon: FileText },
];

const Navbar = ({ setOpen }) => {
  const location = useLocation();

  return (
    <header className="flex items-center h-16 px-6  bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white shadow sticky top-0 z-40 backdrop-blur-md">
      
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <h1 className="text-lg font-bold tracking-wide">
          Job Market Intelligence
        </h1>
      </div>

      {/* RIGHT NAV */}
      <nav className="flex items-center gap-6 relative">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="relative flex items-center gap-2 px-3 py-2"
            >
              {/* 🔥 ACTIVE BACKGROUND ANIMATION */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              {/* ICON + TEXT */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 relative z-10"
              >
                <Icon size={18} />
                <span className="hidden md:block">{item.name}</span>
              </motion.div>
            </NavLink>
          );
        })}

      </nav>
    </header>
  );
};

export default Navbar;