"use client";
import React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/llogo.png";
import logoDark from "@/assets/dlogo.png";

const NavbarContext = React.createContext<{ isAtTop: boolean }>({ isAtTop: true });

export function Navbar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest <= 50) {
      setIsAtTop(true);
      setHidden(false);
    } else {
      setIsAtTop(false);
      if (latest > previous && latest > 150) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 mx-auto w-full z-50 transition-all duration-300",
        isAtTop ? "top-0 max-w-full px-0" : "top-4 max-w-5xl px-4",
        className
      )}
    >
      <nav
        className={cn(
          "relative flex flex-col overflow-hidden transition-all duration-500 border",
          isAtTop
            ? "rounded-none border-transparent bg-transparent shadow-none"
            : "rounded-full border-border bg-background/90 backdrop-blur-lg shadow-sm"
        )}
      >
        <NavbarContext.Provider value={{ isAtTop }}>
          {children}
        </NavbarContext.Provider>
      </nav>
    </motion.div>
  );
}

export function NavBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:flex items-center justify-between px-6 py-2 w-full">
      {children}
    </div>
  );
}

export function NavbarLogo() {
  const [isDark, setIsDark] = React.useState(false);
  const { isAtTop } = React.useContext(NavbarContext);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 relative z-20" aria-label={`${siteConfig.name} home`}>
      <img src={logoSrc} alt="Logo" className="h-11 w-auto sm:h-12 md:h-14 transition-all duration-300" width={56} height={56} />
      <span
        className={cn(
          "font-display text-base sm:text-lg md:text-xl font-bold tracking-tight inline-block transition-colors duration-300",
          isAtTop ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-primary dark:text-accent font-bold"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}

export function NavItems({ items }: { items: { name: string; link: string }[] }) {
  const { isAtTop } = React.useContext(NavbarContext);
  return (
    <div className="flex items-center gap-6">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.link as any}
          className={cn(
            "text-sm font-bold tracking-wide transition-colors",
            isAtTop
              ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:text-white/80"
              : "text-foreground hover:text-primary"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export function NavbarButton({
  children,
  variant = "primary",
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const cls = cn(
    "px-4 py-2 text-sm font-medium rounded-xl transition-colors",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-muted text-foreground hover:bg-muted/80",
    className
  );

  if (href) {
    return (
      <Link to={href as any} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function MobileNav({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col md:hidden w-full transition-colors duration-300", className)}>{children}</div>;
}

export function MobileNavHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 sm:px-6 w-full relative z-20">
      {children}
    </div>
  );
}

export function MobileNavToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const { isAtTop } = React.useContext(NavbarContext);
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-xl transition-all flex items-center justify-center",
        isOpen
          ? "bg-muted text-foreground"
          : isAtTop
          ? "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-sm"
          : "bg-muted/80 text-foreground hover:bg-muted"
      )}
      aria-label="Toggle Menu"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

export function MobileNavMenu({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden border-t border-border/50"
        >
          <div className="flex flex-col px-6 pb-6 pt-3 gap-3">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
