export const extractSkills = (jobs) => {
  const skills =[
  // Frontend
  "react", "angular", "vue", "next.js", "nuxt", "html", "css", "javascript", "typescript", "tailwind", "bootstrap",

  // Backend
  "node", "node.js", "express", "nestjs", "spring", "django", "flask", "laravel", "php", "ruby on rails",

  // Programming Languages
  "java", "python", "c++", "c#", "go", "rust", "kotlin", "swift",

  // Database
  "mysql", "postgresql", "mongodb", "redis", "firebase", "oracle",

  // Cloud / DevOps
  "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "github actions", "terraform",

  // Tools
  "git", "github", "gitlab", "jira", "figma", "postman",

  // Data / AI
    "AI ", "machine learning", "deep learning", "data science", "pandas", "numpy", "tensorflow", "pytorch",

  // Mobile
  "react native", "flutter", "android", "ios",

  // Testing
  "jest", "mocha", "cypress", "selenium",

  // Others
  "rest api", "graphql", "microservices", "linux"
];

  const count = {};

  jobs.forEach((job) => {
    const desc = job.description?.toLowerCase() || "";

    skills.forEach((skill) => {
      if (desc.includes(skill)) {
        count[skill] = (count[skill] || 0) + 1;
      }
    });
  });

  return Object.entries(count)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};