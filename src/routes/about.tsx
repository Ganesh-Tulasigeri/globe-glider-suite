import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Clock, Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import destHills from "@/assets/dest-hills.jpg";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { siteConfig } from "@/config/site";
import Counter from "@/components/ui/Counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${siteConfig.name} — Travel & tourism services` },
      {
        name: "description",
        content:
          "Who we are, how we plan trips and what travellers can expect when booking transport or a tour package with us.",
      },
      { property: "og:title", content: `About ${siteConfig.name}` },
      { property: "og:description", content: "How we plan trips and what travellers can expect." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

/**
 * REAL NUMBERS ONLY. Add facts you can stand behind and a stats bar appears
 * automatically, e.g.
 *   { value: 12, label: "Years in business", note: "Serving travellers since 2014" }
 * While this list is empty, no numbers are shown.
 */
const stats: { value: number; label: string; note?: string }[] = [];

const expectations = [
  { Icon: ShieldCheck, title: "Experienced drivers", text: "Drivers who know the roads, and vehicles checked before every trip." },
  { Icon: Compass, title: "Routes planned for you", text: "Stops, timings and rest breaks are set around your group, not a fixed template." },
  { Icon: Clock, title: "On-time pickups", text: "Pickup times are planned with traffic and flight schedules in mind." },
  { Icon: Sparkles, title: "Clean, comfortable vehicles", text: "Air-conditioned vehicles matched to your group size and luggage." },
  { Icon: BadgeCheck, title: "Quoted in writing", text: "Inclusions and exclusions are confirmed before you travel." },
  { Icon: HeartHandshake, title: "Support on the road", text: "One point of contact you can reach during the journey." },
];

function About() {
  return (
    <>
      <PageHero
        title="About us"
        description="Cab services and tour packages with professional drivers, planned around your dates, your group and your pace."
        image={destHills}
        crumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              title="Reliable travel, planned around you"
              description={`${siteConfig.name} combines clean vehicles and experienced drivers with carefully planned routes, so every journey is comfortable, safe and easy to arrange.`}
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Every trip starts with a conversation. Tell us where you are going, when, and who is
              travelling. We suggest the right vehicle, a sensible route with rest stops, and a
              driver who knows the road.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Whether it is an airport transfer, a family holiday, a corporate booking or a temple
              and beach tour, you get a clear quote in writing before anything is confirmed.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={aboutTeam}
              alt="Professional driver beside a clean white sedan"
              loading="lazy"
              width={1200}
              height={912}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Numbers: only shown once real figures are added above */}
      {stats.length > 0 && (
        <section className="section bg-surface py-10">
          <div className="container-page">
            <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <Counter target={stat.value} className="text-4xl font-bold text-secondary" />
                  <span className="text-sm font-medium text-foreground">{stat.label}</span>
                  {stat.note && <span className="text-xs text-muted-foreground">{stat.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What to expect */}
      <section className={`section ${stats.length > 0 ? "" : "bg-surface"}`}>
        <div className="container-page">
          <SectionHeading title="What you can expect on every trip" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expectations.map(({ Icon, title, text }) => (
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

      {/* Where we operate */}
      <section className={`section ${stats.length > 0 ? "bg-surface" : ""}`}>
        <div className="container-page max-w-3xl text-center">
          <SectionHeading title="Where we operate" align="center" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We are based in Karnataka and run local sightseeing, airport transfers, outstation
            journeys and multi-day tours to popular temple towns, beaches and hill destinations.
            Tell us where you want to go and we will plan the route.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
