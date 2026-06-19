import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";
import JobCard from "../features/jobs/JobCard";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const Jobs = () => {
  const { jobs, loading, error } = useJobs();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");

  // 🔥 Extract unique locations
  const locations = useMemo(() => {
    const set = new Set();
    jobs.forEach(j => {
      if (j.locations) set.add(j.locations.split(",")[0]);
    });
    return [...set];
  }, [jobs]);

  // 🔥 Filter logic (PRO)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.description}`.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (location ? job.locations?.includes(location) : true) &&
        (skill ? job.description?.toLowerCase().includes(skill.toLowerCase()) : true)
      );
    });
  }, [jobs, search, location, skill]);

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-6 rounded-2xl mb-6 shadow">
        <h1 className="text-2xl md:text-3xl font-bold">
          Find Your Dream Job 
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Search, filter and explore opportunities
        </p>

        {/* 🔍 SEARCH */}
        <div className="mt-4 flex items-center bg-white rounded-xl px-4 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 w-full outline-none text-gray-800"
          />
        </div>

        {/* 🎯 FILTERS */}
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          
          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded-lg text-gray-800"
          >
            <option value="">All Locations</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Skill */}
          <input
            type="text"
            placeholder="Filter by skill (React, Python...)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="p-2 rounded-lg text-gray-800"
          />

          {/* Clear */}
          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setSkill("");
            }}
            className="bg-white text-green-600 font-medium rounded-lg"
          >
            Clear Filters
          </button>

        </div>
      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading jobs...</p>
      )}

      {/* ❌ ERROR */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* 📊 RESULT COUNT */}
      {!loading && !error && (
        <p className="mb-4 text-sm text-gray-500">
          Showing {filteredJobs.length} jobs
        </p>
      )}

      {/* ✅ JOB GRID */}
      {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="text-gray-500">No jobs found</p>
          )}
        </div>
      )}

    </Layout>
  );
};

export default Jobs;