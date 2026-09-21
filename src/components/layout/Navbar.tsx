import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/config/site";
import { telLink } from "@/lib/contact";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import logoLight from "@/assets/llogo.png";
import logoDark from "@/assets/dlogo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tel = telLink();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const logoSrc = isDark ? logoDark : logoLight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4 md:h-24">
        <Link to="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <img src={logoSrc} alt="" className="h-16 w-auto md:h-20" width={80} height={80} />
          <span className="font-display text-lg font-semibold tracking-tight text-primary dark:text-accent md:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-secondary bg-muted" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:ml-auto lg:flex">
          <div className="flex flex-col items-end gap-1">
            <ButtonLink to="/enquiry" variant="accent" size="sm" className="self-center">
              Enquire Now
            </ButtonLink>
            {tel && (
              <ButtonAnchor
                href={tel}
                variant="outline"
                size="sm"
                className="px-2 py-1.5 text-right leading-none"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phoneDisplay || "Call us"}
              </ButtonAnchor>
            )}
          </div>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-20 z-50 overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <div className="container-page flex justify-end pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-sm text-muted-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" /> Close
            </button>
          </div>
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-secondary bg-muted" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-row items-center justify-center gap-2">
              <ButtonLink to="/enquiry" variant="accent" size="lg" onClick={() => setOpen(false)} className="flex-1 justify-center">
                Enquire Now
              </ButtonLink>
              {tel && (
                <ButtonAnchor href={tel} variant="outline" size="lg" className="flex-1 justify-center px-2 py-2 text-right leading-none">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phoneDisplay || "Call us"}
                </ButtonAnchor>
              )}
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <ThemeToggle className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
