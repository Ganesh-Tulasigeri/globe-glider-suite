import { createFileRoute } from "@tanstack/react-router";
import vehicleCoach from "@/assets/vehicle-coach.jpg";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { vehicles } from "@/data/vehicles";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: `Car rental & fleet — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Chauffeur-driven sedans, MPVs, tempo travellers and coaches for airport transfers, city travel and group trips.",
      },
      { property: "og:title", content: `Car rental & fleet — ${siteConfig.name}` },
      { property: "og:description", content: "Sedans, MPVs, tempo travellers and coaches with drivers." },
      { property: "og:url", content: "/vehicles" },
    ],
    links: [{ rel: "canonical", href: "/vehicles" }],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <>
      <PageHero
        title="Car rental & fleet"
        description="Chauffeur-driven vehicles for every group size. Tell us the route and we will suggest the right one."
        image={vehicleCoach}
        crumbs={[{ label: "Car Rental" }]}
      />

      <section className="section">
        <div className="container-page">
          {vehicles.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Fleet details are being updated. Please get in touch for current availability.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
          <p className="mt-8 rounded-lg bg-muted p-4 text-xs text-muted-foreground">
            Seating, luggage capacity and features are indicative for each vehicle class and should be confirmed
            against the actual fleet. Rates are quoted per enquiry based on route, duration and season.
          </p>
        </div>
      </section>

      <CTASection title="Need help choosing a vehicle?" description="Send us your route, group size and luggage and we will recommend the best fit." />
    </>
  );
}
