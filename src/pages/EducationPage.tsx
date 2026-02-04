"use client";

import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { memo, useLayoutEffect } from "react";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { portfolioData } from "../data/portfolio";

const EducationPage = () => {
  const { education, certifications } = portfolioData;

  useLayoutEffect(() => {
    // Client-side UI sync
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title="Education" description="My academic background and certifications." />
      
      <div className="container-width max-w-4xl mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">Education</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Continuous learning and professional growth.</p>
        </header>

        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <GraduationCap className="text-blue-600" /> Academic
          </h2>
          {education.map((edu, i) => (
            <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">{edu.institution}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.degree}</p>
                  </div>
                  <Badge variant="secondary" className="self-start sm:self-center h-fit bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{edu.period}</Badge>
                </div>
                {edu.gpa && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="emerald" className="font-normal capitalize">GPA: {edu.gpa}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <Award className="text-yellow-600" /> Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                      <BookOpen size={20} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold dark:text-white leading-tight">{cert.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Calendar size={12} />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                  <a href={cert.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EducationPage);
