import { useEffect, useRef, useState } from "react";

type DivideBy = "word" | "character";

interface TextAnimationProps {
  children: string;
  divideBy?: DivideBy;
  /** Initial delay before first token appears (seconds) */
  delay?: number;
  /** Stagger between each token (seconds) */
  stagger?: number;
  className?: string;
}

/**
 * Animates text by splitting it into words or characters, then fading+sliding
 * each token in sequentially once the element enters the viewport.
 *
 * Uses IntersectionObserver so the animation only fires when visible —
 * no framer-motion dependency required.
 */
export default function TextAnimation({
  children,
  divideBy = "word",
  delay = 0,
  stagger = 0.06,
  className,
}: TextAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tokens =
    divideBy === "word" ? children.split(/(\s+)/) : children.split("");

  return (
    <span ref={containerRef} className={className} aria-label={children}>
      {tokens.map((token, i) => {
        // Whitespace tokens — render as-is without animation wrapper
        if (/^\s+$/.test(token)) {
          return (
            <span key={i} aria-hidden="true">
              {token}
            </span>
          );
        }

        const tokenDelay = delay + i * stagger;

        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.5em)",
              transition: visible
                ? `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${tokenDelay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${tokenDelay}s`
                : "none",
            }}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
}
