import {
  type MouseEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(var(--foreground), 0.15)", // Fallback to foreground color with opacity
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHoverable, setIsHoverable] = useState(true); // Default to true to avoid hydration mismatch, fix in effect

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !isHoverable) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (isHoverable) setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (isHoverable) setOpacity(0);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: This div responds to mouse movements for spotlight effect
    <div
      ref={divRef}
      role="presentation"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHoverable ? opacity : 0.08,
          background: isHoverable
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            : `radial-gradient(circle at 50% 50%, ${spotlightColor}, transparent 70%)`, // Static center spotlight for mobile
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
