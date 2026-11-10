import { memo } from "react";
import BlogSection from "../components/BlogSection";
import HeroSection from "../components/HeroSection";
import HomeCredentials from "../components/HomeCredentials";
import HomeCtaBand from "../components/HomeCtaBand";
import HomeImpactStats from "../components/HomeImpactStats";
import HomeProjectTeaser from "../components/HomeProjectTeaser";
import SEO from "../components/SEO";
import TechStack from "../components/TechStack";
import { useTranslation } from "../i18n/useTranslation";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t.seo.pages.home.title} description={t.seo.pages.home.description} />
      <HeroSection />
      <HomeImpactStats />
      <HomeProjectTeaser />
      <TechStack />
      <HomeCredentials />
      <BlogSection />
      <HomeCtaBand />
    </>
  );
};

export default memo(HomePage);
