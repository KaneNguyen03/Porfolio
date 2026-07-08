"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Skeleton } from "./ui/skeleton";

interface MermaidDiagramProps {
	/** Mermaid flowchart definition, already localized. */
	definition: string;
	/** Stable, language-invariant DOM id — mermaid.render() requires a unique
	 * id per instance. Must be derived from something that doesn't change
	 * across language toggles (e.g. `arch-diagram-${post.slug}`), never from
	 * translated text. */
	id: string;
	/** Rendered if the definition fails to parse. */
	fallback: ReactNode;
}

// Brand-matched theme variables (indigo-500 -> sky-500), mirroring the
// gradient already used throughout the site (see HeroBackground.tsx's
// #hero-edge-grad stops). Mermaid only exposes themeVariables customization
// under theme: "base" — its built-in "default"/"dark" themes are not
// customizable this way.
const lightThemeVariables = {
	darkMode: false,
	background: "#f8fafc",
	primaryColor: "#eef2ff",
	primaryTextColor: "#1e293b",
	primaryBorderColor: "#6366f1",
	lineColor: "#38bdf8",
	secondaryColor: "#e0f2fe",
	tertiaryColor: "#f1f5f9",
	fontFamily: "inherit",
};

const darkThemeVariables = {
	darkMode: true,
	background: "#0f172a",
	primaryColor: "#1e1b4b",
	primaryTextColor: "#e2e8f0",
	primaryBorderColor: "#818cf8",
	lineColor: "#38bdf8",
	secondaryColor: "#0c4a6e",
	tertiaryColor: "#1e293b",
	fontFamily: "inherit",
};

type Status = "loading" | "ready" | "error";

const MermaidDiagram = ({ definition, id, fallback }: MermaidDiagramProps) => {
	const { theme } = useTheme();
	// No definition is a known, immediate state — not something an effect
	// needs to discover asynchronously, so it's derived in the initializer
	// rather than set via a synchronous setState call inside an effect.
	const [status, setStatus] = useState<Status>(definition ? "loading" : "error");
	const [svg, setSvg] = useState<string | null>(null);

	useEffect(() => {
		if (!definition) return;

		let cancelled = false;

		const renderDiagram = async () => {
			setStatus("loading");
			try {
				const { default: mermaid } = await import("mermaid");
				mermaid.initialize({
					startOnLoad: false,
					theme: "base",
					themeVariables: theme === "dark" ? darkThemeVariables : lightThemeVariables,
					fontFamily: "inherit",
					securityLevel: "strict",
				});

				const { svg: renderedSvg } = await mermaid.render(id, definition);
				if (!cancelled) {
					setSvg(renderedSvg);
					setStatus("ready");
				}
			} catch {
				if (!cancelled) setStatus("error");
			}
		};

		renderDiagram();

		return () => {
			cancelled = true;
		};
	}, [definition, theme, id]);

	if (status === "loading") {
		return <Skeleton className="h-64 w-full rounded-2xl" />;
	}

	if (status === "error" || !svg) {
		return <>{fallback}</>;
	}

	return (
		<div
			className="mermaid-diagram-container overflow-x-auto rounded-2xl bg-slate-50 dark:bg-slate-950 p-4 [&_svg]:mx-auto"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: diagram source is first-party content authored in blog.en.ts/blog.vi.ts, never user input
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
};

export default MermaidDiagram;
