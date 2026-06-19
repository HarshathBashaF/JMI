export const extractLocations = (jobs) => {
  const map = {};

  jobs.forEach((job) => {
    let loc = job.locations || "Unknown";

    // 🔥 Normalize (clean data)
    loc = loc.toLowerCase();

    // Take only main city (before comma)
    loc = loc.split(",")[0].trim();

    // Capitalize first letter
    loc = loc.charAt(0).toUpperCase() + loc.slice(1);

    // Count
    map[loc] = (map[loc] || 0) + 1;
  });

  // Convert → sort → top 6
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value) // 🔥 highest first
    .slice(0, 6); // 🔥 top locations only
};