import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import heroRoad from "@/assets/hero-road.jpg";
import mysore from "@/assets/mysore-tour.jpg";
import coorg from "@/assets/coorg-tour.jpg";
import gokarna from "@/assets/gokarna-tour.jpg";
import destHills from "@/assets/dest-hills.jpg";
import destHeritage from "@/assets/dest-heritage.jpg";
import destBeach from "@/assets/dest-beach.jpg";
import { ButtonLink } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { Shimmer } from "@/components/ui/shimmer";

const images = [
  heroRoad,
  mysore,
  coorg,
  gokarna,
  destHills,
  destHeritage,
  destBeach,
];

const MovingColumn = ({
  images,
  direction = "up",
  speed = 40,
  className,
}: {
  images: string[];
  direction?: "up" | "down";
  speed?: number;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col gap-4 overflow-hidden w-64 md:w-80", className)}>
      <motion.div
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex flex-col gap-4 min-h-[200%]"
      >
        {/* Double the images for seamless loop */}
        {[...images, ...images, ...images, ...images].map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl bg-muted"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          >
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="absolute inset-0 w-full h-full object-cover scale-[1.4]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export function DiamondSliderHero() {
  // Split images for different columns
  const col1 = [images[0], images[1], images[2]];
  const col2 = [images[3], images[4], images[5]];
  const col3 = [images[6], images[0], images[1]];
  const col4 = [images[2], images[3], images[4]];

  return (
    <section className="relative w-full min-h-[100vh] flex items-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Animated Diamond Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 md:opacity-50">
        <div className="flex gap-4 transform scale-125 rotate-[-15deg] md:rotate-[-5deg]">
          <MovingColumn images={col1} direction="up" speed={45} className="mt-20" />
          <MovingColumn images={col2} direction="down" speed={55} className="-mt-32" />
          <MovingColumn images={col3} direction="up" speed={40} className="mt-10 hidden md:flex" />
          <MovingColumn images={col4} direction="down" speed={50} className="-mt-16 hidden lg:flex" />
          <MovingColumn images={col1} direction="up" speed={60} className="mt-32 hidden xl:flex" />
        </div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950" />

      {/* Hero Content */}
      <div className="container-page relative z-10 py-20 md:py-28 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <p className="reveal text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {siteConfig.tagline}
          </p>
          <h1 className="reveal mt-4 text-5xl leading-[1.1] md:text-7xl font-bold tracking-tight">
            Travel made simple, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
              from the first call to the last mile
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
            <Shimmer>
              Chauffeur-driven vehicles, airport transfers, day trips and multi-day tour packages — planned around your dates, your group and your pace.
            </Shimmer>
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/enquiry" variant="accent" size="lg" className="rounded-full px-8 shadow-lg shadow-accent/25">
              Plan Your Trip
            </ButtonLink>
            <ButtonLink to="/packages" variant="onDark" size="lg" className="rounded-full px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10">
              Explore Packages
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
