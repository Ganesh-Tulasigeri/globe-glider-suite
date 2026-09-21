import destHills from "@/assets/dest-hills.jpg";
import destBackwaters from "@/assets/dest-backwaters.jpg";
import destBeach from "@/assets/dest-beach.jpg";
import destHeritage from "@/assets/dest-heritage.jpg";

export interface TourPackage {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  /** Blank until the client confirms pricing — the UI shows "Price on request". */
  price: string;
  summary: string;
  image: string;
  highlights: string[];
  destinations: string[];
  /** Sample structure — replace day text with the client's real itinerary. */
  itinerary: { day: string; title: string; detail: string }[];
  inclusions: string[];
  exclusions: string[];
  importantInfo: string[];
  /** Set true while itinerary text is still a placeholder to show a notice. */
  draft: boolean;
}

export const packages: TourPackage[] = [
  {
    slug: "hill-country-escape",
    title: "Hill Country Escape",
    destination: "Hill stations & tea country",
    duration: "3 days / 2 nights",
    price: "",
    summary:
      "A short mountain break built around viewpoints, tea estates and easy walks, with unhurried driving days.",
    image: destHills,
    highlights: ["Sunrise viewpoint", "Tea estate visit", "Easy nature walk", "Local market stop"],
    destinations: ["Base city", "Hill town", "Tea estate belt"],
    itinerary: [
      { day: "Day 1", title: "Arrival and drive up", detail: "Pickup from your location, scenic drive to the hill town, evening free." },
      { day: "Day 2", title: "Viewpoints and tea country", detail: "Early viewpoint visit, tea estate tour, afternoon walk and local market." },
      { day: "Day 3", title: "Return", detail: "Relaxed morning, drive back with a lunch stop en route." },
    ],
    inclusions: ["Air-conditioned vehicle for the full trip", "Driver allowance", "Fuel and tolls", "Trip planning and support"],
    exclusions: ["Accommodation", "Meals", "Entry tickets and guide fees", "Anything not listed under inclusions"],
    importantInfo: [
      "Hill roads can be slow in rain; timings may shift.",
      "Carry warm clothing for early mornings.",
      "Final route is confirmed after your enquiry.",
    ],
    draft: true,
  },
  {
    slug: "backwater-retreat",
    title: "Backwater Retreat",
    destination: "Backwaters & waterways",
    duration: "2 days / 1 night",
    price: "",
    summary: "A slow-paced water route through palm-lined canals and village stops, ideal for a weekend.",
    image: destBackwaters,
    highlights: ["Canal cruise", "Village walk", "Sunset over the water", "Local cuisine stop"],
    destinations: ["Base city", "Backwater village", "Jetty town"],
    itinerary: [
      { day: "Day 1", title: "Drive and cruise", detail: "Morning drive to the jetty, afternoon cruise through the canals." },
      { day: "Day 2", title: "Village morning and return", detail: "Village walk after breakfast, then the return drive." },
    ],
    inclusions: ["Air-conditioned vehicle", "Driver allowance", "Fuel and tolls", "Trip planning and support"],
    exclusions: ["Boat or houseboat charges", "Accommodation and meals", "Entry tickets"],
    importantInfo: [
      "Boat availability varies by season and must be confirmed in advance.",
      "Mosquito repellent is recommended in the evenings.",
    ],
    draft: true,
  },
  {
    slug: "coastal-weekend",
    title: "Coastal Weekend",
    destination: "Beaches & coastline",
    duration: "2 days / 1 night",
    price: "",
    summary: "Beach time, a coastal drive and a sunset point, with flexible timings throughout.",
    image: destBeach,
    highlights: ["Coastal drive", "Beach afternoon", "Sunset point", "Seafood stop"],
    destinations: ["Base city", "Coastal town", "Sunset point"],
    itinerary: [
      { day: "Day 1", title: "Coast road", detail: "Drive along the coast with photo stops, afternoon at the beach, sunset point." },
      { day: "Day 2", title: "Morning beach and return", detail: "Free morning by the sea and the drive home." },
    ],
    inclusions: ["Air-conditioned vehicle", "Driver allowance", "Fuel and tolls", "Trip planning and support"],
    exclusions: ["Accommodation and meals", "Water sports and activity charges", "Entry tickets"],
    importantInfo: ["Swimming conditions vary by season; follow local safety flags."],
    draft: true,
  },
  {
    slug: "heritage-trail",
    title: "Heritage Trail",
    destination: "Temples & historic towns",
    duration: "4 days / 3 nights",
    price: "",
    summary: "A route through historic towns, temple complexes and craft centres at a comfortable pace.",
    image: destHeritage,
    highlights: ["Temple complexes", "Historic town walk", "Craft workshop visit", "Museum stop"],
    destinations: ["Base city", "Temple town", "Historic capital", "Craft village"],
    itinerary: [
      { day: "Day 1", title: "Drive to the temple town", detail: "Departure, lunch stop en route, evening temple visit." },
      { day: "Day 2", title: "Monuments day", detail: "Full day exploring the main heritage sites." },
      { day: "Day 3", title: "Crafts and markets", detail: "Workshop visit, market time, short museum stop." },
      { day: "Day 4", title: "Return", detail: "Morning at leisure, then the drive back." },
    ],
    inclusions: ["Air-conditioned vehicle for the full trip", "Driver allowance", "Fuel and tolls", "Trip planning and support"],
    exclusions: ["Accommodation and meals", "Monument entry fees", "Licensed guide charges"],
    importantInfo: [
      "Some temples have dress codes and photography restrictions.",
      "Monument timings and closures should be checked close to travel dates.",
    ],
    draft: true,
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
