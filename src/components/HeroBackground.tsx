"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { memo, useEffect, useRef } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
}

const NODES: Node[] = [
  { id: "edge", x: 50, y: 10 },
  { id: "api", x: 14, y: 22 },
  { id: "auth", x: 8, y: 56 },
  { id: "db", x: 90, y: 24 },
  { id: "cache", x: 92, y: 58 },
  { id: "queue", x: 26, y: 82 },
  { id: "worker", x: 74, y: 84 },
  { id: "logs", x: 50, y: 92 },
];

const EDGES: Array<[string, string]> = [
  ["edge", "api"],
  ["edge", "db"],
  ["api", "auth"],
  ["api", "queue"],
  ["db", "cache"],
  ["queue", "worker"],
  ["worker", "logs"],
  ["cache", "worker"],
  ["auth", "queue"],
  ["db", "logs"],
];

function findNode(id: string): Node {
  const n = NODES.find((node) => node.id === id);
  if (!n) throw new Error(`Unknown node ${id}`);
  return n;
}

const HeroBackground = memo(() => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const orbX = useMotionValue(-1000);
  const orbY = useMotionValue(-1000);
  const orbSpringX = useSpring(orbX, { stiffness: 55, damping: 18, mass: 0.6 });
  const orbSpringY = useSpring(orbY, { stiffness: 55, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    function flush() {
      orbX.set(lastX);
      orbY.set(lastY);
      raf = 0;
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(flush);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [orbX, orbY, reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(99,102,241,0.12), transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="hero-conic-mesh" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        aria-hidden="true"
      >
        <title>Decorative animated node graph</title>
        <defs>
          <linearGradient id="hero-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="hero-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {EDGES.map(([from, to], idx) => {
          const a = findNode(from);
          const b = findNode(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#hero-edge-grad)"
              strokeWidth="0.18"
              strokeLinecap="round"
              strokeDasharray="1.6 2.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.55,
                strokeDashoffset: [0, -22],
              }}
              transition={{
                pathLength: { duration: 1.4, delay: 0.3 + idx * 0.05, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.4, delay: 0.3 + idx * 0.05 },
                strokeDashoffset: {
                  duration: 6 + (idx % 3) * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.6 + idx * 0.1,
                },
              }}
            />
          );
        })}

        {NODES.map((n, idx) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="3.2"
              fill="url(#hero-node-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0], scale: [0.8, 1.6, 0.8] }}
              transition={{
                duration: 3.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 1 + idx * 0.32,
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "fill-box" }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="0.7"
              fill="rgb(99,102,241)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.45, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8 + idx * 0.18,
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "fill-box" }}
            />
          </g>
        ))}
      </svg>

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full"
        style={{
          x: orbSpringX,
          y: orbSpringY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.28), rgba(56,189,248,0.10) 40%, transparent 72%)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
    </div>
  );
});

HeroBackground.displayName = "HeroBackground";

export default HeroBackground;
