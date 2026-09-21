import { createFileRoute } from "@tanstack/react-router";
import destHeritage from "@/assets/dest-heritage.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Travel services — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Airport transfers, local sightseeing, outstation travel, corporate travel, tour packages, group trips and vehicle rental.",
      },
      { property: "og:title", content: `Travel services — ${siteConfig.name}` },
      { property: "og:description", content: "Transfers, sightseeing, outstation travel, tours and vehicle rental." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our services"
        description="Everything from a single airport pickup to a fully planned multi-day route, with the same vehicle standards throughout."
        image={destHeritage}
        crumbs={[{ label: "Services" }]}
      />

      <section className="section">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
