import { createFileRoute } from "@tanstack/react-router";
import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import destHills from "@/assets/dest-hills.jpg";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { siteConfig } from "@/config/site";

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

const values = [
  { Icon: ShieldCheck, title: "Reliability", text: "A confirmed booking means a vehicle and driver are held for you." },
  { Icon: Compass, title: "Local knowledge", text: "Routes and timings are planned by people who drive them regularly." },
  { Icon: HeartHandshake, title: "Straight answers", text: "Clear inclusions, clear costs and no pressure to upgrade." },
  { Icon: Sparkles, title: "Comfort", text: "Clean, well-kept vehicles matched to your group size and luggage." },
];

function About() {
  return (
    <>
      <PageHero
        title="About us"
        description="A travel and tourism service built around dependable transport and itineraries that suit real travel days."
        image={destHills}
        crumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Transport and trip planning under one roof"
              description="We arrange chauffeur-driven vehicles and complete itineraries for individuals, families and companies. Whether it is a single airport transfer or a week-long route, the same team handles the planning, the vehicle and the follow-up."
            />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Every enquiry gets a written plan: the route, the vehicle, the driver arrangement and the total cost.
              Nothing is added afterwards. If plans change mid-trip, we adjust where we can and tell you plainly
              when we cannot.
            </p>
            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              Company history, years in operation, fleet size and customer numbers are deliberately left out until
              the business supplies verified figures. Add them in this section once confirmed.
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={aboutTeam}
              alt="Chauffeur in uniform beside a clean white sedan"
              loading="lazy"
              width={1200}
              height={912}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Our values" title="What guides the way we work" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                <h3 className="mt-4 text-base text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Service areas" title="Where we operate" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.address
                ? `Our base is ${siteConfig.address}, and we travel to destinations across the surrounding region.`
                : "Add the operating base and the regions covered here once the business confirms them."}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Why customers stay" title="Repeat travel, not one-off rides" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Most of the work comes from people who travelled once and came back — for a family holiday, a client
              pickup or a pilgrimage. Consistent drivers, clean vehicles and honest quoting are what make that happen.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
