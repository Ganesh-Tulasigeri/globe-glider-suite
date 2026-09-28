import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, HeartHandshake, Languages, MapPin, ShieldCheck, Sparkles, Star, ThumbsUp } from "lucide-react";
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

const driverHighlights = [
  {
    Icon: Award,
    title: "Professionally Trained",
    text: "Every driver undergoes rigorous training in safe driving techniques, route knowledge and customer etiquette before they take the wheel.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified & Background Checked",
    text: "All drivers carry valid licences, are police-verified and undergo periodic re-checks so you always travel with someone you can trust.",
  },
  {
    Icon: MapPin,
    title: "Local Route Experts",
    text: "With 15+ years of driving across India, our drivers know every shortcut, rest stop and fuel station — ensuring smooth, stress-free journeys.",
  },
  {
    Icon: Languages,
    title: "Multilingual & Courteous",
    text: "Our drivers communicate in Kannada, Hindi, English and Tamil, making every passenger feel at home regardless of where they come from.",
  },
  {
    Icon: Star,
    title: "Consistently High-Rated",
    text: "Passengers rate our drivers 4.8+ on average for punctuality, politeness and professionalism across thousands of completed trips.",
  },
  {
    Icon: ThumbsUp,
    title: "Passenger-First Attitude",
    text: "From adjusting rest stops on a long drive to helping elderly passengers with luggage, our drivers go the extra mile — literally.",
  },
];

function About() {
  return (
    <>
      <PageHero
        title="About us"
        description="India's most trusted travel partner — delivering exceptional journeys for over 15 years."
        image={destHills}
        crumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="India's finest travel experience, for over 15 years"
              description="For more than 15 years, we have been the gold standard in chauffeur-driven travel across India. From pristine hill stations to sun-kissed coastlines, from ancient temples to buzzing cities — we have driven every road, planned every route and crafted every itinerary with one goal: to give you the most comfortable, safe and memorable journey of your life."
            />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We are not just a cab service — we are your travel companions. Over the years we have built an
              unmatched network of destinations, vehicles and local expertise that no other operator in India can
              match. Whether it is a family holiday, a corporate trip, a pilgrimage or a leisure tour, our team
              delivers nothing short of excellence every single time.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every journey is planned to the finest detail: the right vehicle for your group, the most scenic
              and efficient route, and a driver who knows the road like the back of his hand. Our promise is
              simple — you relax, we handle everything.
            </p>
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

      {/* Stats Bar */}
      <section className="section bg-surface py-10">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-secondary">15+</span>
              <span className="text-sm font-medium text-foreground">Years of Excellence</span>
              <span className="text-xs text-muted-foreground">Serving travellers since 2009</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-secondary">25+</span>
              <span className="text-sm font-medium text-foreground">Premium Vehicles</span>
              <span className="text-xs text-muted-foreground">Sedans, SUVs, vans & buses</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-secondary">1000+</span>
              <span className="text-sm font-medium text-foreground">Happy Customers</span>
              <span className="text-xs text-muted-foreground">Families, corporates & pilgrims</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-secondary">50+</span>
              <span className="text-sm font-medium text-foreground">Destinations Covered</span>
              <span className="text-xs text-muted-foreground">Across India, every season</span>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Highlights */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our drivers"
            title="Experienced, courteous and always at your service"
            description="The heart of our service is our team of hand-picked professional drivers — trained, verified and passionate about giving you the best travel experience on every trip."
            align="center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {driverHighlights.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                <h3 className="mt-4 text-base text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
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

      <section className="section bg-surface">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Service areas" title="Where we operate" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.address
                ? `Based out of ${siteConfig.address}, we operate pan-India covering hill stations, pilgrim circuits, coastal destinations, heritage cities and everything in between.`
                : "We operate across India — covering pilgrim circuits, hill stations, heritage cities and coastal destinations from our base in Karnataka."}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Why customers stay" title="15 years of trust, one trip at a time" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The majority of our bookings come from repeat travellers and referrals — families who came back for
              their next holiday, corporates who made us their preferred vendor, and pilgrims who wouldn't trust
              anyone else for the sacred journey. That loyalty is our greatest achievement.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
