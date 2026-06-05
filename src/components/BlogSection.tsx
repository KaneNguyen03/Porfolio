"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { blogPosts } from "../data/blog";
import { TRANSITION, fadeUpItem, staggerContainer } from "../lib/motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BlogSection = memo(() => {
  const allTags = useMemo(
    () => [...new Set(blogPosts.flatMap((p) => p.tags))].sort(),
    [],
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  const container = staggerContainer(0.06, 0.04);
  const item = fadeUpItem(12);

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container-width max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.base}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
            Technical Lab
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Notes, deep dives, and architectural decisions
          </p>
        </motion.div>

        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTag === null
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All
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
        </motion.div>

        {/* Blog posts grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
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
                <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Tags */}
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

                    {/* Title */}
                    <h3 className="text-base font-bold dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      <Calendar size={11} />
                      <span>{post.date}</span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read more hint */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all inline-flex items-center gap-1">
                        Read more
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No posts with tag #{activeTag}
          </p>
        )}
      </div>
    </section>
  );
});

export default BlogSection;
