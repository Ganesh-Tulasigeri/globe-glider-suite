import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/common/Breadcrumbs";

interface Props {
  title: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Compact banner used at the top of every interior page. */
export function PageHero({ title, description, image, crumbs, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* Darker on the text side so the title stays readable while the photo shows through */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
        </>
      )}
      <div className="container-page pt-20 pb-12 sm:pt-24 md:pt-20 md:pb-16">
        {crumbs && (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <h1 className="max-w-3xl text-3xl leading-tight md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
