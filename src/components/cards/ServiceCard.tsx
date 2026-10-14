import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 focus-within:ring-2 focus-within:ring-ring hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg text-primary">
          {/* The ::after layer stretches this link over the whole card, so the full card is clickable. */}
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        <span
          className="mt-4 inline-flex text-secondary transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}
