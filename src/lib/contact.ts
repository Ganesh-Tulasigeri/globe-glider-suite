import { siteConfig } from "@/config/site";

/** True when a WhatsApp number has been configured in src/config/site.ts. */
export const hasWhatsApp = () => siteConfig.whatsappNumber.trim().length > 0;
export const hasPhone = () => siteConfig.phone.trim().length > 0;
export const hasEmail = () => siteConfig.email.trim().length > 0;

/**
 * Builds a wa.me deep link with a pre-filled message.
 * Returns null when no number is configured so callers can hide the CTA.
 */
export function whatsappLink(message?: string): string | null {
  if (!hasWhatsApp()) return null;
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(
    message?.trim() || `Hello ${siteConfig.name}, I would like to know more about your travel services.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function telLink(): string | null {
  return hasPhone() ? `tel:${siteConfig.phone.replace(/\s/g, "")}` : null;
}

export function mailtoLink(subject?: string): string | null {
  if (!hasEmail()) return null;
  return `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

/** Pre-filled message for a specific tour package or service. */
export const interestMessage = (item: string) =>
  `Hello ${siteConfig.name}, I am interested in the ${item}. Please provide more details.`;

/** Indian-friendly but generic phone validation: 7-15 digits, optional +. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return /^\+?[\d\s()-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}
