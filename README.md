# Travel & Tourism Website

A production-ready marketing website for a travel/tourism business: services,
chauffeur-driven vehicles, tour packages, gallery, reviews and enquiries.

## Technologies

- TanStack Start (React 19, file-based routing, SSR) + Vite 7
- Tailwind CSS v4 with a token-based design system (`src/styles.css`)
- lucide-react icons, Sora + Manrope typography
- No database or login — all content lives in typed data files

## Pages

`/` Home · `/about` · `/services` and `/services/{slug}` · `/vehicles` (car rental) ·
`/packages` and `/packages/{slug}` · `/gallery` · `/reviews` · `/contact` ·
`/enquiry` · `/privacy` · `/terms` · `/sitemap.xml` · custom 404.

## Where to edit content

| What | File |
| --- | --- |
| Business name, phone, WhatsApp, email, address, hours, map, social links, form endpoint | `src/config/site.ts` |
| Services | `src/data/services.ts` |
| Vehicles / fleet | `src/data/vehicles.ts` |
| Tour packages | `src/data/packages.ts` |
| Reviews | `src/data/testimonials.ts` |
| Gallery images | `src/data/gallery.ts` |
| Colours, fonts, spacing | `src/styles.css` |
| Images | `src/assets/` |

Blank values degrade gracefully: no phone means no call buttons, no WhatsApp
number means no WhatsApp buttons, no map link shows a short notice.

## Enquiry delivery

The enquiry form (`src/components/forms/EnquiryForm.tsx`) is real, not simulated:

1. If `siteConfig.formEndpoint` is set, the enquiry is POSTed there as JSON
   (works with Formspree, Web3Forms or any custom endpoint).
2. The enquiry then opens WhatsApp with a pre-filled message to
   `siteConfig.whatsappNumber`.

If neither is configured the form shows a clear configuration error — it never
fakes a success. It validates name and phone, blocks duplicate submits and
shows loading, success and error states.

## WhatsApp & calling

- WhatsApp number: `siteConfig.whatsappNumber` (digits with country code, no `+`).
- Phone: `siteConfig.phone` (used for `tel:` links) and `phoneDisplay`.
- Floating WhatsApp + call buttons: `src/components/layout/FloatingActions.tsx`.
- Pre-filled messages are built in `src/lib/contact.ts`.

## Environment variables

None are required. The site has no secrets and no backend keys. If a form
endpoint is added later, put the public endpoint URL in `src/config/site.ts`;
never commit private API keys to this repository.

## Run locally

```bash
npm install
npm run dev     # http://localhost:8080
```

## Build

```bash
npm run build
```

## Deploy

- **Vercel / Netlify** — import the repository, framework preset auto-detects
  Vite; build command `npm run build`. No env vars needed.
- **Hostinger / static host** — run `npm run build` and upload the generated
  output directory; point the domain at it.
- **Domain** — add the domain in the host's dashboard and update the DNS records
  it gives you. `canonical`/`og:url` are relative and the sitemap reads the
  request host, so both become correct automatically.

### Post-deployment checklist

- [ ] Real business details filled into `src/config/site.ts`
- [ ] Placeholder reviews replaced with genuine, permission-given reviews
- [ ] Draft tour packages replaced or removed
- [ ] Privacy and Terms reviewed by the business
- [ ] Favicon and logo replaced with the client's brand
- [ ] Add `Sitemap: https://yourdomain.com/sitemap.xml` to `public/robots.txt`
- [ ] Submit the sitemap in Google Search Console
- [ ] Test WhatsApp, call and enquiry flows on a real phone

## Client content still needed

Business name and logo, phone, WhatsApp number, email, office address, opening
hours, Google Maps embed link, social profile links, real photographs, genuine
reviews, real tour packages with prices, and actual payment/cancellation terms.

## Intentionally excluded

Online payments, live booking/availability, user accounts, a CMS, a blog and
analytics — none were requested and none can be faked responsibly.
