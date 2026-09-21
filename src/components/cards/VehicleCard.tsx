import { Briefcase, MessageCircle, Snowflake, Users } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import type { Vehicle } from "@/data/vehicles";
import { interestMessage, whatsappLink } from "@/lib/contact";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const wa = whatsappLink(interestMessage(`${vehicle.name} (${vehicle.type})`));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} — ${vehicle.type}`}
          loading="lazy"
          width={1008}
          height={704}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg text-primary">{vehicle.name}</h3>
            <p className="text-sm text-muted-foreground">{vehicle.type}</p>
          </div>
          <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
            {vehicle.price || "Price on request"}
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/80">
          <li className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-secondary" aria-hidden="true" />
            {vehicle.seats} seats
          </li>
          {vehicle.luggage && (
            <li className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-secondary" aria-hidden="true" />
              {vehicle.luggage}
            </li>
          )}
          {vehicle.airConditioning && (
            <li className="inline-flex items-center gap-1.5">
              <Snowflake className="h-4 w-4 text-secondary" aria-hidden="true" />
              {vehicle.airConditioning}
            </li>
          )}
        </ul>

        {vehicle.features.length > 0 && (
          <ul className="mt-3 flex flex-wrap items-start content-start gap-2">
            {vehicle.features.map((f) => (
              <li
                key={f}
                className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="flex-1" />

        <div className="mt-5 flex flex-wrap gap-2">
          <ButtonLink to="/enquiry" search={{ interest: vehicle.name }} variant="primary" size="sm">
            Enquire Now
          </ButtonLink>
          {wa && (
            <ButtonAnchor href={wa} target="_blank" rel="noreferrer noopener" variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </ButtonAnchor>
          )}
        </div>
      </div>
    </article>
  );
}
