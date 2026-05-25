export const extractAverageSalary = (jobs) => {
  const salaries = [];

  jobs.forEach((job) => {
    const text = `${job.title} ${job.description || ""}`;

    // 🔍 Match salary patterns like: 50000, 50k, 10 LPA
    const matches = text.match(/(\d{2,6})(k|lpa)?/gi);

    if (matches) {
      matches.forEach((match) => {
        let value = match.toLowerCase();

        if (value.includes("k")) {
          value = parseInt(value) * 1000;
        } else if (value.includes("lpa")) {
          value = parseInt(value) * 100000;
        } else {
          value = parseInt(value);
        }

        if (!isNaN(value) && value > 1000) {
          salaries.push(value);
        }
      });
    }
  });

  if (salaries.length === 0) return null;

  const avg =
    salaries.reduce((acc, val) => acc + val, 0) / salaries.length;

  return Math.round(avg);
};