import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import type { TourPackage } from "@/data/packages";
import { interestMessage, whatsappLink } from "@/lib/contact";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const wa = whatsappLink(interestMessage(`${pkg.title} package`));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={pkg.image}
          alt={`${pkg.title} — ${pkg.destination}`}
          loading="lazy"
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
          {pkg.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg text-primary">
          <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="hover:text-secondary">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-secondary" aria-hidden="true" />
          {pkg.destination}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>

        <ul className="mt-4 flex flex-wrap items-start content-start gap-2">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
            >
              {h}
            </li>
          ))}
        </ul>
        <div className="flex-1" />

        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          <CalendarDays className="h-4 w-4 text-secondary" aria-hidden="true" />
          {pkg.price || "Price on request"}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink to="/packages/$slug" params={{ slug: pkg.slug }} variant="primary" size="sm">
            View Details
          </ButtonLink>
          {wa ? (
            <ButtonAnchor href={wa} target="_blank" rel="noreferrer noopener" variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </ButtonAnchor>
          ) : (
            <ButtonLink to="/enquiry" search={{ interest: pkg.title }} variant="outline" size="sm">
              Enquire Now
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}
