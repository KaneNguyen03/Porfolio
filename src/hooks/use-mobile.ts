import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Modern React 19 hook to track mobile viewport state using useSyncExternalStore.
 * This eliminates unnecessary re-renders and mount-time state synchronization.
 */
export function useIsMobile() {
  return useSyncExternalStore(
    // 1. Subscribe: Listen for resize events
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    // 2. Snapshot: Get the current value
    () => window.innerWidth < MOBILE_BREAKPOINT,
    // 3. Server Snapshot: Default for SSR
    () => false,
  );
}
