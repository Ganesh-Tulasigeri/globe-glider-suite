import { useEffect, useState, type CSSProperties } from "react";
import murudeshwar from "@/assets/murudeshwara.jpg";
import mysore from "@/assets/mysore-tour.jpg";
import coorg from "@/assets/coorg-tour.jpg";
import gokarna from "@/assets/gokarna-tour.jpg";
import chikkamagaluru from "@/assets/chikamagaluru-tour.jpg";
import { ButtonLink } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * EDIT HERE: the big background photos and the round thumbnails on the right.
 * Click a thumbnail (or a dot) to switch the background. Add, remove or reorder
 * entries freely; 4 to 6 looks best.
 */
const slides = [
  { image: murudeshwar, name: "Murudeshwar", place: "Coastal Karnataka" },
  { image: mysore, name: "Mysore", place: "Heritage City" },
  { image: coorg, name: "Coorg", place: "Misty Hills" },
  { image: gokarna, name: "Gokarna", place: "Beaches & Temples" },
  { image: chikkamagaluru, name: "Chikkamagaluru", place: "Coffee Country" },
];

/** Seconds the background stays before moving on by itself. */
const AUTOPLAY_MS = 6000;

export function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respect the "reduce motion" device setting: no automatic changes.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Move on by itself; restarts the countdown whenever the visitor picks a slide.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, paused, reduced]);

  return (
    <section
      className="relative isolate flex items-end overflow-hidden bg-black text-white"
      // Inline style so the height can never be lost: screen height minus the navbar.
      style={{ minHeight: "max(36rem, calc(100vh - 5rem))" }}
    >
      {/* Background photos, cross-fading */}
      {slides.map((slide, index) => (
        <img
          key={slide.name}
          src={slide.image}
          alt={index === current ? slide.name : ""}
          aria-hidden={index !== current}
          width={1920}
          height={1088}
          fetchPriority={index === 0 ? "high" : "auto"}
          className={cn(
            "absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Dark layers so the text is easy to read on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

      {/* Text, bottom left */}
      <div className="container-page w-full pb-10 pt-24 md:pb-16">
        <div className="max-w-lg md:max-w-md lg:max-w-xl">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 p-1 pr-4 text-xs backdrop-blur-sm sm:text-sm">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
              {siteConfig.name}
            </span>
            <span className="truncate text-white/90">{siteConfig.tagline}</span>
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Travel made simple, from the first call to the last mile
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-100 md:text-lg">
            Chauffeur-driven vehicles, airport transfers, day trips and multi-day tour packages,
            planned around your dates, your group and your pace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/enquiry" variant="accent" size="lg">
              Get a Free Quote
            </ButtonLink>
            <ButtonLink
              to="/packages"
              variant="onDark"
              size="lg"
              className="border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              Explore Packages
            </ButtonLink>
          </div>
        </div>

        {/* Round thumbnails: a row under the text on phones, a curved column on the right on larger screens */}
        <div
          role="group"
          aria-label="Choose a destination photo"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-8 flex items-center gap-3 md:absolute md:right-16 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:flex-col md:items-end md:gap-4"
        >
          {slides.map((slide, index) => {
            const active = index === current;
            const distance = Math.abs(index - current);
            return (
              <button
                key={slide.name}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show ${slide.name}, ${slide.place}`}
                aria-pressed={active}
                // Each circle shifts left the further it is from the active one, which forms the curve.
                style={{ "--arc-x": `${-distance * 22}px` } as CSSProperties}
                className="group flex items-center gap-3 transition-transform duration-500 md:[transform:translateX(var(--arc-x))]"
              >
                <span className="hidden text-right md:block">
                  <span className="block text-sm font-semibold leading-tight drop-shadow">{slide.name}</span>
                  <span className="block text-xs text-white/80 drop-shadow">{slide.place}</span>
                </span>
                <img
                  src={slide.image}
                  alt=""
                  loading="lazy"
                  width={160}
                  height={160}
                  className={cn(
                    "rounded-full object-cover transition-all duration-500",
                    active
                      ? "h-16 w-16 ring-4 ring-white/70 md:h-28 md:w-28"
                      : "h-12 w-12 opacity-80 ring-2 ring-white/40 group-hover:opacity-100 md:h-20 md:w-20",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Dots, far right (larger screens) */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to ${slide.name}`}
            aria-current={index === current}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all",
              index === current ? "scale-125 bg-white" : "bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
