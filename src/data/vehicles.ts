import sedan from "@/assets/vehicle-sedan.jpg";
import suv from "@/assets/vehicle-suv.jpg";
import van from "@/assets/vehicle-van.jpg";
import coach from "@/assets/vehicle-coach.jpg";
import bus from "@/assets/bus.jpg";
import swiftDzire from "@/assets/vehicle-swift-dzire.jpg";
import ertiga from "@/assets/vehicle-ertiga.jpg";
import urbania from "@/assets/vehicle-urbania.jpg";

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
  /** Leave blank until pricing is confirmed. A blank price is simply not shown on the card. */
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
    name: "Etios",
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
    name: "Innova Crysta",
    type: "Premium MPV",
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
    type: "Mini bus",
    image: van,
    seats: 12,
    luggage: "Rear luggage space",
    airConditioning: "AC",
    features: ["Pushback seats", "Group travel", "Long-distance comfort"],
    price: "",
  },
  {
    id: "coach",
    name: "Bus",
    type: "Large bus",
    image: bus,
    seats: 35,
    luggage: "Under-floor luggage hold",
    airConditioning: "AC",
    features: ["Large groups", "Pilgrimage and school trips", "Onboard luggage hold"],
    price: "",
  },
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    type: "Compact sedan",
    image: swiftDzire,
    seats: 4,
    luggage: "2 large bags",
    airConditioning: "AC",
    features: ["Fuel efficient", "City rides"],
    price: "",
  },
  {
    id: "ertiga",
    name: "Ertiga",
    type: "Compact MPV",
    image: ertiga,
    seats: 6,
    luggage: "3 large bags",
    airConditioning: "AC",
    features: ["Spacious", "Family friendly"],
    price: "",
  },
  {
    id: "urbania",
    name: "Urbania",
    type: "Van",
    image: urbania,
    seats: 8,
    luggage: "4 large bags",
    airConditioning: "AC",
    features: ["Comfortable for groups"],
    price: "",
  },
];
