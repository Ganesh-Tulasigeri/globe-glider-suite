import { createFileRoute } from "@tanstack/react-router";
import destHills from "@/assets/dest-hills.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials, testimonialsArePlaceholders } from "@/data/testimonials";
import { siteConfig } from "@/config/site";

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
          {testimonialsArePlaceholders && (
            <p className="mb-8 rounded-lg border border-dashed border-border bg-muted/60 p-4 text-sm text-muted-foreground">
              These entries are placeholders showing how reviews will appear. They are not real customer feedback —
              replace them with genuine, permission-given reviews in <code>src/data/testimonials.ts</code>.
            </p>
          )}
          {testimonials.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No reviews published yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection title="Travelled with us?" description="We would appreciate a short review — send it over on WhatsApp and we will add it here." />
    </>
  );
}
