import { createFileRoute } from "@tanstack/react-router";
import destBackwaters from "@/assets/dest-backwaters.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery — ${siteConfig.name}` },
      {
        name: "description",
        content: "Photos of the destinations we travel to, the vehicles in our fleet and trips on the road.",
      },
      { property: "og:title", content: `Gallery — ${siteConfig.name}` },
      { property: "og:description", content: "Destinations, vehicles and trips in pictures." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        description="Destinations, vehicles and moments from the road. Click any photo to view it larger."
        image={destBackwaters}
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="section">
        <div className="container-page">
          <GalleryGrid showFilters />
        </div>
      </section>
      <CTASection />
    </>
  );
}
