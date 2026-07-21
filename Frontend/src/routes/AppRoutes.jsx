import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Analytics from "../pages/Analytics";
import Resume from "../pages/Resume";

const RoutesWrapper = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* ✅ HOME FIRST */}
      <Route
        path="/"
        element={
          <Home navigateToDashboard={() => navigate("/dashboard")} />
        }
      />

      {/* ✅ DASHBOARD WITH LAYOUT */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RoutesWrapper />
      
    </BrowserRouter>
  );
};

export default AppRoutes;