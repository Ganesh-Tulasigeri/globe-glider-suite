import { MessageCircle, Phone } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/contact";

interface Props {
  title?: string;
  description?: string;
  /** Pre-fills the WhatsApp message, e.g. a package name. */
  interest?: string;
}

export function CTASection({
  title = "Plan your next journey with us",
  description = "Tell us where you want to go and when. We will get back with a route, a vehicle and a clear quote.",
  interest,
}: Props) {
  const wa = whatsappLink(
    interest ? `Hello ${siteConfig.name}, I am interested in the ${interest}. Please provide more details.` : undefined,
  );
  const tel = telLink();

  return (
    <section className="section bg-secondary text-secondary-foreground">
      <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl leading-tight md:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/85 md:text-base">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/enquiry" variant="accent" size="lg">
            Enquire Now
          </ButtonLink>
          {wa && (
            <ButtonAnchor href={wa} target="_blank" rel="noreferrer noopener" variant="onDark" size="lg">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </ButtonAnchor>
          )}
          {tel && (
            <ButtonAnchor href={tel} variant="onDark" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call Us
            </ButtonAnchor>
          )}
        </div>
      </div>
    </section>
  );
}
