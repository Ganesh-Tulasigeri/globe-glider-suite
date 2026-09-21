import destHills from "@/assets/dest-hills.jpg";
import destBackwaters from "@/assets/dest-backwaters.jpg";
import destBeach from "@/assets/dest-beach.jpg";
import destHeritage from "@/assets/dest-heritage.jpg";
import heroRoad from "@/assets/hero-road.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import sedan from "@/assets/vehicle-sedan.jpg";
import suv from "@/assets/vehicle-suv.jpg";
import van from "@/assets/vehicle-van.jpg";
import coach from "@/assets/vehicle-coach.jpg";

export type GalleryCategory = "Destinations" | "Tours" | "Vehicles" | "Company";

export interface GalleryImage {
  id: string;
  src: string;
  /** Descriptive alt text — keep meaningful for accessibility and SEO. */
  alt: string;
  category: GalleryCategory;
}

/** Replace these with the client's own photographs. */
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: destHills, alt: "Tea-covered hills at sunrise with a road curving through the slopes", category: "Destinations" },
  { id: "g2", src: destBackwaters, alt: "Traditional houseboat on calm backwaters lined with palm trees", category: "Destinations" },
  { id: "g3", src: destBeach, alt: "Sunset over a sandy beach with palm silhouettes", category: "Destinations" },
  { id: "g4", src: destHeritage, alt: "Carved stone temple architecture in warm daylight", category: "Destinations" },
  { id: "g5", src: heroRoad, alt: "Vehicle on a winding mountain road at golden hour", category: "Tours" },
  { id: "g6", src: aboutTeam, alt: "Chauffeur in uniform beside a clean white sedan at a hotel entrance", category: "Company" },
  { id: "g7", src: sedan, alt: "White sedan available for city and airport transfers", category: "Vehicles" },
  { id: "g8", src: suv, alt: "Silver seven-seater MPV for family travel", category: "Vehicles" },
  { id: "g9", src: van, alt: "White tempo traveller minibus for group travel", category: "Vehicles" },
  { id: "g10", src: coach, alt: "Tourist coach parked at a scenic viewpoint", category: "Vehicles" },
];

export const galleryCategories: GalleryCategory[] = ["Destinations", "Tours", "Vehicles", "Company"];
