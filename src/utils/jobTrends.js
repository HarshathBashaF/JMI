export const extractJobTrends = (jobs) => {
  const map = {};

  jobs.forEach((job) => {
    // assume job has date or fallback
    const date = job.created || new Date().toISOString();

    const day = new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    map[day] = (map[day] || 0) + 1;
  });

  return Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));
};