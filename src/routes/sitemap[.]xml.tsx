import { createFileRoute } from "@tanstack/react-router";
import { packages } from "@/data/packages";
import { services } from "@/data/services";

/**
 * Sitemap generated from the site's own routes. The host is read from the
 * incoming request, so it stays correct on any domain the site is deployed to.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const forwardedHost = url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
        const origin = forwardedHost ? `https://${forwardedHost}` : url.origin;

        const paths = [
          "/",
          "/about",
          "/services",
          ...services.map((s) => `/services/${s.slug}`),
          "/vehicles",
          "/packages",
          ...packages.filter((p) => !p.draft).map((p) => `/packages/${p.slug}`),
          "/gallery",
          "/reviews",
          "/contact",
          "/enquiry",
          "/privacy",
          "/terms",
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
