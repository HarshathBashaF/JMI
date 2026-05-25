// import { useJobs } from "./src/ContexApi/JobContext";

// const Job = () => {
//   const { jobs, loading, error } = useJobs();

//   return (
//     <div>
//       <h1>Jobs List</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {jobs.map((job, index) => (
//         <div
//           key={index}
//           style={{
//             border: "2px solid black",
//             margin: "10px",
//             padding: "10px",
//           }}
//         >
//           <h3>{job.title}</h3>
//           <p>{job.company}</p>
//           <p>{job.locations}</p>

//           <a href={job.url} target="_blank" rel="noreferrer">
//             Apply
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Job;



// contecx

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const JobContext = createContext();

// export const JobProvider = ({ children }) => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/jobs");
//       setJobs(res.data.jobs);
//     } catch (err) {
//       setError("Failed to load jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return (
//     <JobContext.Provider value={{ jobs, loading, error }}>
//       {children}
//     </JobContext.Provider>
//   );
// };

// // custom hook (important 🔥)
// export const useJobs = () => useContext(JobContext);