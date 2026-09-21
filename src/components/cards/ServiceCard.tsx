import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
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
        <h3 className="text-lg text-primary">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:gap-2.5"
        >
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">about {service.title}</span>
        </Link>
      </div>
    </article>
  );
}
