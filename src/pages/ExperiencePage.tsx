"use client";

import { motion } from "framer-motion";
import { Briefcase, Building, Calendar, CheckCircle } from "lucide-react";
import { memo, useLayoutEffect } from "react";
import SEO from "../components/SEO";
import { Card, CardContent } from "../components/ui/card";
import { portfolioData } from "../data/portfolio";
import { TRANSITION } from "../lib/motion";

const ExperiencePage = () => {
  const { workExperience } = portfolioData;

  useLayoutEffect(() => {
    // Client-side UI sync
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title="Experience" description="Professional work history and contributions." />
      
      <div className="container-width max-w-4xl mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Experience</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Professional journey and technical impact.
          </p>
        </header>

        <div className="space-y-8">
          {workExperience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TRANSITION.base, delay: i * 0.05 }}
            >
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold dark:text-white">{exp.position}</h3>
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <Building size={16} />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 self-start sm:self-center">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ul className="grid grid-cols-1 gap-3 list-none">
                        {exp.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ExperiencePage);
