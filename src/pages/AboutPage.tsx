"use client";

import { motion } from "framer-motion";
import { Cloud, Code, Database, GitBranch, Server, Trophy } from "lucide-react";
import { memo, useLayoutEffect } from "react";
import avatarImage from "../assets/ava.jpg";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { portfolioData } from "../data/portfolio";
import { calculateExperienceYears } from "../lib/experience";
import { TRANSITION } from "../lib/motion";

const AboutPage = () => {
  const { personalInfo, skills, awards, workExperience } = portfolioData;

  const experienceYears = calculateExperienceYears(workExperience);
  const technologiesCount = new Set(
    [
      ...skills.programmingLanguages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.databases,
      ...skills.devops,
      ...skills.vcs,
    ]
      .map((item) => item.trim())
      .filter(Boolean),
  ).size;

  useLayoutEffect(() => {
    // Client-side UI sync
  }, []);

  const skillCategories = [
    { icon: Code, title: "Languages", skills: skills.programmingLanguages },
    { icon: Code, title: "Frontend", skills: skills.frontend },
    { icon: Server, title: "Backend", skills: skills.backend },
    { icon: Database, title: "Databases", skills: skills.databases },
    { icon: Cloud, title: "Environment", skills: skills.devops },
    { icon: GitBranch, title: "Tools", skills: skills.vcs },
  ];

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title="About" description={personalInfo.objective} />
      
      <div className="container-width max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={TRANSITION.base}
          >
            <img
              src={avatarImage}
              alt={personalInfo.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-white dark:border-slate-800 mb-6"
            />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            {personalInfo.objective}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 text-slate-900 dark:text-white">
          {[
            { label: "Experience", value: `${experienceYears}+ Yrs` },
            { label: "Stack", value: `${technologiesCount}+ Techs` },
            { label: "Based in", value: personalInfo.location },
            { label: "Role", value: "Backend @ Bizzi" }
          ].map((stat, i) => (
            <Card key={i} className="text-center p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <span className="block text-xs font-bold text-slate-500 uppercase mb-1">{stat.label}</span>
              <span className="block text-lg font-bold">{stat.value}</span>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Professional Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <cat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold dark:text-white">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map(s => <Badge key={s} variant="secondary" className="font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{s}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {awards.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Awards & Recognition</h2>
            <div className="grid gap-4">
              {awards.map((a, i) => (
                <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <CardContent className="p-5 flex items-start gap-4">
                    <Trophy className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold dark:text-white">{a.name}</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{a.period}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AboutPage);
