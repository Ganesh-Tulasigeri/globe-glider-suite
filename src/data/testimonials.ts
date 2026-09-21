export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  /** 1-5, or null when no rating was given. */
  rating: number | null;
  avatar?: string;
}

/**
 * PLACEHOLDER CONTENT — these are NOT real customer reviews.
 * Replace with genuine, permission-given reviews before publishing. The UI
 * shows a visible notice while `testimonialsArePlaceholders` is true.
 */
export const testimonialsArePlaceholders = true;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Customer name",
    location: "City",
    text: "Sample review text. Replace this with a real review collected from a customer, along with their permission to publish it.",
    rating: null,
  },
  {
    id: "t2",
    name: "Customer name",
    location: "City",
    text: "Sample review text. Reviews can be copied from Google, WhatsApp or email once the customer agrees to have them shown here.",
    rating: null,
  },
  {
    id: "t3",
    name: "Customer name",
    location: "City",
    text: "Sample review text. Keep each review short and specific — the trip taken, the vehicle used and what went well.",
    rating: null,
  },
  {
    id: "t4",
    name: "Customer name",
    location: "City",
    text: "Sample review text. A star rating can be added per review, and is hidden automatically when no rating is supplied.",
    rating: null,
  },
];
