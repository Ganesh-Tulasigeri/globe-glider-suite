import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-input px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted",
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span className="whitespace-nowrap lg:hidden">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
