"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Cloud,
  Code,
  Database,
  GitBranch,
  Layers,
  MapPin,
  Server,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { memo } from "react";
import avatarImage from "../assets/ava.jpg";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { calculateExperienceYears } from "../lib/experience";
import { TRANSITION, cardHover, fadeUpItem, staggerContainer } from "../lib/motion";

const AboutPage = () => {
  console.log("🎨 [Render] AboutPage");
  const { personalInfo, skills, awards, workExperience } = usePortfolioData();
  const { t } = useTranslation();

  const experienceYears = calculateExperienceYears(workExperience);
  const technologiesCount = new Set(
    [
      ...skills.programmingLanguages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.databases,
      ...skills.devops,
      ...skills.vcs,
      ...skills.architecture,
    ]
      .map((item) => item.trim())
      .filter(Boolean),
  ).size;



  const skillCategories = [
    { icon: Code, title: t.about.skillCategories.languages, skills: skills.programmingLanguages, color: "from-indigo-500 to-sky-400" },
    { icon: Code, title: t.about.skillCategories.frontend, skills: skills.frontend, color: "from-sky-500 to-cyan-400" },
    { icon: Server, title: t.about.skillCategories.backend, skills: skills.backend, color: "from-emerald-500 to-teal-400" },
    { icon: Database, title: t.about.skillCategories.databases, skills: skills.databases, color: "from-purple-500 to-pink-400" },
    { icon: Cloud, title: t.about.skillCategories.environment, skills: skills.devops, color: "from-orange-500 to-yellow-400" },
    { icon: GitBranch, title: t.about.skillCategories.tools, skills: skills.vcs, color: "from-indigo-500 to-purple-400" },
    { icon: Layers, title: t.about.skillCategories.architecture, skills: skills.architecture, color: "from-sky-500 to-indigo-400" },
  ];

  const statCards = [
    { icon: TrendingUp, label: t.about.statExperience, value: `${experienceYears}+ Yrs` },
    { icon: Code, label: t.about.statStack, value: `${technologiesCount}+ Techs` },
    { icon: MapPin, label: t.about.statBasedIn, value: personalInfo.location },
    { icon: Briefcase, label: t.about.statRole, value: t.about.roleValue },
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t.about.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            {personalInfo.objective}
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 text-slate-900 dark:text-white"
        >
          {statCards.map((stat, i) => (
            <motion.div key={i} variants={fadeUpItem(12)}>
              <motion.div variants={cardHover} initial="rest" whileHover="hover">
                <Card className="text-center p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="w-9 h-9 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center">
                    <stat.icon className="w-4.5 h-4.5 text-white" size={18} />
                  </div>
                  <span className="block text-xs font-bold text-slate-500 uppercase mb-1">{stat.label}</span>
                  <span className="block text-lg font-bold">{stat.value}</span>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">{t.about.sectionSkills}</h2>
          <motion.div
            variants={staggerContainer(0.06, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((cat, i) => (
              <motion.div key={i} variants={fadeUpItem(15)}>
                <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-[0.03] dark:opacity-[0.06]`} />
                  <CardContent className="relative p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                        <cat.icon className="w-4.5 h-4.5 text-white" size={18} />
                      </div>
                      <h3 className="font-bold dark:text-white">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map(s => <Badge key={s} variant="secondary" className="font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{s}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {awards.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 dark:text-white">{t.about.sectionAwards}</h2>
            <motion.div
              variants={staggerContainer(0.06, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="grid gap-4"
            >
              {awards.map((a, i) => (
                <motion.div key={i} variants={fadeUpItem(10)}>
                  <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold dark:text-white">{a.name}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{a.period}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AboutPage);
