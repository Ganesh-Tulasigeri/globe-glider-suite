/**
 * SINGLE SOURCE OF TRUTH for all business information.
 *
 * Every value below is intentionally blank or generic until the client
 * supplies real details. Nothing here is invented. Components read from this
 * file only — no contact detail is hardcoded anywhere else.
 *
 * Empty strings are handled gracefully in the UI:
 *  - blank phone / whatsapp / email  -> the related button or line is hidden
 *  - blank mapEmbedUrl               -> the map block shows a short notice
 */

export interface SiteConfig {
  /** Public brand name shown in the navbar, footer and page titles. */
  name: string;
  /** Short one-line positioning statement. */
  tagline: string;
  /** 2-3 sentence description used in the footer and meta descriptions. */
  description: string;
  /** Path or URL to a logo image. Blank = the name is rendered as a wordmark. */
  logoUrl: string;
  /** E.164-ish phone number for tel: links, e.g. "+919876543210". */
  phone: string;
  /** Human readable version of the phone number, e.g. "+91 98765 43210". */
  phoneDisplay: string;
  /** Digits only, with country code, no "+" — required by wa.me links. */
  whatsappNumber: string;
  email: string;
  address: string;
  /** e.g. "Mon - Sun, 7:00 AM - 10:00 PM". Blank = hidden. */
  businessHours: string;
  /** Full Google Maps *embed* URL (iframe src). Blank = notice shown. */
  mapEmbedUrl: string;
  /** Optional HTTPS endpoint (Formspree / Web3Forms / custom) for enquiries. */
  formEndpoint: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    x: string;
  };
}


export const siteConfig: SiteConfig = {
  name: "Lifetime Travels",
  tagline: "Comfortable journeys, planned around you",
  description:
    "A travel and tourism service offering chauffeur-driven vehicles, airport transfers, sightseeing trips and custom tour packages.",
  logoUrl: "",
  phone: "+91 98765 43210",
  phoneDisplay: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "",
  address: "",
  businessHours: "",
  mapEmbedUrl: "",
  formEndpoint: "",
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    x: "",
  },
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Car Rental", to: "/vehicles" },
  { label: "Tour Packages", to: "/packages" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
] as const;
