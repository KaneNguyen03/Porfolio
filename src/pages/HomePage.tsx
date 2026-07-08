import { memo } from "react";
import BlogSection from "../components/BlogSection";
import HeroSection from "../components/HeroSection";
import HomeImpactStats from "../components/HomeImpactStats";
import HomeProjectTeaser from "../components/HomeProjectTeaser";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import TechStack from "../components/TechStack";

const HomePage = () => {
  return (
    <>
      <SEO title="Home" description="Kha (Kane) Nguyen — Fullstack Software Engineer in Ho Chi Minh City. Explore projects, tech stack, blog posts, and professional experience." />
      <HeroSection />

      <ScrollReveal direction="up" distance={20}>
        <HomeImpactStats />
      </ScrollReveal>

      <ScrollReveal direction="up" distance={20}>
        <HomeProjectTeaser />
      </ScrollReveal>

      <TechStack />

      <ScrollReveal direction="up" distance={20}>
        <BlogSection />
      </ScrollReveal>
    </>
  );
};

export default memo(HomePage);
