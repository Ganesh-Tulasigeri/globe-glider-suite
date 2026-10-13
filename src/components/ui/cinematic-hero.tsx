import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import heroRoad from "@/assets/hero-road.jpg";
import mysore from "@/assets/mysore-tour.jpg";
import coorg from "@/assets/coorg-tour.jpg";
import gokarna from "@/assets/gokarna-tour.jpg";
import destHills from "@/assets/dest-hills.jpg";
import { ButtonLink } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { Shimmer } from "@/components/ui/shimmer";

const images = [heroRoad, mysore, coorg, gokarna, destHills];

export function CinematicHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden text-primary-foreground md:min-h-[78vh]">
      {/* Background Images with Ken Burns effect */}
      {images.map((imgSrc, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 -z-20 h-full w-full transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={imgSrc}
              alt={`Scenic travel destination ${index + 1}`}
              width={1920}
              height={1088}
              fetchPriority={index === 0 ? "high" : "auto"}
              className={cn(
                "h-full w-full object-cover transition-transform duration-[10000ms] ease-linear origin-center",
                isActive ? "scale-110" : "scale-100"
              )}
            />
          </div>
        );
      })}

      {/* Deep gradient overlay for premium look and text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Hero Content */}
      <div className="container-page py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <p className="reveal text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {siteConfig.tagline}
          </p>
          <h1 className="reveal mt-4 text-4xl leading-[1.08] md:text-6xl font-bold tracking-tight text-white text-shadow-sm">
            Travel made simple, <br className="hidden md:block" />
            from the first call to the last mile
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-200 md:text-lg">
            <Shimmer>
              Chauffeur-driven vehicles, airport transfers, day trips and multi-day tour packages — planned around your dates, your group and your pace.
            </Shimmer>
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/enquiry" variant="accent" size="lg" className="rounded-md">
              Plan Your Trip
            </ButtonLink>
            <ButtonLink to="/packages" variant="onDark" size="lg" className="rounded-md backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20">
              Explore Packages
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
