import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartHandshake,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import { ButtonLink } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — Car rental, transfers & tour packages` },
      {
        name: "description",
        content:
          "Chauffeur-driven car rental, airport transfers, sightseeing and custom tour packages. Enquire on WhatsApp for a quick quote.",
      },
      { property: "og:title", content: `${siteConfig.name} — Travel & tourism services` },
      {
        property: "og:description",
        content: "Chauffeur-driven vehicles, airport transfers, sightseeing and tour packages.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* ------------------------------------------------------------------ */
/* EDIT HERE                                                           */
/* ------------------------------------------------------------------ */

/** Four short promises shown right under the hero. Keep them true. */
const trustPoints = [
  { Icon: ShieldCheck, title: "Experienced chauffeurs", text: "Vehicles checked before every trip." },
  { Icon: BadgeCheck, title: "Quoted in writing", text: "Inclusions confirmed before you travel." },
  { Icon: CarFront, title: "Clean AC vehicles", text: "Sized for your group and luggage." },
  { Icon: HeartHandshake, title: "Support on the road", text: "One contact during the journey." },
];

/** The cards in the "Why choose us" section (four, so they sit evenly in one row on wide screens). */
const whyChooseUs = [
  { Icon: ShieldCheck, title: "Safety first", text: "Vehicles are checked before every trip and driven by experienced chauffeurs." },
  { Icon: RouteIcon, title: "Customised trips", text: "Routes, stops and timings are planned around your plans, not a fixed template." },
  { Icon: BadgeCheck, title: "Transparent pricing", text: "Inclusions and exclusions are confirmed in writing before you travel." },
  { Icon: Clock, title: "On-time pickups", text: "Pickup times are planned with traffic and flight schedules in mind." },
];

/** Reviews come from src/data/testimonials.ts (one place for the whole site). The first six are shown here. */
const reviewItems = testimonials.slice(0, 6).map((t) => ({ quote: t.text, name: t.name, title: t.location }));

/* ------------------------------------------------------------------ */

/** Auto-scroll speed of the fleet strip, in pixels per second. Bigger = faster. */
const STRIP_SPEED = 50;

/**
 * Every vehicle in an endless, slowly moving strip that can ALSO be scrolled by hand
 * (swipe on phones, trackpad or shift+wheel, or the arrow buttons on desktop).
 * It pauses while the mouse is over it, while a card has keyboard focus, and for a
 * moment after any manual scrolling. The list is drawn three times so it loops in both
 * directions; only the middle copy is reachable with the Tab key.
 */
function VehicleStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [reduced, setReduced] = useState(false);

  const hold = () => {
    clearTimeout(timer.current);
    paused.current = true;
  };
  const pauseFor = (ms: number) => {
    hold();
    timer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  };

  // Respect the "reduce motion" device setting: no auto-scroll, hand scrolling only.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    // Keep the Tab order short: cards in the repeated copies are skipped by Tab (still clickable).
    el.querySelectorAll<HTMLElement>('[data-dup="true"] a, [data-dup="true"] button').forEach((node) => {
      node.tabIndex = -1;
    });
    if (reduced) return;

    const third = () => el.scrollWidth / 3;
    el.scrollLeft = third(); // start on the middle copy
    let pos = el.scrollLeft;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (paused.current) {
        pos = el.scrollLeft; // follow the visitor's own scrolling
      } else {
        pos += (STRIP_SPEED * dt) / 1000;
        el.scrollLeft = pos;
      }
      // Jump by exactly one copy to loop; the cards look identical, so no one sees the jump.
      const t = third();
      if (el.scrollLeft >= 2 * t) {
        el.scrollLeft -= t;
        pos = el.scrollLeft;
      } else if (el.scrollLeft < t) {
        el.scrollLeft += t;
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const nudge = (direction: 1 | -1) => {
    pauseFor(5000);
    scroller.current?.scrollBy({ left: direction * 640, behavior: "smooth" });
  };

  const copies = reduced ? [1] : [0, 1, 2];

  return (
    <div className="relative mt-10">
      <div
        ref={scroller}
        role="region"
        aria-label="Our vehicles"
        onMouseEnter={hold}
        onMouseLeave={() => pauseFor(600)}
        onFocus={hold}
        onBlur={() => pauseFor(600)}
        onTouchStart={hold}
        onTouchEnd={() => pauseFor(2500)}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pauseFor(2500);
        }}
        className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <div className="flex w-max">
          {copies.map((copy) =>
            vehicles.map((vehicle) => (
              <div
                key={`${copy}-${vehicle.id}`}
                data-dup={copy !== 1}
                aria-hidden={copy !== 1}
                className="flex w-80 shrink-0 pr-6 [&>article]:w-full"
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            )),
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous vehicles"
        onClick={() => nudge(-1)}
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-primary shadow-lift transition-colors hover:bg-muted md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next vehicles"
        onClick={() => nudge(1)}
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-primary shadow-lift transition-colors hover:bg-muted md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

function Home() {
  return (
    <>
      <CinematicHero />

      {/* Trust strip */}
      <section aria-label="Why travellers choose us" className="border-b border-border bg-card">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-primary">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            title="Services built around how people travel"
            description="From a quick airport run to a planned multi-day route, every service is quoted upfront."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-surface">
        <div className="container-page pb-0">
          <SectionHeading
            eyebrow="Tour packages"
            title="Routes worth taking your time over"
            description="Start from one of these itineraries or ask us to build something entirely around your dates."
            align="center"
          />
        </div>
        <div className="mt-8 w-full">
          <PerspectiveCarousel items={packages.slice(0, 10)} />
        </div>
        <div className="mt-8 text-center pb-16">
          <ButtonLink to="/packages" variant="primary" size="md">
            View All Packages
          </ButtonLink>
        </div>
      </section>

      {/* Vehicles: every vehicle in a slowly moving strip you can also scroll by hand */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Pick a vehicle that fits your group"
              description="Sedans for city runs, MPVs for families, tempo travellers and buses for groups."
            />
            <ButtonLink to="/vehicles" variant="outline" size="md">
              See the full fleet
            </ButtonLink>
          </div>
        </div>
        <VehicleStrip />
      </section>

      {/* About */}
      <section className="section bg-surface">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={aboutTeam}
              alt="Uniformed chauffeur beside a clean white sedan at a hotel entrance"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl text-primary md:text-4xl">Reliable rides, planned around you</h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
              {siteConfig.name} pairs a professional chauffeur-driven fleet with itineraries built
              for your group, your dates and your pace, so every journey is comfortable, safe and
              easy to plan.
            </p>
            <div className="mt-6">
              <ButtonLink to="/about" variant="outline" size="md">
                About us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Why choose us" title="What you can expect on every trip" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-secondary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviewItems.length > 0 && (
        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading eyebrow="Reviews" title="What travellers say" align="center" />
            <div className="mt-10 overflow-hidden">
              <InfiniteMovingCards items={reviewItems} direction="right" speed="slow" />
            </div>
            <div className="mt-8 text-center">
              <Link to="/reviews" className="text-sm font-semibold text-secondary hover:underline">
                Read all reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
