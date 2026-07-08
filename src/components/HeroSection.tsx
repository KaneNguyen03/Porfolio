"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import cvFile from "../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf";
import avatarImage from "../assets/ava.jpg";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { EASING, TRANSITION } from "../lib/motion";
import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import MagneticButton from "./MagneticButton";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

function HeroAvatar({ src, alt }: HeroAvatarProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.5 });
  const springRy = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let pendingRx = 0;
    let pendingRy = 0;

    function flush() {
      rx.set(pendingRx);
      ry.set(pendingRy);
      raf = 0;
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      pendingRy = Math.max(-5, Math.min(5, dx * 5));
      pendingRx = Math.max(-5, Math.min(5, -dy * 5));
      if (!raf) raf = requestAnimationFrame(flush);
    }

    function onLeave() {
      pendingRx = 0;
      pendingRy = 0;
      if (!raf) raf = requestAnimationFrame(flush);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion, rx, ry]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: 700 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...TRANSITION.spring, delay: 0.1 }}
    >
      {reduceMotion ? (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-xl opacity-40" />
      ) : (
        <div className="hero-avatar-shimmer" aria-hidden="true" />
      )}
      <motion.img
        src={src}
        alt={alt}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: springRx,
                rotateY: springRy,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
        }
        className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-white/80 dark:border-slate-800/80 shadow-2xl"
      />
    </motion.div>
  );
}

const HeroSection = memo(() => {
  const { personalInfo } = usePortfolioData();
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, (y) => {
    if (typeof window === "undefined") return 1;
    const vh = window.innerHeight;
    if (y < vh * 0.25) return 1;
    if (y > vh * 0.5) return 0;
    return 1 - (y - vh * 0.25) / (vh * 0.25);
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 container-width max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <HeroAvatar src={avatarImage} alt={personalInfo.name} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION.base, delay: 0.2 }}
            className="lg:col-span-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TRANSITION.base, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
            >
              <Badge className="rounded-full px-4 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                {t.heroSection.openToWork}
              </Badge>
            </motion.div>

            <HeroHeadline name={personalInfo.name} roles={t.heroSection.roles} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...TRANSITION.base, delay: 0.8 }}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {personalInfo.objective}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TRANSITION.base, delay: 1.0 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 gap-2 group relative overflow-hidden"
                >
                  <Link to="/projects">
                    <span className="cta-ripple-glow" aria-hidden="true" />
                    <span className="relative z-10">{t.heroSection.viewProjects}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-12" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-full px-8 gap-2 group relative overflow-hidden"
                >
                  <a href={cvFile} download>
                    <span className="cta-ripple-glow" aria-hidden="true" />
                    <span className="relative z-10">{t.heroSection.downloadCv}</span>
                    <Download className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: EASING }}
          className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-slate-600 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
