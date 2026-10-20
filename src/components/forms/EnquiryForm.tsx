import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { hasWhatsApp, isValidPhone, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * EDIT HERE: extra places that customers can pick (in addition to the destinations of your
 * tour packages, which are added automatically). The list is shown in alphabetical order.
 */
const EXTRA_PLACES = ["Hampi", "Jog Falls", "Bandipur Tiger Safari", "Mysore", "Coorg", "Chikkamagaluru"];

/** Every selectable place, without duplicates. */
const places = Array.from(
  new Map(
    [...packages.map((p) => p.destination), ...EXTRA_PLACES]
      .filter(Boolean)
      .map((name) => [name.trim().toLowerCase(), name.trim()] as const),
  ).values(),
).sort((a, b) => a.localeCompare(b));

/** Special choices. Picking "other" reveals a box where the customer types their own answer. */
const OTHER = "__other__";
const SUGGEST = "__suggest__";

interface FormState {
  name: string;
  phone: string;
  email: string;
  /** What do you need? (a service) */
  service: string;
  serviceOther: string;
  /** Where do you want to go? */
  place: string;
  placeOther: string;
  /** Preferred vehicle */
  vehicle: string;
  travelDate: string;
  people: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  serviceOther: "",
  place: "",
  placeOther: "",
  vehicle: "",
  travelDate: "",
  people: "",
  message: "",
};

/**
 * The "Get a Quote" buttons send one name in the web address (a service, a package or a vehicle).
 * This puts it into the right box: a vehicle fills "Vehicle", a package fills "Place" (and the
 * tour-package service), a service fills "What do you need?".
 */
function initialState(interest: string): FormState {
  const base = { ...emptyForm };
  if (!interest) return base;

  const service = services.find((s) => s.title === interest);
  if (service) return { ...base, service: service.title };

  const pkg = packages.find((p) => p.title === interest);
  if (pkg) {
    const tourService = services.find((s) => /tour package/i.test(s.title));
    return { ...base, service: tourService?.title ?? "", place: pkg.destination };
  }

  const vehicle = vehicles.find((v) => v.name === interest);
  if (vehicle) return { ...base, vehicle: vehicle.name };

  return { ...base, service: OTHER, serviceOther: interest };
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring";

/**
 * Enquiry form.
 *
 * Submission is real, not simulated:
 *  1. If `siteConfig.formEndpoint` is set, the enquiry is POSTed there as JSON
 *     (works with Formspree, Web3Forms or any custom endpoint).
 *  2. The enquiry is then handed to WhatsApp as a pre-filled chat, which is the
 *     delivery method configured for this site.
 * If neither is available the form reports a clear configuration error instead
 * of showing a fake success message.
 */
export function EnquiryForm({ defaultInterest = "" }: { defaultInterest?: string }) {
  const [form, setForm] = useState<FormState>(() => initialState(defaultInterest));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(form.phone)) next.phone = "Please enter a valid 10-digit phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.service === OTHER && form.serviceOther.trim().length < 3)
      next.serviceOther = "Please tell us what you need.";
    if (form.place === OTHER && form.placeOther.trim().length < 2)
      next.placeOther = "Please tell us where you want to go.";
    if (form.people && Number(form.people) <= 0) next.people = "Enter a number greater than zero.";
    return next;
  };

  const serviceText = form.service === OTHER ? `Other - ${form.serviceOther.trim()}` : form.service;
  const placeText = form.place === OTHER ? `Other - ${form.placeOther.trim()}` : form.place;
  const vehicleText = form.vehicle === SUGGEST ? "Not sure, please suggest one" : form.vehicle;

  const buildMessage = () =>
    [
      `New enquiry for ${siteConfig.name}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email && `Email: ${form.email.trim()}`,
      serviceText && `Need: ${serviceText}`,
      placeText && `Place: ${placeText}`,
      vehicleText && `Vehicle: ${vehicleText}`,
      form.travelDate && `Travel date: ${form.travelDate}`,
      form.people && `People: ${form.people}`,
      form.message && `Message: ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // guards against duplicate submissions

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setErrorText("");

    try {
      if (siteConfig.formEndpoint) {
        const response = await fetch(siteConfig.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            need: serviceText,
            place: placeText,
            vehicle: vehicleText,
            travelDate: form.travelDate,
            people: form.people,
            message: form.message.trim(),
            source: siteConfig.name,
          }),
        });
        if (!response.ok) {
          throw new Error(`The enquiry service responded with status ${response.status}.`);
        }
      }

      const link = whatsappLink(buildMessage());
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else if (!siteConfig.formEndpoint) {
        throw new Error(
          "No enquiry destination is configured yet. Add a WhatsApp number or a form endpoint in src/config/site.ts.",
        );
      }

      setStatus("success");
      setForm(initialState(defaultInterest));
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-card" role="status">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        <h3 className="mt-3 text-lg text-primary">
          {hasWhatsApp() ? "One more step: send it on WhatsApp" : "Enquiry sent"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {hasWhatsApp()
            ? "Your details are ready in the WhatsApp chat that just opened. Press send there to complete your enquiry. If nothing opened, please check your pop-up blocker."
            : "Thanks — your enquiry has been submitted. We will get back to you shortly."}
        </p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-border bg-card p-5 shadow-card md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* ------------------------------ Your details ------------------------------ */}
        <h3 className="text-base text-primary sm:col-span-2">Your details</h3>

        <div>
          <label htmlFor="enq-name" className="text-sm font-medium text-foreground">
            Your name <span className="text-destructive">*</span>
          </label>
          <input
            id="enq-name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "enq-name-error" : undefined}
            className={cn(fieldClass, errors.name && "border-destructive")}
            placeholder="Full name"
          />
          {errors.name && (
            <p id="enq-name-error" className="mt-1 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enq-phone" className="text-sm font-medium text-foreground">
            Phone number <span className="text-destructive">*</span>
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "enq-phone-error" : undefined}
            className={cn(fieldClass, errors.phone && "border-destructive")}
            placeholder="+91 00000 00000"
          />
          {errors.phone && (
            <p id="enq-phone-error" className="mt-1 text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enq-email" className="text-sm font-medium text-foreground">
            Email <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "enq-email-error" : undefined}
            className={cn(fieldClass, errors.email && "border-destructive")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="enq-email-error" className="mt-1 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {/* -------------------------------- Your trip -------------------------------- */}
        <h3 className="mt-2 border-t border-border pt-5 text-base text-primary sm:col-span-2">Your trip</h3>

        <div>
          <label htmlFor="enq-service" className="text-sm font-medium text-foreground">
            What do you need? <span className="text-muted-foreground">(optional)</span>
          </label>
          <select
            id="enq-service"
            name="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value={OTHER}>Other (not in this list)</option>
          </select>
        </div>

        <div>
          <label htmlFor="enq-place" className="text-sm font-medium text-foreground">
            Where do you want to go? <span className="text-muted-foreground">(optional)</span>
          </label>
          <select
            id="enq-place"
            name="place"
            value={form.place}
            onChange={(e) => update("place", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a place</option>
            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
            <option value={OTHER}>Other place (not in this list)</option>
          </select>
        </div>

        {/* Shown only when "Other" is chosen for the service */}
        {form.service === OTHER && (
          <div className="sm:col-span-2">
            <label htmlFor="enq-service-other" className="text-sm font-medium text-foreground">
              Tell us what you need <span className="text-destructive">*</span>
            </label>
            <textarea
              id="enq-service-other"
              name="serviceOther"
              rows={3}
              autoFocus
              value={form.serviceOther}
              onChange={(e) => update("serviceOther", e.target.value)}
              aria-invalid={!!errors.serviceOther}
              aria-describedby={errors.serviceOther ? "enq-service-other-error" : undefined}
              className={cn(fieldClass, errors.serviceOther && "border-destructive")}
              placeholder="e.g. A car for a wedding, or a daily office pickup."
            />
            {errors.serviceOther && (
              <p id="enq-service-other-error" className="mt-1 text-xs text-destructive">
                {errors.serviceOther}
              </p>
            )}
          </div>
        )}

        {/* Shown only when "Other place" is chosen */}
        {form.place === OTHER && (
          <div className="sm:col-span-2">
            <label htmlFor="enq-place-other" className="text-sm font-medium text-foreground">
              Which place? <span className="text-destructive">*</span>
            </label>
            <input
              id="enq-place-other"
              name="placeOther"
              autoFocus
              value={form.placeOther}
              onChange={(e) => update("placeOther", e.target.value)}
              aria-invalid={!!errors.placeOther}
              aria-describedby={errors.placeOther ? "enq-place-other-error" : undefined}
              className={cn(fieldClass, errors.placeOther && "border-destructive")}
              placeholder="Type the place or route, e.g. Badami and Pattadakal"
            />
            {errors.placeOther && (
              <p id="enq-place-other-error" className="mt-1 text-xs text-destructive">
                {errors.placeOther}
              </p>
            )}
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="enq-vehicle" className="text-sm font-medium text-foreground">
            Preferred vehicle <span className="text-muted-foreground">(optional)</span>
          </label>
          <select
            id="enq-vehicle"
            name="vehicle"
            value={form.vehicle}
            onChange={(e) => update("vehicle", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a vehicle</option>
            <option value={SUGGEST}>Not sure, please suggest one</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} ({v.seats} seats)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="enq-date" className="text-sm font-medium text-foreground">
            Travel date <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="enq-date"
            name="travelDate"
            type="date"
            value={form.travelDate}
            onChange={(e) => update("travelDate", e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="enq-people" className="text-sm font-medium text-foreground">
            Number of people <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="enq-people"
            name="people"
            type="number"
            min={1}
            value={form.people}
            onChange={(e) => update("people", e.target.value)}
            aria-invalid={!!errors.people}
            className={cn(fieldClass, errors.people && "border-destructive")}
            placeholder="e.g. 4"
          />
          {errors.people && <p className="mt-1 text-xs text-destructive">{errors.people}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enq-message" className="text-sm font-medium text-foreground">
            Anything else we should know? <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="enq-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={fieldClass}
            placeholder="Pickup place, number of days, special requests…"
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {errorText}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Send enquiry
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          {hasWhatsApp()
            ? "Your enquiry opens as a pre-filled WhatsApp chat."
            : "Add a WhatsApp number or form endpoint in src/config/site.ts to receive enquiries."}
        </p>
      </div>
    </form>
  );
}
