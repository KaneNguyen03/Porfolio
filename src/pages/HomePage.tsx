"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { memo, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import cvFile from "../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf";
import avatarImage from "../assets/ava.jpg";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { portfolioData } from "../data/portfolio";
import { calculateExperienceYears } from "../lib/experience";
import { TRANSITION } from "../lib/motion";
import type { PortfolioData } from "../types/portfolio";

const HomePage = () => {
  const { personalInfo, projects, workExperience } = portfolioData as PortfolioData;

  const experienceYears = calculateExperienceYears(workExperience);
  const projectCount = projects?.length ?? 0;

  // React 19 Standard: Page level UI synchronization
  useLayoutEffect(() => {
    // Component mounted/synced
  }, []);

  const highlights = [
    {
      label: "Experience",
      value: experienceYears ? `${experienceYears} years` : "Fullstack Developer",
    },
    {
      label: "Projects",
      value: projectCount ? `${projectCount}+ shipped` : "Product-focused builds",
    },
    { label: "Focus", value: "Backend & API" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-20 min-h-screen flex items-center">
      <SEO title="Home" description={personalInfo.objective} />
      <div className="container-width">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={TRANSITION.base}
              className="mb-8"
            >
              <img
                src={avatarImage}
                alt={personalInfo.name}
                className="w-40 h-40 sm:w-44 sm:h-44 mx-auto lg:mx-0 rounded-full object-cover shadow-xl border-4 border-white dark:border-gray-800"
              />
            </motion.div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              <Badge className="rounded-full px-4 py-1.5">Fullstack</Badge>
              <Badge variant="emerald" className="rounded-full px-4 py-1.5">Open to Work</Badge>
            </div>

            <div className="space-y-4">
              {highlights.map((item) => (
                <Card key={item.label} className="p-4 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6 font-mono">
              {personalInfo.title}
            </h2>

            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 mb-8">
              <MapPin size={18} className="text-red-500" />
              <span className="text-sm font-medium">{personalInfo.location}</span>
            </div>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              {personalInfo.objective}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="rounded-full px-8">
                <a href={cvFile} download>
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
