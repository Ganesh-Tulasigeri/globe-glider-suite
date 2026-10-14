import { createFileRoute } from "@tanstack/react-router";
import destBeach from "@/assets/dest-beach.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { PackageCard } from "@/components/cards/PackageCard";
import { packages } from "@/data/packages";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: `Tour packages — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Temple, beach and coastal tour packages from Udupi, Gokarna, Goa, Dharmasthala and more, with transport included. Every itinerary can be customised to your dates.",
      },
      { property: "og:title", content: `Tour packages — ${siteConfig.name}` },
      { property: "og:description", content: "Multi-day itineraries with transport included, customisable to your dates." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <>
      <PageHero
        title="Tour packages"
        description="Ready-made routes you can take as they are, shorten, extend or rebuild from scratch."
        image={destBeach}
        crumbs={[{ label: "Tour Packages" }]}
      />

      <section className="section">
        <div className="container-page">
          {packages.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              New packages are being prepared. Contact us for a custom itinerary in the meantime.
            </p>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.slug} pkg={pkg} />
                ))}
              </div>
              <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
                Prices depend on your dates, group size and vehicle. Tap Get a Quote on any package and we
                will send a written quote.
              </p>
            </>
          )}
        </div>
      </section>

      <CTASection title="Want a trip built from scratch?" description="Send your dates, interests and budget and we will draft an itinerary for you." />
    </>
  );
}
