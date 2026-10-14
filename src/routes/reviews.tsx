import { createFileRoute } from "@tanstack/react-router";
import destHills from "@/assets/dest-hills.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { siteConfig } from "@/config/site";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: `Reviews — ${siteConfig.name}` },
      { name: "description", content: "Feedback from travellers who booked transport and tour packages with us." },
      { property: "og:title", content: `Reviews — ${siteConfig.name}` },
      { property: "og:description", content: "Feedback from travellers who booked with us." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

// Reviews come from src/data/testimonials.ts (add or edit them there).
const reviewItems = testimonials.map((t) => ({ quote: t.text, name: t.name, title: t.location }));

function ReviewsPage() {
  return (
    <>
      <PageHero
        title="Reviews"
        description="What travellers say after their trip."
        image={destHills}
        crumbs={[{ label: "Reviews" }]}
      />
      <section className="section">
        <div className="container-page">
          {reviewItems.length > 0 ? (
            <>
              <div className="mt-4 overflow-hidden">
                <InfiniteMovingCards items={reviewItems} direction="right" speed="slow" />
              </div>
              <div className="mt-8 overflow-hidden">
                <InfiniteMovingCards items={reviewItems} direction="left" speed="medium" />
              </div>
            </>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Reviews will appear here soon.
            </p>
          )}
        </div>
      </section>
      <CTASection title="Travelled with us?" description="We would appreciate a short review — send it over on WhatsApp and we will add it here." />
    </>
  );
}
