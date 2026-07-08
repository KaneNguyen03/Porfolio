"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION, cardHover, fadeUpItem, staggerContainer } from "../lib/motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// Hand-picked to cover all three role types (fullstack/frontend/backend)
// across two different companies (Bizzi, Cigro) rather than the top-N by array order.
const TEASER_NAMES = [
  "B-eInvoice – AP Automation for Enterprises",
  "IPA Expense Ops – Cost Control & Reconciliation",
  "EveryTalk - Real-time Communication Platform",
];

const HomeProjectTeaser = memo(() => {
  const { projects } = usePortfolioData();
  const { t } = useTranslation();
  const teaserProjects = TEASER_NAMES.map((name) =>
    projects.find((p) => p.name === name),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (teaserProjects.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container-width max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.base}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
            {t.home.selectedWork}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t.home.selectedWorkSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {teaserProjects.map((project) => (
            <motion.div key={project.name} variants={fadeUpItem(15)} className="h-full">
              <motion.div variants={cardHover} initial="rest" whileHover="hover" className="h-full">
                <Link to="/projects" className="block h-full">
                  <Card className="h-full overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    )}
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold dark:text-white text-sm mb-1">{project.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                        {project.role}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.technologies.slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button asChild size="lg" className="rounded-full px-8 gap-2">
            <Link to="/projects">
              {t.home.viewAllProjects}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2">
            <Link to="/experience">
              {t.home.fullExperienceTimeline}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

HomeProjectTeaser.displayName = "HomeProjectTeaser";

export default HomeProjectTeaser;
