"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { useBlogPosts } from "../data/blog";
import { useTranslation } from "../i18n/useTranslation";
import { fadeUpItem, staggerContainer } from "../lib/motion";

const BlogPage = () => {
  const blogPosts = useBlogPosts();
  const { t } = useTranslation();
  const allTags = useMemo(
    () => [...new Set(blogPosts.flatMap((p) => p.tags))].sort(),
    [blogPosts],
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  const container = staggerContainer(0.06, 0.04);
  const item = fadeUpItem(12);

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title={t.home.technicalLabTitle} description={t.home.technicalLabSubtitle} />

      <div className="container-width max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">{t.home.technicalLabTitle}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.home.technicalLabSubtitle}
          </p>
        </header>

        {/* Tag filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTag === null
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {t.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTag === tag
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                variants={item}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="sky"
                            className="text-[9px] font-bold px-1.5 py-0.5"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-base font-bold dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        <Calendar size={11} />
                        <span>{post.date}</span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all inline-flex items-center gap-1">
                          {t.common.readMore}
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && activeTag && (
          <p className="text-center text-slate-500 py-12">
            {t.home.noPostsWithTag(activeTag)}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(BlogPage);
