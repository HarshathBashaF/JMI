import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";
import { useMemo } from "react";
import SkillChart from "../features/analytics/SkillChart";
import LocationChart from "../features/analytics/LocationChart";
import { extractSkills } from "../utils/skillExtractor";
import { extractLocations } from "../utils/locationExtractor";

const Analytics = () => {
  const { jobs, loading, error } = useJobs();

  // 🔥 Compute analytics (optimized)
  const skillData = useMemo(() => extractSkills(jobs), [jobs]);
  const locationData = useMemo(() => extractLocations(jobs), [jobs]);

  const topSkill = skillData[0];
  const topLocation = locationData[0];

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className=" bg-gradient-to-b from-green-900 to-gray-900 border-r border-green-500/20 z-50 text-white p-6 rounded-2xl mb-6 shadow">
        <h1 className="text-2xl md:text-3xl font-bold">
          Job Market Analytics 
        </h1>
        <p className="text-sm mt-1 opacity-90">
          Insights from real-time job data
        </p>
      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Analyzing data...</p>
      )}

      {/* ❌ ERROR */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* ✅ ANALYTICS */}
      {!loading && !error && (
        <>
          {/* 🔹 SUMMARY CARDS */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Real Data</p>
              <h2 className="text-2xl font-bold text-green-600">
                Live
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Top Skill</p>
              <h2 className="text-xl font-bold text-green-600">
                {topSkill?.name || "N/A"}
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Top Location</p>
              <h2 className="text-xl font-bold text-green-600">
                {topLocation?.name || "N/A"}
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Insights</p>
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                High demand for {topSkill?.name} developers 🚀
              </h2>
            </div>

          </div>

          {/* 🔹 CHARTS */}
          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* Skill Chart */}
            <SkillChart data={skillData} />

            {/* Location Chart */}
            <LocationChart data={locationData} />

          </div>
        </>
      )}

    </Layout>
  );
};

export default Analytics;