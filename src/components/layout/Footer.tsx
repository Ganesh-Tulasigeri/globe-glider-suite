import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { hasEmail, hasPhone, telLink, whatsappLink } from "@/lib/contact";

const socialIcons = [
  { key: "facebook" as const, Icon: Facebook, label: "Facebook" },
  { key: "instagram" as const, Icon: Instagram, label: "Instagram" },
  { key: "youtube" as const, Icon: Youtube, label: "YouTube" },
  { key: "x" as const, Icon: Twitter, label: "X" },
];

export function Footer() {
  const wa = whatsappLink();
  const tel = telLink();
  const year = new Date().getFullYear();
  const socials = socialIcons.filter(({ key }) => siteConfig.social[key]);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{siteConfig.description}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socials.map(({ key, Icon, label }) => (
                <li key={key}>
                  <a
                    href={siteConfig.social[key]}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            {siteConfig.address && (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
            )}
            {hasPhone() && tel && (
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={tel} className="hover:text-primary-foreground">
                  {siteConfig.phoneDisplay || siteConfig.phone}
                </a>
              </li>
            )}
            {hasEmail() && (
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-primary-foreground">
                  {siteConfig.email}
                </a>
              </li>
            )}
            {wa && (
              <li className="flex gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={wa} target="_blank" rel="noreferrer noopener" className="hover:text-primary-foreground">
                  Chat on WhatsApp
                </a>
              </li>
            )}
            {!siteConfig.address && !hasPhone() && !hasEmail() && (
              <li className="text-primary-foreground/60">
                Contact details are configured in <code>src/config/site.ts</code>.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/70 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
