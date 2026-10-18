import { useEffect, useRef, useState } from "react";
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
 * Optional PHONE-ONLY version of a place's photo (a tall, portrait crop that you make yourself).
 * Save it in src/assets/ as  <name>-mobile.jpg  (for example udupi-mobile.jpg). Phones then show
 * that picture; if the file is missing, the normal photo is used instead.
 */
const mobilePhoto = (name: string): string | undefined =>
  ["jpg", "jpeg", "png", "webp"].map((ext) => photo(`${name}-mobile.${ext}`)).find(Boolean);

/**
 * EDIT HERE: the big background photos and the round thumbnails on the right.
 *
 * Optional `focus` = which part of the photo must stay in view when it is cropped to fit a
 * screen (most noticeable on phones). Use "left", "center" (the default), "right", or a
 * percentage like "70% 50%" (first number = left to right, second = top to bottom).
 * Example: a lighthouse on the right side of a photo -> focus: "right".
 * Click a thumbnail (or a dot) to switch the background. Add, remove or reorder
 * entries freely. On larger screens the thumbnail column shows 5 at a time, with the
 * selected one in the middle, so a longer list still fits on the screen.
 */
const allSlides: {
  image: string | undefined;
  mobileImage?: string | undefined;
  name: string;
  place: string;
  focus?: string | undefined;
}[] = [
  { image: photo("udupi.jpg"), mobileImage: mobilePhoto("udupi"), name: "Udupi", place: "Temple Town" },
  { image: photo("kollur.jpg"), mobileImage: mobilePhoto("kollur"), name: "Kollur", place: "Mookambika Temple" },
  { image: murudeshwar, mobileImage: mobilePhoto("murudeshwara"), name: "Murudeshwara", place: "Coastal Karnataka" },
  { image: gokarna, mobileImage: mobilePhoto("gokarna"), name: "Gokarna", place: "Beaches & Temples" },
  { image: photo("hampi.jpg"), mobileImage: mobilePhoto("hampi"), name: "Hampi", place: "Ancient Ruins" },
  { image: photo("jog-falls.jpg"), mobileImage: mobilePhoto("jog-falls"), name: "Jog Falls", place: "Sharavathi Waterfalls" },
  { image: photo("bandipur.jpg"), mobileImage: mobilePhoto("bandipur"), name: "Bandipur Tiger Safari", place: "Wildlife Reserve" },
  { image: mysore, mobileImage: mobilePhoto("mysore"), name: "Mysore", place: "Heritage City" },
  { image: coorg, mobileImage: mobilePhoto("coorg"), name: "Coorg", place: "Misty Hills" },
  { image: chikkamagaluru, mobileImage: mobilePhoto("chikkamagaluru"), name: "Chikkamagaluru", place: "Coffee Country" },
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

  // Phone: keep the selected circle in the middle of the swipeable row.
  const phoneRow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = phoneRow.current;
    const selected = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!row || !selected || row.clientWidth === 0) return;
    const offset =
      selected.getBoundingClientRect().left -
      row.getBoundingClientRect().left -
      (row.clientWidth - selected.offsetWidth) / 2;
    row.scrollBy({ left: offset, behavior: reduced ? "auto" : "smooth" });
  }, [current, reduced]);

  // Move on by itself; restarts the countdown whenever the visitor picks a slide.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, paused, reduced]);

  // ---------------------------------------------------------------------------
  // Two completely separate layouts. Only one is visible at a time (CSS), so a change to
  // the phone layout can never affect the laptop layout, and the other way round.
  // ---------------------------------------------------------------------------

  /** Place name + headline + paragraph + button. */
  const renderCopy = (phone: boolean) => (
    <div className={phone ? "max-w-lg" : "max-w-md lg:max-w-xl"}>
      {/* Names the place shown in the photo right now */}
      <p
        key={current}
        className={cn(
          "mb-4 inline-flex max-w-full animate-in fade-in items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 font-semibold text-white backdrop-blur-sm duration-700",
          phone ? "text-sm" : "text-base",
        )}
      >
        <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate">{slides[current].name}</span>
        <span className="hidden truncate font-normal text-white/75 sm:inline">· {slides[current].place}</span>
      </p>

      <h1
        className={cn(
          "font-bold leading-[1.1] tracking-tight text-white",
          phone ? "text-3xl sm:text-4xl" : "text-5xl",
        )}
      >
        Travel made simple, from the first call to the last mile
      </h1>
      <p className={cn("mt-4 leading-relaxed text-zinc-200", phone ? "text-base" : "text-lg")}>
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
  );

  /** Round thumbnails. Phone: a swipeable row. Laptop: a curved column of 5 with the selected one in the middle. */
  const renderThumbs = (phone: boolean) => (
    <div
      ref={phone ? phoneRow : undefined}
      role="group"
      aria-label="Choose a destination photo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={
        phone
          ? "hero-row-scroll mr-16 mt-7 flex items-end gap-3 overflow-x-auto pt-1 sm:gap-4"
          : "flex flex-col items-end gap-4"
      }
      style={
        phone
          ? {
              // Soft fade on the right edge so the row looks like it continues, instead of a hard cut.
              WebkitMaskImage: "linear-gradient(to right, black 82%, transparent)",
              maskImage: "linear-gradient(to right, black 82%, transparent)",
            }
          : { position: "absolute", right: "4rem", top: "50%", transform: "translateY(-50%)" }
      }
    >
      {slides.map((slide, index) => {
        // How many steps this place is from the selected one (negative = before it, wraps around).
        const count = slides.length;
        let offset = (index - current) % count;
        if (offset > count / 2) offset -= count;
        else if (offset < -count / 2) offset += count;
        const active = offset === 0;
        const distance = Math.abs(offset);
        const inWindow = distance <= 2; // laptop: the selected place plus 2 either side

        if (phone) {
          return (
            <button
              key={slide.name}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show ${slide.name}, ${slide.place}`}
              aria-pressed={active}
              className="group flex shrink-0 flex-col items-center gap-1.5"
            >
              <img
                src={slide.image}
                alt=""
                loading="lazy"
                width={160}
                height={160}
                className={cn(
                  "rounded-full object-cover transition-all duration-500",
                  active ? "h-16 w-16 ring-4 ring-white" : "h-11 w-11 opacity-80 ring-2 ring-white/40",
                )}
              />
              <span className="flex max-w-[4.8rem] flex-col items-center text-center">
                <span
                  className={cn(
                    "w-full truncate font-bold leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]",
                    active ? "text-xs text-white" : "text-[11px] text-white/80",
                  )}
                >
                  {slide.name}
                </span>
                <span className="w-full truncate text-[9px] leading-tight text-white/70 drop-shadow">{slide.place}</span>
              </span>
            </button>
          );
        }

        return (
          <button
            key={slide.name}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show ${slide.name}, ${slide.place}`}
            aria-pressed={active}
            // Each circle shifts left the further it is from the selected one, which forms the curve.
            style={{ order: offset + 2, transform: `translateX(${-distance * 22}px)` }}
            className={cn(
              "group flex shrink-0 flex-row items-center gap-3 transition-transform duration-500",
              !inWindow && "hidden",
            )}
          >
            <span className="text-right">
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
            <img
              src={slide.image}
              alt=""
              loading="lazy"
              width={160}
              height={160}
              // Size set inline: 144px for the selected circle, 80px for the others.
              style={{ width: active ? 144 : 80, height: active ? 144 : 80 }}
              className={cn(
                "shrink-0 rounded-full object-cover transition-all duration-500",
                active ? "ring-4 ring-white" : "opacity-80 ring-2 ring-white/40 group-hover:opacity-100",
              )}
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ============================ LAPTOP / TABLET (768px and wider) ============================ */}
      <section
        className="relative isolate hidden items-end overflow-hidden bg-black text-white md:flex"
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
            style={{ objectPosition: slide.focus ?? "center" }}
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
        <div className="w-full px-14 pb-16 pt-24 lg:px-16">
          {renderCopy(false)}
          {renderThumbs(false)}
        </div>

        {/* Dots, far right */}
        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2.5">
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

      {/* ============================ PHONE (narrower than 768px) ============================ */}
      <section
        className="relative isolate flex items-end overflow-hidden bg-black text-white md:hidden"
        style={{ minHeight: "100dvh" }}
      >
        {/* Background photos, cross-fading. Uses your phone-only picture (<name>-mobile.jpg) when it exists, otherwise the normal photo aligned by its `focus` setting. */}
        {slides.map((slide, index) => (
          <img
            key={slide.name}
            src={slide.mobileImage ?? slide.image}
            alt={index === current ? slide.name : ""}
            aria-hidden={index !== current}
            width={1920}
            height={1088}
            fetchPriority={index === 0 ? "high" : "auto"}
            style={{ objectPosition: slide.focus ?? "center" }}
            className={cn(
              "absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              index === current ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {/* Dark layer so the text is easy to read on any photo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Hides the thin scrollbar line under the phone circles row */}
        <style>{`.hero-row-scroll{scrollbar-width:none;-ms-overflow-style:none}.hero-row-scroll::-webkit-scrollbar{display:none}`}</style>

        <div className="w-full px-6 pb-6 pt-28 sm:px-10">
          {renderCopy(true)}
          {renderThumbs(true)}
        </div>
      </section>
    </>
  );
}
