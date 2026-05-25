import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://backend-6o6o.onrender.com/jobs");

      setJobs(res.data?.jobs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        refetch: fetchJobs // 🔥 retry support
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

// custom hook 🔥
export const useJobs = () => useContext(JobContext);