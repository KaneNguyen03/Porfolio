import { useState, useEffect, useCallback, useMemo, useRef } from "react";

export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  const handleChange = useCallback(() => {
    if (mediaQueryRef.current) {
      setShouldReduceMotion(mediaQueryRef.current.matches);
    }
  }, []);

  useEffect(() => {
    mediaQueryRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    mediaQueryRef.current.addEventListener("change", handleChange);
    setShouldReduceMotion(mediaQueryRef.current.matches);
    return () => {
      if (mediaQueryRef.current) {
        mediaQueryRef.current.removeEventListener("change", handleChange);
      }
    };
  }, [handleChange]);

  return useMemo(() => shouldReduceMotion, [shouldReduceMotion]);
}
