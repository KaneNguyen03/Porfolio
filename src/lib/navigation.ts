import type { Strings } from "../i18n/strings";

export interface NavItem {
	path: string;
	key: keyof Strings["nav"];
}

// Shared between Header and Footer so route paths never depend on a
// translated display label (translating "About" to "Giới thiệu" must not
// break the /about route).
export const NAV_ITEMS: NavItem[] = [
	{ path: "/", key: "home" },
	{ path: "/about", key: "about" },
	{ path: "/projects", key: "projects" },
	{ path: "/experience", key: "experience" },
	{ path: "/education", key: "education" },
	{ path: "/contact", key: "contact" },
];
