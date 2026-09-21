import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms & Conditions — ${siteConfig.name}` },
      {
        name: "description",
        content: "The terms that apply to bookings, quotes, cancellations and travel arranged through us.",
      },
      { property: "og:title", content: `Terms & Conditions — ${siteConfig.name}` },
      { property: "og:description", content: "Terms that apply to bookings and travel arranged through us." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Quotes and bookings",
    body: "Prices shown or quoted are valid for the dates and route discussed. A booking is confirmed only once we acknowledge it in writing or by message.",
  },
  {
    title: "Payments",
    body: "Payment terms, advance amounts and accepted payment methods are confirmed with each quote. Add the business's actual payment terms here before publishing.",
  },
  {
    title: "Cancellations and changes",
    body: "Cancellation and rescheduling terms are confirmed at the time of booking. Add the business's actual cancellation policy here before publishing.",
  },
  {
    title: "Vehicles and drivers",
    body: "Vehicles are allotted by category. An equivalent vehicle may be provided if the exact model is unavailable. Drivers follow applicable traffic rules and permitted driving hours.",
  },
  {
    title: "Traveller responsibilities",
    body: "Travellers are responsible for carrying valid identification, being ready at agreed pickup times and for their own belongings during the journey.",
  },
  {
    title: "Circumstances beyond our control",
    body: "Weather, road closures, strikes, breakdowns and similar events can affect timings or routes. We will always work to find a reasonable alternative.",
  },
  {
    title: "Liability",
    body: "Our responsibility is limited to the transport and arrangements we agree to provide. Add any statutory limits or insurance details that apply before publishing.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="section">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p className="rounded-xl border border-dashed border-border bg-muted/60 p-5">
            This is a general template. Replace the marked sections with {siteConfig.name}'s real policies and have
            them reviewed before the site goes live.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl text-foreground">{section.title}</h2>
              <p className="mt-3">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
