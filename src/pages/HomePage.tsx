import { memo } from "react";
import BlogSection from "../components/BlogSection";
import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import ShowcaseSection from "../components/ShowcaseSection";
import TechStack from "../components/TechStack";

const HomePage = () => {
  return (
    <>
      <SEO title="Home" description="Fullstack Software Engineer portfolio featuring projects, experience, and technical insights." />
      <HeroSection />

      <ScrollReveal direction="up" distance={20}>
        <ShowcaseSection />
      </ScrollReveal>

      <TechStack />

      <ScrollReveal direction="up" distance={20}>
        <BlogSection />
      </ScrollReveal>
    </>
  );
};

export default memo(HomePage);
