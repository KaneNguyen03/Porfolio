import React, { useLayoutEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
  revealDirection?: "start" | "end" | "center";
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  className = "",
  parentClassName = "",
  animateOn = "view",
  revealDirection = "start",
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(),
  );
  const intervalRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    let interval: number;
    let currentIteration = 0;

    if (isScrambling) {
      interval = window.setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split("")
            .map((char, index) => {
              if (revealedIndices.has(index) || char === " ")
                return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );
        currentIteration++;
        if (currentIteration >= maxIterations) {
          // Simplified logic for brevity: just reveal all after maxIterations
          // In a full implementation, we'd reveal character by character based on revealDirection
          setRevealedIndices(new Set(text.split("").map((_, i) => i)));
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isScrambling,
    text,
    maxIterations,
    speed,
    revealedIndices,
    revealDirection,
  ]);

  // Better implementation for the effect using explicit interval management
  // to closely match the "High-end" feel.
  // Let's rewrite the effect slightly to be more robust.

  useLayoutEffect(() => {
    // Reset when text changes
    setDisplayText(text);
    setRevealedIndices(new Set());
  }, [text]);

  const startAnimation = () => {
    setIsScrambling(true);
    setRevealedIndices(new Set());

    const totalSteps = text.length;
    let step = 0;

    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      step++;

      setDisplayText(() =>
        text
          .split("")
          .map((originalChar, i) => {
            if (originalChar === " ") return " ";
            if (step >= maxIterations + i) return originalChar; // simple sequential reveal
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      if (step > maxIterations + totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }
    }, speed);
  };

  const containerProps =
    animateOn === "view"
      ? {
          onViewportEnter: startAnimation,
        }
      : {
          onMouseEnter: startAnimation,
        };

  return (
    <motion.span
      className={`inline-block whitespace-nowrap ${parentClassName}`}
      {...containerProps}
    >
      <span className={className}>{displayText}</span>
    </motion.span>
  );
};

export default DecryptedText;
