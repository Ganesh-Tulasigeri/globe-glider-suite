"use client";
import React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/llogo.png";
import logoDark from "@/assets/dlogo.png";

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
          "relative flex flex-col bg-background/90 backdrop-blur-lg shadow-sm overflow-hidden transition-all duration-300 border",
          isAtTop ? "rounded-none border-x-transparent border-t-transparent border-b-border" : "rounded-full border-border"
        )}
      >
        {children}
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
    <Link to="/" className="flex items-center gap-2 shrink-0 relative z-20" aria-label={`${siteConfig.name} home`}>
      <img src={logoSrc} alt="Logo" className="h-10 w-auto md:h-12" width={48} height={48} />
      <span className="font-display text-lg font-semibold tracking-tight text-primary dark:text-accent md:text-xl hidden sm:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}

export function NavItems({ items }: { items: { name: string; link: string }[] }) {
  return (
    <div className="flex items-center gap-6">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.link as any}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-xl transition-colors",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-muted text-foreground hover:bg-muted/80",
        className
      )}
    >
      {children}
    </button>
  );
}

export function MobileNav({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col md:hidden w-full">{children}</div>;
}

export function MobileNavHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-2 w-full relative z-20">
      {children}
    </div>
  );
}

export function MobileNavToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-foreground p-1" aria-label="Toggle Menu">
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
          className="overflow-hidden"
        >
          <div className="flex flex-col px-6 pb-6 pt-2 gap-4 border-t border-border/50">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
