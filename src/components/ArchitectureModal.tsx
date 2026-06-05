"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../types/portfolio";

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

const systemDiagrams: Record<string, { label: string; nodes: string[]; connections: [number, number][] }> = {
  "B-eInvoice": {
    label: "B-eInvoice Architecture",
    nodes: ["React/Angular UI", "Fastify API", "Moqui Legacy", "PostgreSQL", "AWS S3", "Redis Cache", "Auth Service", "Audit Log"],
    connections: [[0,1],[1,2],[1,3],[1,4],[1,5],[1,6],[6,7]],
  },
  "IPA Expense Ops": {
    label: "IPA Expense Ops Flow",
    nodes: ["Next.js Dashboard", "REST API Gateway", "Expense Service", "Approval Engine", "Ledger DB", "Vendor API", "Notification"],
    connections: [[0,1],[1,2],[2,3],[2,4],[2,5],[3,6]],
  },
  "EveryTalk": {
    label: "EveryTalk Architecture",
    nodes: ["Mobile/Web Client", "Sendbird API", "Message Service", "PostgreSQL", "Webhook Handler", "K6/Load Test", "Grafana"],
    connections: [[0,1],[0,2],[2,3],[1,4],[4,2],[0,5],[5,6]],
  },
  "Uobong": {
    label: "Uobong Event-Driven",
    nodes: ["Client App", "API Gateway", "IAP Service", "AWS SQS", "AWS Lambda", "User Service", "Gamification Engine"],
    connections: [[0,1],[1,2],[2,3],[3,4],[4,5],[4,6]],
  },
  "Building Maintenance and Crack Monitoring System": {
    label: "BMCMS Architecture",
    nodes: ["React Frontend", "NestJS API", "Auth gRPC", "PostgreSQL", "Redis", "RabbitMQ", "Ultralytics AI", "AWS EC2", "Docker"],
    connections: [[0,1],[1,2],[1,3],[1,4],[1,5],[1,6],[6,4],[0,7],[7,8]],
  },
};

export default function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const diagram = systemDiagrams[project.name];
  const hasLiveDemo = project.liveDemo && project.liveDemo.length > 0;

  const centerX = 220;
  const centerY = 120;
  const radius = 90;

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{project.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{project.role}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {diagram && (
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      {diagram.label}
                    </p>
                    <svg viewBox="0 0 440 240" className="w-full h-auto">
                      {diagram.connections.map(([from, to], i) => {
                        const angleFrom = (from / diagram.nodes.length) * Math.PI * 2 - Math.PI / 2;
                        const angleTo = (to / diagram.nodes.length) * Math.PI * 2 - Math.PI / 2;
                        const x1 = centerX + radius * Math.cos(angleFrom);
                        const y1 = centerY + radius * Math.sin(angleFrom);
                        const x2 = centerX + radius * Math.cos(angleTo);
                        const y2 = centerY + radius * Math.sin(angleTo);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#6366f1"
                            strokeWidth="1.5"
                            strokeOpacity="0.3"
                            strokeDasharray="4 3"
                          />
                        );
                      })}
                      {diagram.nodes.map((node, i) => {
                        const angle = (i / diagram.nodes.length) * Math.PI * 2 - Math.PI / 2;
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                        return (
                          <g key={i}>
                            <circle cx={x} cy={y} r="6" fill="#6366f1" className="drop-shadow-md" />
                            <text
                              x={x}
                              y={y + 20}
                              textAnchor="middle"
                              className="fill-slate-600 dark:fill-slate-400"
                              fontSize="8"
                              fontFamily="system-ui"
                            >
                              {node}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Contributions
                  </p>
                  <ul className="space-y-2">
                    {project.responsibilities.slice(0, 4).map((r, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  {hasLiveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
