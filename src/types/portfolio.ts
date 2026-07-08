export interface PersonalInfo {
	name: string;
	title: string;
	phone: string;
	email: string;
	location: string;
	github: string;
	linkedin: string;
	objective: string;
}

export interface Education {
	period: string;
	degree: string;
	institution: string;
	gpa?: string;
	honors?: string;
}

export interface WorkExperience {
	company: string;
	period: string;
	position: string;
	responsibilities: string[];
	clients?: string[];
	highlights?: string[];
}

export interface Project {
	name: string;
	period: string;
	role: string;
	technologies: string[];
	responsibilities: string[];
	liveDemo?: string;
	github?: string;
	image?: string;
}

export interface Certification {
	name: string;
	date: string;
	url: string;
}

export interface Award {
	name: string;
	period: string;
	role?: string; // Added optional role if needed for compatibility
}

export interface Reference {
	name: string;
	position: string;
	email: string;
}

export interface PortfolioData {
	personalInfo: PersonalInfo;
	education: Education[];
	workExperience: WorkExperience[];
	projects: Project[];
	skills: {
		programmingLanguages: string[];
		frontend: string[];
		backend: string[];
		databases: string[];
		devops: string[];
		vcs: string[];
		architecture: string[];
	};
	certifications: Certification[];
	awards: Award[];
	references: Reference[];
}
