import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTASection } from "@/components/common/CTASection";
import { ButtonLink } from "@/components/common/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getService, services } from "@/data/services";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — ${siteConfig.name}` },
        { name: "description", content: service.summary },
        { property: "og:title", content: `${service.title} — ${siteConfig.name}` },
        { property: "og:description", content: service.summary },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <h1 className="text-3xl text-primary">Service not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This service page does not exist or has been renamed.
        </p>
        <ButtonLink to="/services" variant="primary" size="md" className="mt-6">
          View all services
        </ButtonLink>
      </div>
    </section>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={service.title}
        description={service.summary}
        image={service.image}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Overview" title={`About ${service.title.toLowerCase()}`} />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.intro}</p>

            <h3 className="mt-10 text-xl text-primary">Key benefits</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl text-primary">How it works</h3>
            <ol className="mt-4 space-y-4">
              {service.process.map((step, index) => (
                <li key={step.step} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-primary">{step.step}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 text-xl text-primary">Other services</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <ButtonLink to="/services/$slug" params={{ slug: other.slug }} variant="outline" size="sm">
                    {other.title}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <h2 className="text-xl text-primary">Enquire about {service.title.toLowerCase()}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send your dates and we will come back with a vehicle and a quote.
            </p>
            <div className="mt-5">
              <EnquiryForm defaultInterest={service.title} />
            </div>
          </aside>
        </div>
      </section>

      <CTASection interest={`${service.title} service`} />
    </>
  );
}
