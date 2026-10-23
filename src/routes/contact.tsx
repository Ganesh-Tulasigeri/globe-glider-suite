import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import destHeritage from "@/assets/dest-heritage.jpg";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
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
          "Get in touch to plan a trip, book a vehicle with driver or ask about a tour package. Call, WhatsApp or send an enquiry.",
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
              title="Contact details"
              description="The quickest reply usually comes over WhatsApp."
            />

            {noDetails ? (
              <p className="rounded-xl border border-dashed border-border bg-muted/60 p-5 text-sm text-muted-foreground">
                Contact details have not been added yet. Add the phone number, WhatsApp number, email address and
                office address in <code>src/config/site.ts</code> and they will appear here and across the site.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Primary tap-to-contact buttons — large, easy to tap on phone */}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-4 rounded-2xl border-2 border-[#25D366] bg-[#25D366]/5 px-5 py-4 transition-colors hover:bg-[#25D366]/10 active:scale-[0.98]"
                  >
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#25D366", color: "#fff" }}
                    >
                      <MessageCircle className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Tap to start a chat — quickest reply</p>
                    </div>
                  </a>
                )}

                {hasPhone() && tel && (
                  <a
                    href={tel}
                    className="flex items-center gap-4 rounded-2xl border-2 border-primary/20 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10 active:scale-[0.98]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Phone className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">Call us</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.phoneDisplay || siteConfig.phone}
                      </p>
                    </div>
                  </a>
                )}

                {/* Secondary details — email, address, hours */}
                {(hasEmail() || siteConfig.address || siteConfig.businessHours) && (
                  <ul className="mt-2 space-y-5 border-t border-border pt-5 text-sm">
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
              </div>
            )}
          </div>

          <div id="enquiry-form">
            <SectionHeading
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
