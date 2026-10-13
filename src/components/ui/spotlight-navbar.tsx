import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightItem {
  label: string;
  to: string;
}

interface SpotlightNavbarProps {
  items: SpotlightItem[];
  className?: string;
}

/**
 * Spotlight Navbar — a pill-shaped navigation bar where an animated spotlight
 * follows the active link, and a softer glow tracks the hovered link.
 */
export function SpotlightNavbar({ items, className }: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
  const [hoverVisible, setHoverVisible] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;

  // Move the active spotlight to the matched nav item
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeEl = nav.querySelector<HTMLElement>("[data-active='true']");
    if (!activeEl) {
      setSpotlightStyle({ opacity: 0 });
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    setSpotlightStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [pathname]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
    setHoverVisible(true);
  };

  const handleMouseLeave = () => setHoverVisible(false);

  return (
    <div
      ref={navRef}
      role="navigation"
      aria-label="Main"
      className={cn(
        "relative flex items-center gap-1 rounded-full border border-border bg-background/80 px-1.5 py-1.5 backdrop-blur-md",
        className,
      )}
    >
      {/* Active spotlight pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-muted transition-all duration-300 ease-out"
        style={spotlightStyle}
      />

      {/* Hover glow */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-foreground/5 transition-all duration-200 ease-out",
          hoverVisible ? "opacity-100" : "opacity-0",
        )}
        style={hoverStyle}
      />

      {items.map((item) => {
        const isActive =
          item.to === "/"
            ? pathname === "/"
            : pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            data-active={isActive}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
