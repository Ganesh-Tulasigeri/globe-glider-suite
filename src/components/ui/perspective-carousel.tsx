"use client";
import React, { CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import type { TourPackage } from "@/data/packages";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/contact";

const styles = `
  .perspective-carousel-wrapper {
    position: relative;
    width: 100%;
    overflow: visible;
    background: transparent;
  }

  .carousel {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
  }

  .carousel-stage {
    position: relative;
    width: 100%;
    flex: 0 0 auto;
    overflow-x: hidden;
    overflow-y: visible;
    padding: 36px 0 34px;
    background: transparent;
    perspective: 1200px;
    cursor: ns-resize;
    user-select: none;
    -webkit-user-select: none;
  }

  .carousel-track {
    position: relative;
    width: 100%;
    height: calc(var(--card-size) + 34px);
    transform-style: preserve-3d;
    background: transparent;
  }

  .deck-shadow {
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: min(78vw, 1080px);
    height: 74px;
    transform: translateX(-50%);
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.10) 0%,
      rgba(0, 0, 0, 0.06) 35%,
      rgba(0, 0, 0, 0.025) 55%,
      rgba(0, 0, 0, 0) 78%
    );
    filter: blur(18px);
    pointer-events: none;
  }

  .card-shadow {
    position: absolute;
    left: 50%;
    top: calc(var(--card-size) - 2px);
    width: calc(var(--card-size) * 0.76);
    height: calc(var(--card-size) * 0.14);
    border-radius: 999px;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.14) 38%,
      rgba(0, 0, 0, 0.06) 62%,
      rgba(0, 0, 0, 0) 100%
    );
    filter: blur(16px);
    transform-origin: center;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .carousel-card {
    position: absolute;
    top: 0;
    left: 50%;
    width: var(--card-size);
    height: var(--card-size);
    overflow: hidden;
    border-radius: 26px;
    background: hsl(var(--card));
    box-shadow:
      0 8px 18px rgba(20, 20, 20, 0.05),
      0 16px 34px rgba(20, 20, 20, 0.04);
    backface-visibility: hidden;
    transform-origin: center center;
    will-change: transform, opacity;
  }

  .carousel-card::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  }

  .carousel-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  .details {
    flex: 0 0 auto;
    width: 100%;
    max-width: 620px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px 0;
    background: transparent;
    text-align: center;
    margin: 0 auto;
  }

  .caption {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: caption-enter 260ms ease-out both;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 20px;
  }

  .pagination-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: hsl(var(--foreground));
    opacity: 0.19;
    transform: scale(1);
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  .pagination-dot.active {
    opacity: 1;
    transform: scale(1.08);
  }

  .scroll-hint {
    margin: 14px 0 0;
    color: hsl(var(--muted-foreground));
    font-size: 12px;
    letter-spacing: 0.025em;
  }

  @keyframes caption-enter {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 700px) {
    .carousel-stage {
      padding: 30px 0 30px;
      perspective: 920px;
    }
    .carousel-card {
      border-radius: 21px;
    }
    .deck-shadow {
      height: 58px;
      filter: blur(15px);
    }
    .card-shadow {
      filter: blur(13px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .caption,
    .pagination-dot {
      animation: none;
      transition: none;
    }
  }
`;

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getCircularOffset(cardIndex: number, position: number, total: number) {
  let offset = cardIndex - position;
  offset = ((offset + total / 2) % total + total) % total - total / 2;
  return offset;
}

function getViewportWidth() {
  if (typeof window === "undefined") return 1440;
  return window.innerWidth;
}

export function PerspectiveCarousel({ items }: { items: TourPackage[] }) {
  const total = items.length;

  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);
  const [activeIndex, setActiveIndex] = useState(0);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const activeIndexRef = useRef(0);

  const animationFrameRef = useRef<number | null>(null);
  const previousFrameRef = useRef(0);

  const wheelDistanceRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const wheelEndTimerRef = useRef<number | null>(null);

  const autoplayTimerRef = useRef<number | null>(null);
  const autoplayStoppedRef = useRef(false);

  const isMobile = viewportWidth <= 700;

  const cardSize = isMobile
    ? Math.min(300, viewportWidth * 0.7)
    : Math.min(360, Math.max(220, viewportWidth * 0.2));

  const pitch = cardSize * (isMobile ? 0.72 : 0.68);

  const pauseTimeoutRef = useRef<number | null>(null);

  const updateActiveIndex = useCallback(
    (position: number) => {
      const nextIndex = wrap(Math.round(position), total);
      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [total],
  );

  const paint = useCallback(() => {
    for (let index = 0; index < total; index += 1) {
      const card = cardRefs.current[index];
      const shadow = shadowRefs.current[index];
      if (!card || !shadow) continue;

      const offset = getCircularOffset(index, positionRef.current, total);
      const distance = Math.abs(offset);
      const curvedDistance = Math.pow(distance, 0.68);
      const direction = offset === 0 ? 0 : Math.sign(offset);

      const x = offset * pitch;
      const z = -cardSize * 0.4 * curvedDistance;
      const rotation = Math.min(35 * curvedDistance, 74) * direction;
      const scale = 1 - Math.min(distance * 0.018, 0.075);
      const opacity = Math.max(0.54, 1 - distance * 0.075);

      card.style.transform =
        `translateX(-50%) ` +
        `translateX(${x}px) ` +
        `translateZ(${z}px) ` +
        `rotateY(${-rotation}deg) ` +
        `scale(${scale})`;

      card.style.opacity = String(opacity);
      card.style.zIndex = String(5000 - Math.round(distance * 100));

      const shadowScaleX = 1 - Math.min(distance * 0.05, 0.24);
      const shadowScaleY = 1 - Math.min(distance * 0.04, 0.18);
      const shadowOpacity = Math.max(0.02, 0.18 - distance * 0.024);

      shadow.style.transform =
        `translateX(-50%) ` +
        `translateX(${x}px) ` +
        `scaleX(${shadowScaleX}) ` +
        `scaleY(${shadowScaleY})`;

      shadow.style.opacity = String(shadowOpacity);
      shadow.style.zIndex = String(1000 - Math.round(distance * 100));
    }
  }, [cardSize, pitch, total]);

  const stopAutoplay = useCallback(() => {
    autoplayStoppedRef.current = true;
    
    if (pauseTimeoutRef.current !== null) {
      window.clearTimeout(pauseTimeoutRef.current);
    }
    
    pauseTimeoutRef.current = window.setTimeout(() => {
      autoplayStoppedRef.current = false;
    }, 4000);
  }, []);

  const runAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    const animate = (time: number) => {
      if (!previousFrameRef.current) {
        previousFrameRef.current = time;
      }

      const delta = Math.min(0.05, (time - previousFrameRef.current) / 1000);
      previousFrameRef.current = time;

      const remaining = targetRef.current - positionRef.current;
      const smoothing = 1 - Math.exp(-8.8 * delta);

      const nextPosition = positionRef.current + remaining * smoothing;
      positionRef.current = nextPosition;

      paint();
      updateActiveIndex(nextPosition);

      if (Math.abs(remaining) < 0.0005) {
        positionRef.current = targetRef.current;
        paint();
        updateActiveIndex(targetRef.current);
        animationFrameRef.current = null;
        previousFrameRef.current = 0;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [paint, updateActiveIndex]);

  const moveOneCard = useCallback(
    (direction: 1 | -1, manual = false) => {
      if (manual) {
        stopAutoplay();
        targetRef.current = Math.round(positionRef.current) + direction;
      } else {
        targetRef.current = Math.round(targetRef.current) + direction;
      }

      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

      if (reducedMotion) {
        positionRef.current = targetRef.current;
        paint();
        updateActiveIndex(targetRef.current);
        return;
      }

      runAnimation();
    },
    [paint, runAnimation, stopAutoplay, updateActiveIndex],
  );

  useLayoutEffect(() => {
    paint();
  }, [paint]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    paint();
  }, [paint, viewportWidth]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    
    const handleWheel = (event: WheelEvent) => {
      const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (Math.abs(movement) < 0.5) return;

      event.preventDefault();
      stopAutoplay();

      if (wheelEndTimerRef.current !== null) {
        window.clearTimeout(wheelEndTimerRef.current);
      }

      wheelEndTimerRef.current = window.setTimeout(() => {
        wheelDistanceRef.current = 0;
        wheelLockedRef.current = false;
        wheelEndTimerRef.current = null;
      }, 240);

      if (wheelLockedRef.current) return;

      wheelDistanceRef.current += movement;

      if (Math.abs(wheelDistanceRef.current) < 16) return;

      const direction: 1 | -1 = wheelDistanceRef.current > 0 ? 1 : -1;

      wheelLockedRef.current = true;
      wheelDistanceRef.current = 0;

      moveOneCard(direction, true);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      stage.removeEventListener("wheel", handleWheel);
      if (wheelEndTimerRef.current !== null) {
        window.clearTimeout(wheelEndTimerRef.current);
      }
    };
  }, [moveOneCard, stopAutoplay]);

  useEffect(() => {
    autoplayTimerRef.current = window.setInterval(() => {
      if (autoplayStoppedRef.current || document.hidden) return;
      moveOneCard(1);
    }, 3000);

    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current);
      }
    };
  }, [moveOneCard]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!items || items.length === 0) return null;

  const activePackage = items[activeIndex];
  const customMessage = `Hello ${siteConfig.name}, I would like to enquire about the ${activePackage.title} package for ${activePackage.destination}. Please provide more details and pricing.`;
  const wa = whatsappLink(customMessage);

  const variables = {
    "--card-size": `${cardSize}px`,
  } as CSSProperties;

  return (
    <>
      <style>{styles}</style>

      <div className="perspective-carousel-wrapper">
        <section
          className="carousel"
          style={variables}
          role="region"
          aria-roledescription="carousel"
          aria-label="Tour Packages Carousel"
        >
          <div ref={stageRef} className="carousel-stage">
            <div className="carousel-track">
              <div className="deck-shadow" />

              {items.map((pkg, index) => (
                <div
                  key={`${pkg.slug}-shadow`}
                  ref={(node) => {
                    shadowRefs.current[index] = node;
                  }}
                  className="card-shadow"
                  aria-hidden="true"
                />
              ))}

              {items.map((pkg, index) => (
                <article
                  key={pkg.slug}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="carousel-card"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                  aria-hidden={index !== activeIndex}
                >
                  <Link to={`/packages/${pkg.slug}`} className="block w-full h-full">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="carousel-image"
                      draggable={false}
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="details">
            <div key={activeIndex} className="caption" aria-live="polite">
              <Link
                to="/packages/$slug"
                params={{ slug: activePackage.slug }}
                className="hover:text-secondary transition-colors"
              >
                <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                  {activePackage.title}
                </h3>
              </Link>

              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                {activePackage.destination}
              </p>

              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {activePackage.summary}
              </p>

              {activePackage.highlights && activePackage.highlights.length > 0 && (
                <ul className="mt-3.5 flex flex-wrap items-center justify-center gap-2 max-w-lg">
                  {activePackage.highlights.slice(0, 4).map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                <CalendarDays className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                {activePackage.price || "Price on request"}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <ButtonLink
                  to="/packages/$slug"
                  params={{ slug: activePackage.slug }}
                  variant="primary"
                  size="sm"
                >
                  View Details
                </ButtonLink>
                {wa ? (
                  <ButtonAnchor
                    href={wa}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="outline"
                    size="sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                  </ButtonAnchor>
                ) : (
                  <ButtonLink
                    to="/enquiry"
                    search={{ interest: activePackage.title }}
                    variant="outline"
                    size="sm"
                  >
                    Enquire Now
                  </ButtonLink>
                )}
              </div>
            </div>

            <div className="pagination" aria-hidden="true">
              {items.map((pkg, index) => (
                <span
                  key={pkg.slug}
                  className={`pagination-dot ${activeIndex === index ? "active" : ""}`}
                />
              ))}
            </div>

            <p className="scroll-hint">Scroll or swipe to explore</p>
          </div>
        </section>
      </div>
    </>
  );
}
