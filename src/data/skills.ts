import type { PortfolioData } from "../types/portfolio";

// Skills are 100% proper nouns / technology names — identical in both
// locales, so both portfolio.en.ts and portfolio.vi.ts import this single
// source instead of duplicating an identical block.
export const skills: PortfolioData["skills"] = {
	programmingLanguages: ["TypeScript", "JavaScript (ES6+)", "C#", "Go"],
	frontend: ["React.js", "Next.js", "React Query", "Tailwind CSS", "Redux", "Zustand"],
	backend: ["Node.js", "NestJS", "Express.js", "GraphQL", "REST APIs", "Microservices"],
	databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
	devops: ["Docker", "Nginx", "AWS", "Grafana", "Prometheus", "Git"],
	vcs: ["Git", "GitHub", "GitLab"],
	architecture: ["CQRS", "Saga Pattern", "Clean Architecture", "SOLID", "DDD"],
};
