import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { siteConfig } from "@/config/site";
import { hasEmail } from "@/lib/contact";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${siteConfig.name}` },
      {
        name: "description",
        content: "How enquiry details shared with us are used, stored and protected.",
      },
      { property: "og:title", content: `Privacy Policy — ${siteConfig.name}` },
      { property: "og:description", content: "How we handle the details you share with us." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <section className="section">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p className="rounded-xl border border-dashed border-border bg-muted/60 p-5">
            This is a general template. Have it reviewed against the laws that apply to the business before the site
            goes live, and add any details specific to how the business operates.
          </p>

          <div>
            <h2 className="text-xl text-foreground">Information we collect</h2>
            <p className="mt-3">
              We collect only what you choose to send us through the enquiry form or a message: your name, phone
              number, optional email address, travel dates, group size and any notes about your trip.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">How we use it</h2>
            <p className="mt-3">
              Your details are used to reply to your enquiry, prepare a quote and arrange the trip. We do not sell or
              rent your information, and we do not send marketing messages unless you ask us to.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">Where it goes</h2>
            <p className="mt-3">
              Enquiries are delivered directly to the business — by WhatsApp and, where configured, to a form delivery
              service. This website does not keep its own copy of your enquiry.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">Cookies and analytics</h2>
            <p className="mt-3">
              This website does not set advertising cookies. If analytics or a chat tool is added later, this page will
              be updated to say so.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">Your choices</h2>
            <p className="mt-3">
              You can ask us to delete the details you sent, or correct anything that is wrong, at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">Contact</h2>
            <p className="mt-3">
              {hasEmail() ? (
                <>
                  For anything related to privacy, write to{" "}
                  <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                    {siteConfig.email}
                  </a>
                  .
                </>
              ) : (
                <>Contact details will be listed here once they are added to the site configuration.</>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
