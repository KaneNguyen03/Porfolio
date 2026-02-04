import { useSyncExternalStore } from "react";

/**
 * Optimized React 19 hook to track user reduced motion preference.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
