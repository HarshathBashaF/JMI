export const filterJobs = (jobs, search) => {
  if (!search) return jobs;

  return jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase())
  );
};