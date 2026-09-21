import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5",
  accent: "bg-accent text-accent-foreground hover:brightness-105 hover:-translate-y-0.5",
  outline: "border border-input bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  onDark: "border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const buttonClasses = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

type LinkBaseProps = Omit<ComponentProps<typeof Link>, "params" | "search">;

/** Internal navigation button. */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps &
  LinkBaseProps & {
    params?: Record<string, string>;
    search?: Record<string, string>;
  }) {
  return (
    <Link
      className={buttonClasses(variant, size, className)}
      {...(props as unknown as ComponentProps<typeof Link>)}
    >
      {children}
    </Link>
  );
}

/** External / tel: / wa.me button. */
export function ButtonAnchor({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
