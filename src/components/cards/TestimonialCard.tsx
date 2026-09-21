import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card">
      <Quote className="h-6 w-6 text-accent" aria-hidden="true" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
        {testimonial.text}
      </blockquote>
      {testimonial.rating !== null && (
        <div className="mt-4 flex gap-0.5" aria-label={`${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={
                i < (testimonial.rating ?? 0)
                  ? "h-4 w-4 fill-accent text-accent"
                  : "h-4 w-4 text-muted-foreground/40"
              }
            />
          ))}
        </div>
      )}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span>
          <span className="block text-sm font-semibold text-primary">{testimonial.name}</span>
          {testimonial.location && (
            <span className="block text-xs text-muted-foreground">{testimonial.location}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
