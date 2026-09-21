import destHills from "@/assets/dest-hills.jpg";
import destBackwaters from "@/assets/dest-backwaters.jpg";
import destHeritage from "@/assets/dest-heritage.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import vehicleVan from "@/assets/vehicle-van.jpg";
import vehicleCoach from "@/assets/vehicle-coach.jpg";
import airportImage from "@/assets/airport.jpg";
import corporateImage from "@/assets/corporate.webp";

export interface Service {
  slug: string;
  title: string;
  /** Card summary. */
  summary: string;
  /** Longer copy for the detail page. */
  intro: string;
  image: string;
  benefits: string[];
  process: { step: string; detail: string }[];
}

/**
 * Edit, add or remove services here — every services page updates automatically.
 * Copy is descriptive of a standard offering; confirm each one with the client
 * before publishing, and delete any service that is not actually provided.
 */
export const services: Service[] = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    summary:
      "Punctual pickups and drops with flight tracking, meet-and-greet and fixed, agreed-upon fares.",
    intro:
      "Door-to-terminal and terminal-to-door transfers for early departures and late arrivals. The vehicle and driver are assigned in advance, and the fare is confirmed before the trip so there are no surprises at the end of the ride.",
    image: airportImage,
    benefits: [
      "Pickup time planned around your flight schedule",
      "Driver contact details shared before the journey",
      "Luggage-appropriate vehicle suggested at booking",
      "Fare confirmed in writing before travel",
    ],
    process: [
      { step: "Share your flight details", detail: "Send the date, time, terminal and passenger count." },
      { step: "Receive a quote", detail: "We confirm the vehicle and the total fare." },
      { step: "Get driver details", detail: "Name and number are shared ahead of pickup." },
      { step: "Travel", detail: "The driver waits at the agreed point and tracks delays." },
    ],
  },
  {
    slug: "local-sightseeing",
    title: "Local Sightseeing",
    summary: "Half-day and full-day city tours with a driver who knows the routes and timings.",
    intro:
      "A flexible sightseeing day built around the places you want to see. Routes are planned to avoid backtracking, and the itinerary can be adjusted on the day if you want longer at a particular stop.",
    image: destHeritage,
    benefits: [
      "Itinerary planned around opening hours",
      "Stops can be added or skipped on the day",
      "Air-conditioned vehicles",
      "Driver familiar with local routes and parking",
    ],
    process: [
      { step: "Tell us your interests", detail: "Temples, markets, viewpoints, museums or a mix." },
      { step: "Get a suggested route", detail: "We send a realistic plan for the hours available." },
      { step: "Confirm", detail: "Approve the plan and the fare." },
      { step: "Enjoy the day", detail: "Travel at your own pace with the vehicle at your disposal." },
    ],
  },
  {
    slug: "outstation-travel",
    title: "Outstation Travel",
    summary: "One-way and round-trip intercity journeys with rest stops planned into the route.",
    intro:
      "Long-distance travel between cities in a vehicle sized for your group and luggage. Multi-day trips include driver accommodation arrangements and a clear breakdown of what is and is not included.",
    image: destHills,
    benefits: [
      "One-way or round-trip options",
      "Rest and meal stops built into long routes",
      "Multi-day trips supported",
      "Transparent inclusion list before booking",
    ],
    process: [
      { step: "Send your route", detail: "Start point, destinations and travel dates." },
      { step: "Choose a vehicle", detail: "We recommend options by group size and luggage." },
      { step: "Confirm the quote", detail: "Inclusions and exclusions are listed in writing." },
      { step: "Travel", detail: "Your driver follows the agreed route and schedule." },
    ],
  },
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    summary: "Employee transport, client pickups and event logistics with consolidated billing.",
    intro:
      "Regular or one-off travel arrangements for businesses, including guest pickups, staff shuttles and conference logistics. Reporting and billing can be consolidated to suit your accounts process.",
    image: corporateImage,
    benefits: [
      "Recurring and on-demand bookings",
      "Presentable vehicles for client pickups",
      "Single point of contact for coordination",
      "Consolidated billing on request",
    ],
    process: [
      { step: "Share your requirement", detail: "Frequency, routes and expected volumes." },
      { step: "Agree terms", detail: "Vehicles, rates and billing cycle are set out." },
      { step: "Book as needed", detail: "Raise requests by phone, WhatsApp or email." },
      { step: "Receive reports", detail: "Trip summaries provided with each billing cycle." },
    ],
  },
  {
    slug: "tour-packages",
    title: "Tour Packages",
    summary: "Ready-made and fully custom multi-day itineraries with transport and planning included.",
    intro:
      "Curated routes for popular destinations plus completely custom itineraries built around your dates, pace and budget. Every package can be shortened, extended or reshaped.",
    image: destBackwaters,
    benefits: [
      "Ready itineraries you can adjust",
      "Fully custom trips planned from scratch",
      "Transport included throughout",
      "Assistance available during the trip",
    ],
    process: [
      { step: "Pick a package or idea", detail: "Start from a listed package or describe your plan." },
      { step: "Get a day-by-day plan", detail: "We share an itinerary with timings and stops." },
      { step: "Refine it", detail: "Swap days, add nights or change the pace." },
      { step: "Confirm and travel", detail: "Final costing is shared before departure." },
    ],
  },
  {
    slug: "group-and-family-trips",
    title: "Group & Family Trips",
    summary: "Vans and coaches for family holidays, school trips, weddings and pilgrimages.",
    intro:
      "Larger vehicles and multi-vehicle convoys for groups travelling together, with coordination between drivers so everyone arrives at the same time.",
    image: vehicleCoach,
    benefits: [
      "Vans and coaches for large groups",
      "Multi-vehicle coordination",
      "Space planned for luggage",
      "Suitable for weddings, pilgrimages and school trips",
    ],
    process: [
      { step: "Tell us the group size", detail: "Passengers, luggage and travel dates." },
      { step: "Vehicle plan", detail: "We propose the right mix of vehicles." },
      { step: "Confirm", detail: "Approve the plan and the total cost." },
      { step: "Travel together", detail: "Drivers coordinate stops throughout the trip." },
    ],
  },
  {
    slug: "vehicle-rental",
    title: "Vehicle Rental",
    summary: "Hourly, daily and monthly chauffeur-driven rentals across our fleet.",
    intro:
      "Hire a vehicle with a driver for as long as you need it — a few hours in the city, a full day of meetings, or a monthly arrangement for ongoing travel.",
    image: vehicleVan,
    benefits: [
      "Hourly, daily and monthly options",
      "Choice of sedans, MPVs, vans and coaches",
      "Chauffeur included",
      "Extendable on the day, subject to availability",
    ],
    process: [
      { step: "Choose a vehicle", detail: "Browse the fleet and pick a category." },
      { step: "Set the duration", detail: "Hours, days or a monthly arrangement." },
      { step: "Confirm the rate", detail: "Rates and usage limits are agreed upfront." },
      { step: "Drive off", detail: "The vehicle and driver arrive at your pickup point." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
