"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle, Layers } from "lucide-react";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import MermaidDiagram from "../components/MermaidDiagram";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { useBlogPost } from "../data/blog";
import { useTranslation } from "../i18n/useTranslation";
import { fadeUpItem, staggerContainer } from "../lib/motion";
import type { ArchitectureComponent } from "../types/blog";

// Shared between the "no diagram" case and MermaidDiagram's parse-error
// fallback — keyed by index since component names are translated per
// language (keying by name breaks the fadeUp reveal on language switch).
const ComponentDotList = ({ components }: { components: ArchitectureComponent[] }) => (
  <div className="flex flex-col gap-3">
    {components.map((c, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="flex flex-col items-center shrink-0 pt-1">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500" />
          {i < components.length - 1 && (
            <div className="w-px flex-1 min-h-[24px] bg-gradient-to-b from-indigo-500/40 to-sky-500/10 mt-1" />
          )}
        </div>
        <div className="pb-1">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{c.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const NotFoundState = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen flex items-center">
      <SEO title={t.blog.postNotFound} description={t.blog.postNotFoundBody} noIndex />
      <div className="container-width max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold dark:text-white mb-4">{t.blog.postNotFound}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{t.blog.postNotFoundBody}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
        >
          <ArrowLeft size={16} /> {t.blog.backToLab}
        </Link>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useBlogPost(slug ?? "");
  const { t } = useTranslation();

  if (!post) return <NotFoundState />;

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title={post.title} description={post.excerpt} />

      <motion.div
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        animate="visible"
        className="container-width max-w-3xl mx-auto px-4"
      >
        <motion.div variants={fadeUpItem(10)}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
          >
            <ArrowLeft size={16} /> {t.blog.backToLab}
          </Link>
        </motion.div>

        <motion.header variants={fadeUpItem(15)} className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="sky" className="text-[10px] font-bold px-2 py-0.5">
                #{tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Calendar size={12} />
            <span>{post.date}</span>
          </div>
        </motion.header>

        <div className="space-y-8">
          {/* Overview */}
          <motion.div variants={fadeUpItem(15)}>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold dark:text-white mb-3">{t.blog.overview}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {post.overview}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Architecture Overview */}
          <motion.div variants={fadeUpItem(15)}>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={18} className="text-indigo-500" />
                  <h2 className="text-lg font-bold dark:text-white">{t.blog.architectureOverview}</h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {post.architecture.summary}
                </p>
                {post.architecture.diagram ? (
                  <MermaidDiagram
                    id={`arch-diagram-${post.slug}`}
                    definition={post.architecture.diagram}
                    fallback={<ComponentDotList components={post.architecture.components} />}
                  />
                ) : (
                  <ComponentDotList components={post.architecture.components} />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Implementation */}
          <motion.div variants={fadeUpItem(15)}>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold dark:text-white mb-4">{t.blog.implementation}</h2>
                <ol className="space-y-3">
                  {post.implementation.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeUpItem(15)}>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold dark:text-white mb-4">{t.blog.results}</h2>
                <ul className="space-y-3">
                  {post.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(BlogPostPage);
