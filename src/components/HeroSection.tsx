"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cvFile from "../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf";
import avatarImage from "../assets/ava.jpg";
import { portfolioData } from "../data/portfolio";
import { EASING, TRANSITION } from "../lib/motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const TYPING_SPEED = 60;
const ERASE_SPEED = 30;
const PAUSE = 2000;

const roles = [
  "Software Engineer",
  "Fullstack Developer",
  "Backend & API Specialist",
  "Node.js & TypeScript Dev",
];

function TypewriterText() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting && text === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE);
      return;
    }
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? ERASE_SPEED : TYPING_SPEED;
    timeoutRef.current = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1),
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isDeleting, roleIndex]);

  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-blue-500 ml-1 align-middle"
      />
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];
    const particleCount = 60;
    const connectionDistance = 120;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      }));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const nodeColor = isDark ? "99, 102, 241" : "99, 102, 241";
      const lineColor = isDark ? "99, 102, 241" : "59, 130, 246";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.08 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}

const HeroSection = memo(() => {
  const { personalInfo } = portfolioData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <ParticleCanvas />

      <div className="relative z-10 container-width max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Avatar column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...TRANSITION.spring, delay: 0.1 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
              <img
                src={avatarImage}
                alt={personalInfo.name}
                className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-white/80 dark:border-slate-800/80 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Text column */}
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
                Open to Work
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...TRANSITION.base, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...TRANSITION.base, delay: 0.6 }}
              className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-400 mb-6 font-mono h-8"
            >
              <TypewriterText />
            </motion.h2>

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
              <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="rounded-full px-8 gap-2">
                <a href={cvFile} download>
                  Download CV
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

export default HeroSection;
