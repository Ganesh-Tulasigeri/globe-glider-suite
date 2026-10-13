import React from "react";
import "@/styles/infinite-moving-cards.css";

export interface ReviewItem {
  quote: string;
  name: string;
  title: string;
}

interface Props {
  items: ReviewItem[];
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "right",
  speed = "medium",
  pauseOnHover = true,
  className = "",
}: Props) {
  const duration =
    speed === "slow" ? "40s" : speed === "fast" ? "15s" : "25s";

  const loopItems = [...items, ...items];

  return (
    <div
      className={`infinite-scroller ${className}`}
      style={
        {
          "--duration": duration,
          "--direction": direction === "right" ? "normal" : "reverse",
        } as React.CSSProperties
      }
    >
      <ul
        className={`scroller-list ${pauseOnHover ? "pause-on-hover" : ""}`}
      >
        {loopItems.map((item, idx) => (
          <li key={idx} className="scroller-item">
            <blockquote>
              <p className="quote-text">"{item.quote}"</p>
              <footer>
                <span className="reviewer-name">{item.name}</span>
                <span className="reviewer-title">{item.title}</span>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
