"use client";

import { motion } from "framer-motion";
import { Building, Calendar, ExternalLink, Github, GitCommit } from "lucide-react";
import { memo, useState } from "react";
import { portfolioData } from "../data/portfolio";
import { TRANSITION, cardHover } from "../lib/motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import ArchitectureModal from "./ArchitectureModal";
import type { Project } from "../types/portfolio";

interface TimelineItemProps {
  company: string;
  period: string;
  position: string;
  responsibilities: string[];
  index: number;
}

const TimelineItem = memo(({ company, period, position, responsibilities, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ ...TRANSITION.base, delay: index * 0.06 }}
      className="relative pl-8 pb-8 border-l-2 border-slate-200 dark:border-slate-800 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-950" />
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 ml-4">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold dark:text-white">{position}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Building size={14} />
                <span>{company}</span>
              </div>
            </div>
            <Badge variant="secondary" className="self-start bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px]">
              <Calendar size={10} className="mr-1" />
              {period}
            </Badge>
          </div>
          <ul className="space-y-1.5">
            {responsibilities.slice(0, 3).map((r, i) => (
              <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 mt-1 shrink-0">▹</span>
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
});

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenArch: (project: Project) => void;
}

const ProjectCard = memo(({ project, index, onOpenArch }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...TRANSITION.base, delay: index * 0.05 }}
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <Card
          className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden group cursor-pointer"
          onClick={() => onOpenArch(project)}
        >
          {/* Image preview */}
          {project.image && (
            <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-slate-900/60 to-transparent" />
            </div>
          )}

          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold dark:text-white text-sm leading-tight flex-1">
                {project.name}
              </h3>
              <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              <GitCommit size={10} />
              <span>{project.period} • {project.role}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
});

const ShowcaseSection = memo(() => {
  const { workExperience, projects } = portfolioData;
  const [archProject, setArchProject] = useState<Project | null>(null);

  const featuredProjects = projects.slice(0, 6);

  return (
    <section className="py-20">
      <ArchitectureModal
        project={archProject}
        onClose={() => setArchProject(null)}
      />

      <div className="container-width max-w-6xl mx-auto px-4">
        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.base}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
            Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Professional journey building production systems
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-24">
          {workExperience.map((exp, i) => (
            <TimelineItem
              key={`${exp.company}-${i}`}
              company={exp.company}
              period={exp.period}
              position={exp.position}
              responsibilities={exp.responsibilities}
              index={i}
            />
          ))}
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.base}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Click a card to explore system architecture — hover for details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              onOpenArch={setArchProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ShowcaseSection;
