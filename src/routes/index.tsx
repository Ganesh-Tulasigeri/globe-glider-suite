import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CarFront,
  Clock,
  HeartHandshake,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import heroRoad from "@/assets/hero-road.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";
import { testimonials, testimonialsArePlaceholders } from "@/data/testimonials";

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

const whyChooseUs = [
  { Icon: ShieldCheck, title: "Safety first", text: "Vehicles are checked before every trip and driven by experienced chauffeurs." },
  { Icon: RouteIcon, title: "Customised trips", text: "Routes, stops and timings are planned around your plans, not a fixed template." },
  { Icon: BadgeCheck, title: "Transparent pricing", text: "Inclusions and exclusions are confirmed in writing before you travel." },
  { Icon: CarFront, title: "Comfortable vehicles", text: "Clean, air-conditioned vehicles sized for your group and luggage." },
  { Icon: Clock, title: "On-time pickups", text: "Pickup times are planned with traffic and flight schedules in mind." },
  { Icon: HeartHandshake, title: "Support while travelling", text: "One point of contact you can reach during the journey." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden text-primary-foreground md:min-h-[78vh]">
        <img
          src={heroRoad}
          alt="Vehicle travelling along a winding mountain road at sunrise"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/35" />
        <div className="container-page py-20 md:py-28">
          <p className="reveal text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {siteConfig.tagline}
          </p>
          <h1 className="reveal mt-4 max-w-3xl text-4xl leading-[1.08] md:text-6xl">
            Travel made simple, from the first call to the last mile
          </h1>
          <p className="reveal mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Chauffeur-driven vehicles, airport transfers, day trips and multi-day tour packages —
            planned around your dates, your group and your pace.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/enquiry" variant="accent" size="lg">
              Plan Your Trip
            </ButtonLink>
            <ButtonLink to="/packages" variant="onDark" size="lg">
              Explore Packages
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={aboutTeam}
              alt="Chauffeur standing beside a clean sedan ready for a pickup"
              loading="lazy"
              width={1200}
              height={912}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="About us"
              title="A travel partner, not just a ride"
              description="We arrange transport and itineraries for travellers, families and businesses — from a single airport pickup to a multi-day tour. Every trip is quoted clearly and handled by one point of contact."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Chauffeur-driven fleet", "Custom itineraries", "Airport & outstation travel", "Corporate accounts"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <ButtonLink to="/about" variant="primary" size="md" className="mt-7">
              Read More
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around how people actually travel"
            description="From a quick airport run to a planned multi-day route, each service is quoted upfront and staffed by a driver who knows the roads."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink to="/services" variant="outline" size="md">
              View all services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Vehicles */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Car rental"
              title="Pick a vehicle that fits your group"
              description="Sedans for city runs, MPVs for families, tempo travellers and coaches for groups."
            />
            <ButtonLink to="/vehicles" variant="outline" size="md">
              See the fleet
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Tour packages"
            title="Routes worth taking your time over"
            description="Start from one of these itineraries or ask us to build something entirely around your dates."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Why choose us" title="What you can expect on every trip" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Gallery preview */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Gallery" title="Places we travel to" />
            <ButtonLink to="/gallery" variant="outline" size="md">
              Open gallery
            </ButtonLink>
          </div>
          <div className="mt-8">
            <GalleryGrid limit={8} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Reviews" title="What travellers say" align="center" />
          {testimonialsArePlaceholders && (
            <p className="mx-auto mt-4 max-w-2xl rounded-lg bg-muted p-3 text-center text-xs text-muted-foreground">
              Sample content: these are placeholder reviews, not real customer feedback.
            </p>
          )}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="text-sm font-semibold text-secondary hover:underline">
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
