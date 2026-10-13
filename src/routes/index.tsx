import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CarFront,
  Clock,
  HeartHandshake,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import heroRoad from "@/assets/hero-road.jpg";
import mysore from "@/assets/mysore-tour.jpg";
import coorg from "@/assets/coorg-tour.jpg";
import gokarna from "@/assets/gokarna-tour.jpg";
import destHills from "@/assets/dest-hills.jpg";
import destHeritage from "@/assets/dest-heritage.jpg";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import TextAnimation from "@/components/ui/staggerText";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { CinematicHero } from "@/components/ui/cinematic-hero";
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

const dummyReviews = [
  { quote: "Excellent service! The driver was on time and the vehicle was spotless. Will definitely book again for our next trip.", name: "Ravi Kumar", title: "Trip to Coorg" },
  { quote: "We booked a family tour package and everything was perfectly arranged. Highly recommend Lifetime Travels!", name: "Priya Sharma", title: "Ooty Package Tour" },
  { quote: "The airport transfer was smooth and stress-free. Our driver waited patiently even when our flight was delayed.", name: "Arun Mehta", title: "Airport Transfer" },
  { quote: "Best road trip experience. The chauffeur was knowledgeable about local spots and made our trip memorable.", name: "Sunita Reddy", title: "Wayanad Day Trip" },
  { quote: "Transparent pricing, no hidden charges. Booked a multi-day tour and every detail was taken care of.", name: "Kiran Nair", title: "Kerala Tour Package" },
  { quote: "Very comfortable vehicle for a group of 8. The driver was professional and courteous throughout the journey.", name: "Deepa Menon", title: "Munnar Group Tour" },
];

function Home() {
  return (
    <>
      <CinematicHero />





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

      {/* About us */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="About us"
            title="Who we are"
            description="Lifetime Travels offers reliable transport and custom itineraries, connecting you to unforgettable destinations."
            align="center"
          />
          <div className="mt-8 flex flex-col items-center">
            <p className="max-w-2xl text-center text-base text-muted-foreground">
              We combine a professional chauffeur‑driven fleet with expertly crafted itineraries, ensuring every journey is comfortable, safe, and memorable.
            </p>
            <ButtonLink to="/about" variant="primary" size="md" className="mt-6">
              Learn more
            </ButtonLink>
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
          <div className="mt-10 overflow-hidden">
            <InfiniteMovingCards items={dummyReviews} direction="right" speed="slow" />
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
