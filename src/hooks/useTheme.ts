import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "lt-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Theme state shared by the navbar toggle. Defaults to light mode for first-time
 * visitors, remembers an explicit choice in localStorage, and syncs the `dark`
 * class on <html> which drives every color token.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  // Read the real theme after hydration to avoid a server/client mismatch.
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!window.localStorage.getItem(STORAGE_KEY)) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
