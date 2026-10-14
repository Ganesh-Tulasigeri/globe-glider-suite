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
 * All customer reviews live here. They are shown on the home page and on the
 * Reviews page. To add one, copy an entry and change it:
 *   - name:     customer's name
 *   - location: the trip or place, e.g. "Trip to Coorg"
 *   - text:     what they said
 *   - rating:   1-5, or null
 * Only publish reviews you are able to show (with the customer's permission).
 */
export const testimonialsArePlaceholders = false;

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Ravi Kumar", location: "Trip to Coorg", rating: null,
    text: "Excellent service! The driver was on time and the vehicle was spotless. Will definitely book again for our next trip." },
  { id: "t2", name: "Priya Sharma", location: "Ooty Package Tour", rating: null,
    text: "We booked a family tour package and everything was perfectly arranged. Highly recommend Lifetime Travels!" },
  { id: "t3", name: "Arun Mehta", location: "Airport Transfer", rating: null,
    text: "The airport transfer was smooth and stress-free. Our driver waited patiently even when our flight was delayed." },
  { id: "t4", name: "Sunita Reddy", location: "Wayanad Day Trip", rating: null,
    text: "Best road trip experience. The chauffeur was knowledgeable about local spots and made our trip memorable." },
  { id: "t5", name: "Kiran Nair", location: "Kerala Tour Package", rating: null,
    text: "Transparent pricing, no hidden charges. Booked a multi-day tour and every detail was taken care of." },
  { id: "t6", name: "Deepa Menon", location: "Munnar Group Tour", rating: null,
    text: "Very comfortable vehicle for a group of 8. The driver was professional and courteous throughout the journey." },
  { id: "t7", name: "Ananya Pillai", location: "Kodaikanal Trip", rating: null,
    text: "Outstanding experience from start to finish. The team was responsive and the driver knew all the best routes." },
  { id: "t8", name: "Sanjay Bhat", location: "Day Trip – Mysore", rating: null,
    text: "Booked last minute and they accommodated us perfectly. Reliable, friendly and affordable. 5 stars!" },
];
