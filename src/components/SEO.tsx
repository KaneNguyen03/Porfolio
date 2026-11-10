import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";

export type SEOProps = {
	title?: string;
	description?: string;
	imagePath?: string;
	noIndex?: boolean;
};

const normalizeSiteUrl = (url: string): string => url.replace(/\/+$/, "");

const joinUrl = (base: string, path: string): string => {
	const normalizedBase = normalizeSiteUrl(base);
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${normalizedBase}${normalizedPath}`;
};

const getSiteUrl = (): string | null => {
	const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
	if (envUrl && envUrl.trim().length > 0) return normalizeSiteUrl(envUrl.trim());
	// No window.location fallback on purpose: a preview deployment must not
	// self-canonicalise and compete with the production domain.
	return null;
};

const getGithubHandle = (githubUrl: string | undefined): string | null => {
	if (!githubUrl) return null;
	try {
		const url = new URL(githubUrl);
		if (!/github\.com$/i.test(url.hostname)) return null;
		const handle = url.pathname.split("/").filter(Boolean)[0];
		return handle && handle.length > 0 ? handle : null;
	} catch {
		return null;
	}
};

const makeTitle = (pageTitle: string | undefined, name: string, handle?: string | null): string => {
	const suffix = handle ? `${name} (${handle})` : name;
	if (!pageTitle || pageTitle.trim().length === 0) return `${suffix} - Software Engineer Portfolio`;
	return `${pageTitle} | ${suffix}`;
};

// ---- imperative <head> helpers -------------------------------------------
// react-helmet-async does not support React 19, so tags are written directly.
// Existing tags (from index.html) are updated in place, which also keeps a
// single instance of each meta for crawlers.

const upsertMeta = (attr: "name" | "property", key: string, content: string | undefined) => {
	const selector = `meta[${attr}="${key}"]`;
	let el = document.head.querySelector<HTMLMetaElement>(selector);
	if (!content) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string | undefined) => {
	let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
	if (!href) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", rel);
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
};

const upsertJsonLd = (id: string, data: object) => {
	let el = document.getElementById(id) as HTMLScriptElement | null;
	if (!el) {
		el = document.createElement("script");
		el.id = id;
		el.type = "application/ld+json";
		document.head.appendChild(el);
	}
	// "<" escaped so the payload can never close the script element.
	el.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
};

const SEO = ({ title, description, imagePath = "/og-image.jpg", noIndex }: SEOProps) => {
	const location = useLocation();
	const { personalInfo, certifications, education, skills } = usePortfolioData();
	const { t, language } = useTranslation();

	const githubHandle = getGithubHandle(personalInfo.github);
	const siteUrl = getSiteUrl();
	const canonicalUrl = siteUrl ? joinUrl(siteUrl, location.pathname) : undefined;
	const absoluteImageUrl = siteUrl ? joinUrl(siteUrl, imagePath) : undefined;

	const fullTitle = makeTitle(title, personalInfo.name, githubHandle);
	const fullDescription = description && description.trim().length > 0 ? description : t.seo.defaultDescription;

	useEffect(() => {
		document.title = fullTitle;

		const keywords = [
			personalInfo.name,
			githubHandle,
			personalInfo.title,
			"Software Engineer",
			"Fullstack",
			"Backend",
			"Node.js",
			"TypeScript",
			"React",
			"AWS Certified Solutions Architect",
			"Portfolio",
		]
			.filter(Boolean)
			.join(", ");

		upsertMeta("name", "title", fullTitle);
		upsertMeta("name", "description", fullDescription);
		upsertMeta("name", "keywords", keywords);
		upsertMeta("name", "author", personalInfo.name);
		upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

		upsertLink("canonical", canonicalUrl);

		upsertMeta("property", "og:type", "website");
		upsertMeta("property", "og:title", fullTitle);
		upsertMeta("property", "og:description", fullDescription);
		upsertMeta("property", "og:locale", language === "vi" ? "vi_VN" : "en_US");
		upsertMeta("property", "og:locale:alternate", language === "vi" ? "en_US" : "vi_VN");
		if (canonicalUrl) upsertMeta("property", "og:url", canonicalUrl);
		if (absoluteImageUrl) upsertMeta("property", "og:image", absoluteImageUrl);

		upsertMeta("name", "twitter:card", "summary_large_image");
		upsertMeta("name", "twitter:title", fullTitle);
		upsertMeta("name", "twitter:description", fullDescription);
		if (canonicalUrl) upsertMeta("name", "twitter:url", canonicalUrl);
		if (absoluteImageUrl) upsertMeta("name", "twitter:image", absoluteImageUrl);

		upsertJsonLd("ld-person", {
			"@context": "https://schema.org",
			"@type": "Person",
			name: personalInfo.name,
			alternateName: githubHandle ? [githubHandle] : undefined,
			jobTitle: personalInfo.title,
			description: fullDescription,
			url: siteUrl ?? undefined,
			image: absoluteImageUrl,
			email: `mailto:${personalInfo.email}`,
			sameAs: [personalInfo.github, personalInfo.linkedin].filter(Boolean),
			address: { "@type": "PostalAddress", addressLocality: "Ho Chi Minh City", addressCountry: "VN" },
			alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
			knowsAbout: [...skills.programmingLanguages, ...skills.backend, ...skills.frontend, ...skills.devops].slice(0, 16),
			hasCredential: certifications.map((c) => ({
				"@type": "EducationalOccupationalCredential",
				name: c.name,
				credentialCategory: c.type,
				url: c.url,
				recognizedBy: { "@type": "Organization", name: c.issuer },
			})),
		});
	}, [
		fullTitle,
		fullDescription,
		canonicalUrl,
		absoluteImageUrl,
		siteUrl,
		noIndex,
		language,
		githubHandle,
		personalInfo,
		certifications,
		education,
		skills,
	]);

	return null;
};

export default SEO;
