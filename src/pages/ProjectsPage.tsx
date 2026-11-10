"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github, Network, Play } from "lucide-react";
import { memo, useState } from "react";
import ArchitectureModal from "../components/ArchitectureModal";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION } from "../lib/motion";
import type { Project } from "../types/portfolio";

// Deterministic uneven "bento" rhythm applied after the full-width hero card
// (index 0). Index-driven, not content-driven, so it never jumps unpredictably.
const BENTO_REST_PATTERN = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4"];

function getBentoSpanClass(i: number, isAllView: boolean): string {
  if (!isAllView) return "lg:col-span-3"; // uniform 2-up when filtered
  if (i === 0) return "md:col-span-2 lg:col-span-6"; // hero/featured
  return `md:col-span-1 ${BENTO_REST_PATTERN[(i - 1) % BENTO_REST_PATTERN.length]}`;
}

const YouTubeEmbed = ({ url, title, poster, playLabel }: { url: string; title: string; poster?: string; playLabel: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      videoId = urlObj.searchParams.get("v") || url.split("/").pop() || "";
    }
  } catch { return null; }
  
  if (!videoId) {
    return poster ? (
      <img src={poster} alt={title} loading="lazy" decoding="async" className="w-full aspect-video rounded-xl object-cover" />
    ) : null;
  }

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className="w-full aspect-video rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={playLabel}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      <img
        src={poster || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="text-white fill-current ml-1" size={20} />
        </div>
      </div>
    </button>
  );
};

const PROJECT_FILTERS = ["All", "React", "Next.js", "NestJS", "Node.js", "AWS", "GraphQL", "PostgreSQL"];

const ProjectsPage = () => {
  const { projects } = usePortfolioData();
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [archProject, setArchProject] = useState<Project | null>(null);

  const isAllView = filter === "All";

  // Curated: the first-6-by-insertion-order approach surfaced "Angular, RBAC,
  // REST" before the stack a recruiter actually scans for. Substring match so
  // "AWS" also catches "AWS SQS" / "AWS Lambda".
  const categories = PROJECT_FILTERS;

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.technologies.some(tech => tech.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <SEO title={t.seo.pages.projects.title} description={t.seo.pages.projects.description} />
      <ArchitectureModal project={archProject} onClose={() => setArchProject(null)} />

      <div className="container-width max-w-6xl mx-auto px-4">
        <PageHeader eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} className="mb-12" />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(c => (
            <Button
              key={c}
              variant={filter === c ? "default" : "outline"}
              onClick={() => setFilter(c)}
              className={`rounded-full text-xs font-bold uppercase tracking-wider ${
                filter === c ? "bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 border-none" : ""
              }`}
              size="sm"
            >
              {c === "All" ? t.common.all : c}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {filtered.map((project, i) => {
            const isFeatured = isAllView && i === 0;
            const spanClass = getBentoSpanClass(i, isAllView);
            const isWide = spanClass.includes("col-span-6") || spanClass.includes("col-span-4");
            return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TRANSITION.base, delay: i * 0.05 }}
              className={spanClass}
            >
              <Card
                className={`h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col ${
                  isFeatured ? "ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-500/10" : ""
                }`}
              >
                <div className={`p-4 bg-slate-50 dark:bg-slate-950/50 ${isFeatured ? "md:p-6" : ""}`}>
                  {project.liveDemo ? (
                    <YouTubeEmbed url={project.liveDemo} title={project.name} poster={project.image} playLabel={t.common.playVideo(project.name)} />
                  ) : (
                    project.image ? (
                      <img src={project.image} alt={project.name} loading="lazy" decoding="async" className={`w-full rounded-xl object-cover ${isWide ? "aspect-[21/9]" : "aspect-video"}`} />
                    ) : (
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-purple-500/15 flex items-center justify-center">
                        <Network className="text-indigo-500/70" size={36} />
                      </div>
                    )
                  )}
                </div>
                <CardContent className={`p-6 flex-1 flex flex-col ${isFeatured ? "md:p-8" : ""}`}>
                  <div className="flex items-center justify-between mb-0 gap-3">
                    <div className="flex items-center gap-2">
                      {isFeatured && (
                        <Badge className="text-[11px] font-bold uppercase bg-gradient-to-r from-indigo-600 to-sky-500 text-white border-none">
                          {t.common.featured}
                        </Badge>
                      )}
                      <h2 className={`font-bold dark:text-white ${isFeatured ? "text-2xl" : "text-xl"}`}>{project.name}</h2>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} – GitHub (${t.common.opensInNewTab})`} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} – ${t.common.liveDemo} (${t.common.opensInNewTab})`} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-[0.2em]">
                    <Calendar size={12} />
                    <span>{project.period}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {project.role}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.map(tech => (
                        <Badge key={tech} className="text-[11px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <button
                      onClick={() => setArchProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <Network size={14} /> {t.common.viewArchitecture}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectsPage);
