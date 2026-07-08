import { useLanguage } from "../contexts/LanguageContext";
import type { BlogPost } from "../types/blog";
import { blogPostsEn } from "./blog.en";
import { blogPostsVi } from "./blog.vi";

export const useBlogPosts = (): BlogPost[] => {
	const { language } = useLanguage();
	return language === "vi" ? blogPostsVi : blogPostsEn;
};

export const useBlogPost = (slug: string): BlogPost | undefined => {
	const posts = useBlogPosts();
	return posts.find((p) => p.slug === slug);
};
