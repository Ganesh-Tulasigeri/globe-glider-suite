import { useEffect, useState, type CSSProperties } from "react";
import { MapPin } from "lucide-react";
import murudeshwar from "@/assets/murudeshwara.jpg";
import mysore from "@/assets/mysore-tour.jpg";
import coorg from "@/assets/coorg-tour.jpg";
import gokarna from "@/assets/gokarna-tour.jpg";
import chikkamagaluru from "@/assets/chikamagaluru-tour.jpg";
import { ButtonLink } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Photos for the NEW places are looked up by file name in src/assets/. A place whose photo
 * file is not there yet is simply skipped (nothing breaks), so you can add the photos one by
 * one. Just save each photo in src/assets/ with the exact file name shown below.
 */
const assetUrls = import.meta.glob("../../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const photo = (file: string): string | undefined => assetUrls[`../../assets/${file}`];

/**
 * EDIT HERE: the big background photos and the round thumbnails on the right.
 * Click a thumbnail (or a dot) to switch the background. Add, remove or reorder
 * entries freely. On larger screens the thumbnail column shows 5 at a time, with the
 * selected one in the middle, so a longer list still fits on the screen.
 */
const allSlides = [
  { image: photo("udupi.jpg"), name: "Udupi", place: "Temple Town" },
  { image: photo("kollur.jpg"), name: "Kollur", place: "Mookambika Temple" },
  { image: murudeshwar, name: "Murudeshwara", place: "Coastal Karnataka" },
  { image: gokarna, name: "Gokarna", place: "Beaches & Temples" },
  { image: photo("hampi.jpg"), name: "Hampi", place: "Ancient Ruins" },
  { image: photo("jog-falls.jpg"), name: "Jog Falls", place: "Sharavathi Waterfalls" },
  { image: photo("bandipur.jpg"), name: "Bandipur Tiger Safari", place: "Wildlife Reserve" },
  { image: mysore, name: "Mysore", place: "Heritage City" },
  { image: coorg, name: "Coorg", place: "Misty Hills" },
  { image: chikkamagaluru, name: "Chikkamagaluru", place: "Coffee Country" },
];

// Keep only the places that have a photo.
const slides = allSlides.flatMap((s) => (s.image ? [{ ...s, image: s.image }] : []));

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
      style={{ height: "100dvh", minHeight: "36rem" }}
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

      {/* Text, bottom left */}
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-10 pt-24 md:pb-16">
        <div className="max-w-lg md:max-w-md lg:max-w-xl">
          {/* Names the place shown in the background photo right now */}
          <p
            key={current}
            className="mb-4 inline-flex max-w-full animate-in fade-in items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm duration-700 md:text-base"
          >
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="truncate">{slides[current].name}</span>
            <span className="hidden truncate font-normal text-white/75 sm:inline">· {slides[current].place}</span>
          </p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Travel made simple, from the first call to the last mile
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
            Private cab rides, airport transfers and tour packages —
            planned around your dates, your group and your pace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
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
          className="mt-8 flex items-end gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar md:overflow-visible md:pb-0 md:pt-0 md:absolute md:right-16 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:flex-col md:items-end md:gap-4"
        >
          {slides.map((slide, index) => {
            // How many steps this place is from the selected one (negative = before it, wraps around).
            const count = slides.length;
            let offset = (index - current) % count;
            if (offset > count / 2) offset -= count;
            else if (offset < -count / 2) offset += count;
            const active = offset === 0;
            const distance = Math.abs(offset);
            const inWindow = distance <= 2; // larger screens show the selected place plus 2 either side
            return (
              <button
                key={slide.name}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show ${slide.name}, ${slide.place}`}
                aria-pressed={active}
                // Each circle shifts left the further it is from the active one, which forms the curve.
                style={{ "--arc-x": `${-distance * 22}px`, "--order": offset + 2 } as CSSProperties}
                className={cn(
                  "group shrink-0 flex flex-col items-center gap-1.5 transition-transform duration-500 md:flex-row md:gap-3 md:[transform:translateX(var(--arc-x))] md:[order:var(--order)]",
                  !inWindow && "md:hidden",
                )}
              >
                {/* Desktop label: shown to the left */}
                <span className="hidden text-right md:block">
                  <span
                    className={cn(
                      "block font-semibold leading-tight drop-shadow",
                      active ? "text-xl font-bold" : "text-sm",
                    )}
                  >
                    {slide.name}
                  </span>
                  <span className={cn("block drop-shadow", active ? "text-sm text-white" : "text-xs text-white/80")}>
                    {slide.place}
                  </span>
                </span>

                {/* Round thumbnail image */}
                <img
                  src={slide.image}
                  alt=""
                  loading="lazy"
                  width={160}
                  height={160}
                  className={cn(
                    "rounded-full object-cover transition-all duration-500",
                    active
                      ? "h-16 w-16 ring-4 ring-white md:h-36 md:w-36"
                      : "h-11 w-11 opacity-80 ring-2 ring-white/40 group-hover:opacity-100 md:h-20 md:w-20",
                  )}
                />

                {/* Mobile label: shown directly below the image */}
                <div className="flex flex-col items-center text-center md:hidden max-w-[4.8rem]">
                  <span
                    className={cn(
                      "font-bold leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate w-full transition-colors",
                      active ? "text-xs text-white" : "text-[11px] text-white/80"
                    )}
                  >
                    {slide.name}
                  </span>
                  <span className="text-[9px] text-white/70 drop-shadow leading-tight truncate w-full">
                    {slide.place}
                  </span>
                </div>
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
