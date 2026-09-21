import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import heroRoad from "@/assets/hero-road.jpg";
import { PageHero } from "@/components/common/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: `Enquiry — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Send an enquiry for airport transfers, chauffeur-driven car rental, sightseeing trips or a custom tour package.",
      },
      { property: "og:title", content: `Enquiry — ${siteConfig.name}` },
      { property: "og:description", content: "Send your trip details and get a clear quote." },
      { property: "og:url", content: "/enquiry" },
    ],
    links: [{ rel: "canonical", href: "/enquiry" }],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    interest: typeof search["interest"] === "string" ? (search["interest"] as string) : "",
  }),
  component: EnquiryPage,
});

const points = [
  "Share your route, dates and number of travellers.",
  "We confirm a suitable vehicle and driver for the trip.",
  "You receive a written quote before anything is booked.",
];

function EnquiryPage() {
  const { interest } = Route.useSearch();
  return (
    <>
      <PageHero
        title="Send an enquiry"
        description="A few details are enough to get started — we will take it from there."
        image={heroRoad}
        crumbs={[{ label: "Enquiry" }]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 className="text-2xl">How it works</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
              Enquiries are not stored on this website. They are delivered straight to the business, so nothing is
              lost in an inbox you cannot see.
            </p>
          </div>

          <div>
            <EnquiryForm defaultInterest={interest} />
          </div>
        </div>
      </section>
    </>
  );
}
