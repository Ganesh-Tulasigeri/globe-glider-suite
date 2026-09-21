import sedan from "@/assets/vehicle-sedan.jpg";
import suv from "@/assets/vehicle-suv.jpg";
import van from "@/assets/vehicle-van.jpg";
import coach from "@/assets/vehicle-coach.jpg";

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  /** Passenger seats excluding the driver. */
  seats: number;
  /** e.g. "2 large + 2 cabin bags". Leave blank if unconfirmed. */
  luggage: string;
  /** "AC" | "Non-AC" | "" */
  airConditioning: string;
  features: string[];
  /** Leave blank until the client confirms pricing — the UI then shows "On request". */
  price: string;
}

/**
 * Fleet data. Add a vehicle by appending an object — no UI changes needed.
 * Seats, luggage and features are typical for each vehicle class and MUST be
 * verified against the client's actual fleet before going live. Prices are
 * intentionally blank.
 */
export const vehicles: Vehicle[] = [
  {
    id: "sedan",
    name: "Sedan",
    type: "Compact car",
    image: sedan,
    seats: 4,
    luggage: "2 large bags",
    airConditioning: "AC",
    features: ["City and airport runs", "Fuel efficient", "Comfortable for short trips"],
    price: "",
  },
  {
    id: "mpv",
    name: "MPV / SUV",
    type: "7-seater",
    image: suv,
    seats: 6,
    luggage: "3 large bags",
    airConditioning: "AC",
    features: ["Extra legroom", "Good for hill routes", "Family friendly"],
    price: "",
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    type: "Minibus",
    image: van,
    seats: 12,
    luggage: "Rear luggage space",
    airConditioning: "AC",
    features: ["Pushback seats", "Group travel", "Long-distance comfort"],
    price: "",
  },
  {
    id: "coach",
    name: "Tourist Coach",
    type: "Large bus",
    image: coach,
    seats: 35,
    luggage: "Under-floor luggage hold",
    airConditioning: "AC",
    features: ["Large groups", "Pilgrimage and school trips", "Onboard luggage hold"],
    price: "",
  },
];
