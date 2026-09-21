import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, Check, Info, MapPin, MessageCircle, X } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { CTASection } from "@/components/common/CTASection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getPackage } from "@/data/packages";
import { siteConfig } from "@/config/site";
import { interestMessage, whatsappLink } from "@/lib/contact";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Package unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { pkg } = loaderData;
    return {
      meta: [
        { title: `${pkg.title} (${pkg.duration}) — ${siteConfig.name}` },
        { name: "description", content: pkg.summary },
        { property: "og:title", content: `${pkg.title} — ${siteConfig.name}` },
        { property: "og:description", content: pkg.summary },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/packages/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/packages/${params.slug}` }],
    };
  },
  notFoundComponent: PackageNotFound,
  component: PackageDetail,
});

function PackageNotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <h1 className="text-3xl text-primary">Package not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This tour package is no longer listed. Browse the current packages instead.
        </p>
        <ButtonLink to="/packages" variant="primary" size="md" className="mt-6">
          View all packages
        </ButtonLink>
      </div>
    </section>
  );
}

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const wa = whatsappLink(interestMessage(`${pkg.title} package`));

  return (
    <>
      <PageHero
        title={pkg.title}
        description={pkg.summary}
        image={pkg.image}
        crumbs={[{ label: "Tour Packages", to: "/packages" }, { label: pkg.title }]}
      >
        <span className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2 text-sm">
          <CalendarDays className="h-4 w-4" aria-hidden="true" /> {pkg.duration}
        </span>
        <span className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2 text-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" /> {pkg.destination}
        </span>
        <span className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
          {pkg.price || "Price on request"}
        </span>
      </PageHero>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {pkg.draft && (
              <p className="mb-6 flex items-start gap-2 rounded-lg border border-dashed border-border bg-muted/60 p-4 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Sample itinerary structure. Day-by-day details and pricing are placeholders until the final
                itinerary is confirmed — edit them in <code>src/data/packages.ts</code>.
              </p>
            )}

            <h2 className="text-2xl text-primary">Overview</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{pkg.summary}</p>

            <h3 className="mt-8 text-xl text-primary">Destinations covered</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pkg.destinations.map((d) => (
                <li key={d} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                  {d}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xl text-primary">Highlights</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {pkg.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl text-primary">Day-by-day itinerary</h3>
            <ol className="mt-4 space-y-4">
              {pkg.itinerary.map((day) => (
                <li key={day.day} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary">{day.day}</p>
                  <p className="mt-1 text-base font-semibold text-primary">{day.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{day.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-xl text-primary">Inclusions</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.inclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-primary">Exclusions</h3>
                <ul className="mt-3 space-y-2">
                  {pkg.exclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="mt-10 text-xl text-primary">Important information</h3>
            <ul className="mt-3 space-y-2">
              {pkg.importantInfo.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-semibold text-primary">{pkg.price || "Price on request"}</p>
              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink to="/enquiry" search={{ interest: pkg.title }} variant="accent" size="lg">
                  Enquire Now
                </ButtonLink>
                {wa && (
                  <ButtonAnchor href={wa} target="_blank" rel="noreferrer noopener" variant="outline" size="lg">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask on WhatsApp
                  </ButtonAnchor>
                )}
              </div>
            </div>
            <div className="mt-6">
              <EnquiryForm defaultInterest={pkg.title} />
            </div>
          </aside>
        </div>
      </section>

      <CTASection interest={`${pkg.title} package`} />
    </>
  );
}
