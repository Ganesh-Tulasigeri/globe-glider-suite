import { createFileRoute } from "@tanstack/react-router";
import destHills from "@/assets/dest-hills.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { siteConfig } from "@/config/site";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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

const dummyReviews = [
  { quote: "Excellent service! The driver was on time and the vehicle was spotless. Will definitely book again for our next trip.", name: "Ravi Kumar", title: "Trip to Coorg" },
  { quote: "We booked a family tour package and everything was perfectly arranged. Highly recommend Lifetime Travels!", name: "Priya Sharma", title: "Ooty Package Tour" },
  { quote: "The airport transfer was smooth and stress-free. Our driver waited patiently even when our flight was delayed.", name: "Arun Mehta", title: "Airport Transfer" },
  { quote: "Best road trip experience. The chauffeur was knowledgeable about local spots and made our trip memorable.", name: "Sunita Reddy", title: "Wayanad Day Trip" },
  { quote: "Transparent pricing, no hidden charges. Booked a multi-day tour and every detail was taken care of.", name: "Kiran Nair", title: "Kerala Tour Package" },
  { quote: "Very comfortable vehicle for a group of 8. The driver was professional and courteous throughout the journey.", name: "Deepa Menon", title: "Munnar Group Tour" },
  { quote: "Outstanding experience from start to finish. The team was responsive and the driver knew all the best routes.", name: "Ananya Pillai", title: "Kodaikanal Trip" },
  { quote: "Booked last minute and they accommodated us perfectly. Reliable, friendly and affordable. 5 stars!", name: "Sanjay Bhat", title: "Day Trip – Mysore" },
];

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
          <div className="mt-4 overflow-hidden">
            <InfiniteMovingCards items={dummyReviews} direction="right" speed="slow" />
          </div>
          <div className="mt-8 overflow-hidden">
            <InfiniteMovingCards items={dummyReviews} direction="left" speed="medium" />
          </div>
        </div>
      </section>
      <CTASection title="Travelled with us?" description="We would appreciate a short review — send it over on WhatsApp and we will add it here." />
    </>
  );
}
