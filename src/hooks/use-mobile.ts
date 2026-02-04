import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onChange = React.useCallback(() => {
    // Throttle updates to prevent excessive re-renders on resize
    if (timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      timeoutRef.current = null;
    }, 100);
  }, []);

  React.useLayoutEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      mql.removeEventListener("change", onChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onChange]);

  return React.useMemo(() => !!isMobile, [isMobile]);
}
