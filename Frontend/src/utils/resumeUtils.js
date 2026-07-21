export const KNOWN_SKILLS = [
  "react", "angular", "vue", "next.js", "nuxt", "html", "css", "javascript", "typescript", "tailwind", "bootstrap",
  "node", "node.js", "express", "nestjs", "spring", "django", "flask", "laravel", "php", "ruby on rails",
  "java", "python", "c++", "c#", "go", "rust", "kotlin", "swift",
  "mysql", "postgresql", "mongodb", "redis", "firebase", "oracle",
  "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "github actions", "terraform",
  "git", "github", "gitlab", "jira", "figma", "postman",
  "ai", "machine learning", "deep learning", "data science", "pandas", "numpy", "tensorflow", "pytorch",
  "react native", "flutter", "android", "ios",
  "jest", "mocha", "cypress", "selenium",
  "rest api", "graphql", "microservices", "linux", "xml", "json", "seo"
];

// Extract skills from a given text (resume or job description)
export const parseSkillsFromText = (text) => {
  if (!text || typeof text !== "string") return [];
  const lowerText = text.toLowerCase();
  
  const foundSkills = KNOWN_SKILLS.filter(skill => {
    // Simple word boundary check (basic implementation)
    // To handle dots like "node.js", we escape them
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?:^|\\s|\\W)${escaped}(?:$|\\s|\\W)`, 'i');
    return regex.test(lowerText);
  });
  
  return foundSkills;
};

// Extract all unique skills from an array of job objects
export const getSkillsFromJobs = (jobs) => {
  const allSkills = new Set();
  jobs.forEach(job => {
    const jobSkills = parseSkillsFromText(job.description || "");
    jobSkills.forEach(s => allSkills.add(s));
  });
  return Array.from(allSkills);
};
