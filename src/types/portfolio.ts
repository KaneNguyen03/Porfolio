export interface PersonalInfo {
	name: string;
	title: string;
	phone: string;
	email: string;
	location: string;
	github: string;
	linkedin: string;
	/** Short hero line (1–2 sentences). `objective` stays the long About/SEO copy. */
	tagline: string;
	objective: string;
}

export interface Education {
	period: string;
	degree: string;
	institution: string;
	gpa?: string;
	honors?: string;
	/** Still studying — rendered with an "in progress" marker. */
	inProgress?: boolean;
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

export type CertificationType = "certification" | "specialization" | "professional" | "course";

export interface Certification {
	/** Official certificate title (kept in English — it is what the credential says). */
	name: string;
	/** Localized one-line description of what the credential covers. */
	summary: string;
	/** Issuing university / organization. */
	issuer: string;
	/** Short monogram used for the issuer avatar (e.g. "UM"). */
	issuerShort: string;
	/** Platform that hosts the credential (e.g. "Coursera"). */
	platform: string;
	type: CertificationType;
	date: string;
	url: string;
	skills: string[];
	/** Headline credential — gets the glowing "featured" treatment. */
	featured?: boolean;
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
