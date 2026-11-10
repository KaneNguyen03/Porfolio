import { ArrowLeft, Compass } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { useTranslation } from "../i18n/useTranslation";

// Soft-404 guard: unknown URLs render a real not-found page (noindex)
// instead of an empty main region that search engines index as 200.
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="py-24 min-h-[70vh] flex items-center">
      <SEO title={t.notFound.title} description={t.notFound.body} noIndex />
      <div className="container-width max-w-xl mx-auto px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20">
          <Compass size={28} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-3">404</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          <span className="gradient-text-animated">{t.notFound.title}</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{t.notFound.body}</p>
        <Button asChild size="lg" className="rounded-full px-8 gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backToHome}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default memo(NotFoundPage);
