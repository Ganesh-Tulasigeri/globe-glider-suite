import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { navLinks } from "@/config/site";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

/**
 * One primary action across the whole site: "Book Now" -> /enquiry.
 * The dark-mode toggle was removed from the header to keep it uncluttered.
 * The .dark theme in styles.css is untouched, so it can be added back later.
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mappedNavItems = navLinks.map((link) => ({
    name: link.label,
    link: link.to,
  }));

  return (
    <div className="relative w-full z-50">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={mappedNavItems} />
          <NavbarButton href="/enquiry" variant="primary">
            Book Now
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className={isMobileMenuOpen ? "bg-background/95 dark:bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-xl" : ""}>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {mappedNavItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link as any}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-foreground dark:text-foreground/90 font-bold py-2 text-base sm:text-lg hover:text-primary transition-colors"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                href="/enquiry"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book Now
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
