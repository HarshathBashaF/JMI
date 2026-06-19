import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";
import { extractSkills } from "../utils/skillExtractor";
import { extractLocations } from "../utils/locationExtractor";
import SkillChart from "../features/analytics/SkillChart";
import LocationChart from "../features/analytics/LocationChart";
import JobCard from "../features/jobs/JobCard";
import { useMemo } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { jobs, loading, error } = useJobs();

  const skillData = useMemo(() => extractSkills(jobs), [jobs]);
  const locationData = useMemo(() => extractLocations(jobs), [jobs]);

  if (loading) {
  return (
    <Layout>
      <div className="space-y-6 animate-pulse">

        {/* Header Skeleton */}
        <div className="h-8 w-48 bg-gray-700 rounded"></div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-800 rounded-2xl border border-green-500/10"
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-800 rounded-2xl" />
          <div className="h-64 bg-gray-800 rounded-2xl" />
        </div>

        {/* Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-800 rounded-2xl"
            />
          ))}
        </div>

      </div>
    </Layout>
  );
}

  if (error) {
    return (
      <Layout>
        <div className="text-center py-20 text-red-500">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-8">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-black">
          Dashboard
        </h1>

        {/* ✅ LIVE BADGE */}
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          Live
        </div>

      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500">Top Skill</p>
          <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-white">
            {skillData[0]?.name || "N/A"}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500">Top Location</p>
          <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-white">
            {locationData[0]?.name || "N/A"}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500">Market Status</p>
          <h2 className="text-xl font-semibold mt-2 text-green-600">
            Active Hiring
          </h2>
        </motion.div>

      </div>

      {/* 🔥 CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
        <SkillChart data={skillData} />
        <LocationChart data={locationData} />
      </div>

      {/* 🔥 JOBS SECTION */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-800">
          Latest Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;