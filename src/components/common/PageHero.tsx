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
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-primary/70" />
        </>
      )}
      <div className="container-page py-12 md:py-20">
        {crumbs && <div className="mb-4">{<Breadcrumbs items={crumbs} />}</div>}
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
