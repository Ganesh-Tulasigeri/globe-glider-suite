import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import destHeritage from "@/assets/dest-heritage.jpg";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonAnchor } from "@/components/common/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { siteConfig } from "@/config/site";
import { hasEmail, hasPhone, mailtoLink, telLink, whatsappLink } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Get in touch to plan a trip, book a chauffeur-driven vehicle or ask about a tour package. Call, WhatsApp or send an enquiry.",
      },
      { property: "og:title", content: `Contact — ${siteConfig.name}` },
      {
        property: "og:description",
        content: "Call, WhatsApp or send an enquiry to plan your journey.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const wa = whatsappLink();
  const tel = telLink();
  const mail = mailtoLink(`Enquiry — ${siteConfig.name}`);
  const noDetails = !hasPhone() && !hasEmail() && !wa && !siteConfig.address;

  return (
    <>
      <PageHero
        title="Contact us"
        description="Tell us your dates, route and group size. We will reply with a plan and a clear quote."
        image={destHeritage}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading
              eyebrow="Reach us"
              title="Contact details"
              description="The quickest reply usually comes over WhatsApp."
            />

            {noDetails ? (
              <p className="rounded-xl border border-dashed border-border bg-muted/60 p-5 text-sm text-muted-foreground">
                Contact details have not been added yet. Add the phone number, WhatsApp number, email address and
                office address in <code>src/config/site.ts</code> and they will appear here and across the site.
              </p>
            ) : (
              <ul className="space-y-5 text-sm">
                {hasPhone() && tel && (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href={tel} className="text-muted-foreground underline-offset-4 hover:underline">
                        {siteConfig.phoneDisplay || siteConfig.phone}
                      </a>
                    </div>
                  </li>
                )}
                {wa && (
                  <li className="flex gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Start a chat
                      </a>
                    </div>
                  </li>
                )}
                {hasEmail() && mail && (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href={mail} className="break-all text-muted-foreground underline-offset-4 hover:underline">
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                )}
                {siteConfig.address && (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground">{siteConfig.address}</p>
                    </div>
                  </li>
                )}
                {siteConfig.businessHours && (
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-foreground">Hours</p>
                      <p className="text-muted-foreground">{siteConfig.businessHours}</p>
                    </div>
                  </li>
                )}
              </ul>
            )}

            {(wa || tel) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {wa && (
                  <ButtonAnchor href={wa} target="_blank" rel="noreferrer noopener" variant="accent">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
                  </ButtonAnchor>
                )}
                {tel && (
                  <ButtonAnchor href={tel} variant="outline">
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call now
                  </ButtonAnchor>
                )}
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-lg">Find us</h2>
              {siteConfig.mapEmbedUrl ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    src={siteConfig.mapEmbedUrl}
                    title={`Map showing the location of ${siteConfig.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0"
                  />
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/60 p-5 text-sm text-muted-foreground">
                  A map will appear here once a Google Maps embed link is added to{" "}
                  <code>src/config/site.ts</code>.
                </p>
              )}
            </div>
          </div>

          <div id="enquiry-form">
            <SectionHeading
              eyebrow="Enquiry"
              title="Send us your trip details"
              description="Fill in the form and we will get back to you with options."
            />
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
