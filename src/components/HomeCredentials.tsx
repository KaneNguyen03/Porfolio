"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION, fadeUpItem, staggerContainer } from "../lib/motion";
import CertificationCard from "./CertificationCard";
import { Button } from "./ui/button";

// Home shows the four most recent credentials; the full list lives on /education.
const HOME_LIMIT = 4;

const HomeCredentials = memo(() => {
  const { certifications } = usePortfolioData();
  const { t } = useTranslation();
  const featured = certifications.slice(0, HOME_LIMIT);

  if (featured.length === 0) return null;

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
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-3">
            {t.home.credentialsEyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text-animated">{t.home.credentialsTitle}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t.home.credentialsSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {featured.map((cert) => (
            <motion.div key={cert.url} variants={fadeUpItem(15)} className="h-full">
              <CertificationCard cert={cert} compact />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 group">
            <Link to="/education">
              {t.home.viewAllCredentials}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

HomeCredentials.displayName = "HomeCredentials";

export default HomeCredentials;
