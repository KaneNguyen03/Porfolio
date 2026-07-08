export interface ArchitectureComponent {
	name: string;
	description: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	excerpt: string;
	overview: string;
	architecture: {
		summary: string;
		components: ArchitectureComponent[];
		/** Mermaid flowchart definition, per-language. Omitted for posts where a
		 * system diagram doesn't fit the content (e.g. conceptual/craft posts) —
		 * those fall back to rendering `components` as a plain list. */
		diagram?: string;
	};
	implementation: string[];
	results: string[];
}
