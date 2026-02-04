import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const displayText = useMemo(() => {
    if (shouldReduceMotion || !isAnimating || step === 0) return text;

    return text
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";

        let revealThreshold;
        switch (revealDirection) {
          case "end":
            revealThreshold = maxIterations + (text.length - 1 - i);
            break;
          case "center": {
            const center = Math.floor(text.length / 2);
            revealThreshold = maxIterations + Math.abs(center - i);
            break;
          }
          case "start":
          default:
            revealThreshold = maxIterations + i;
            break;
        }

        if (step >= revealThreshold) return char;
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
  }, [
    text,
    isAnimating,
    step,
    maxIterations,
    revealDirection,
    shouldReduceMotion,
  ]);

  useEffect(() => {
    if (!isAnimating || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        const maxStep = maxIterations + text.length;
        if (next > maxStep) {
          setIsAnimating(false);
          return 0;
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text.length, maxIterations, speed, shouldReduceMotion]);

  useEffect(() => {
    setStep(0);
    setIsAnimating(false);
  }, [text]);

  const startAnimation = useCallback(() => {
    if (shouldReduceMotion) return;
    setStep(0);
    setIsAnimating(true);
  }, [shouldReduceMotion]);

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
