import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, galleryImages, type GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface Props {
  /** Limit the number of images, e.g. for the homepage preview. */
  limit?: number;
  showFilters?: boolean;
}

export function GalleryGrid({ limit, showFilters = false }: Props) {
  const [filter, setFilter] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered: GalleryImage[] = galleryImages
    .filter((img) => filter === "All" || img.category === filter)
    .slice(0, limit);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, filtered.length]);

  if (filtered.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No photos in this category yet.
      </p>
    );
  }

  const active = openIndex !== null ? filtered[openIndex] : null;

  return (
    <div>
      {showFilters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setFilter(cat);
                setOpenIndex(null);
              }}
              aria-pressed={filter === cat}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === cat
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, index) => (
          <li key={img.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden rounded-lg bg-muted"
              aria-label={`Open image: ${img.alt}`}
            >
              <span className="block aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/95 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close image"
            className="absolute right-4 top-4 rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
            }}
            className="absolute left-2 rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/10 md:left-6"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            <img src={active.src} alt={active.alt} className="max-h-[75vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">{active.alt}</figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length));
            }}
            className="absolute right-2 rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/10 md:right-6"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
