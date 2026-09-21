import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { hasWhatsApp, isValidPhone, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  phone: string;
  email: string;
  interest: string;
  travelDate: string;
  people: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  travelDate: "",
  people: "",
  message: "",
};

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
  const [form, setForm] = useState<FormState>({ ...emptyForm, interest: defaultInterest });
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
    else if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number (7-15 digits).";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.people && Number(form.people) <= 0) next.people = "Enter a number greater than zero.";
    return next;
  };

  const buildMessage = () =>
    [
      `New enquiry for ${siteConfig.name}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email && `Email: ${form.email.trim()}`,
      form.interest && `Interested in: ${form.interest}`,
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
          body: JSON.stringify({ ...form, source: siteConfig.name }),
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
      setForm({ ...emptyForm, interest: defaultInterest });
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-card" role="status">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        <h3 className="mt-3 text-lg text-primary">Enquiry sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {hasWhatsApp()
            ? "Your details were passed to WhatsApp — press send in the chat that opened to complete your enquiry. If the tab did not open, please check your pop-up blocker."
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
        <div className="sm:col-span-1">
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

        <div>
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

        <div>
          <label htmlFor="enq-interest" className="text-sm font-medium text-foreground">
            Interested in <span className="text-muted-foreground">(optional)</span>
          </label>
          <select
            id="enq-interest"
            name="interest"
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select an option</option>
            <optgroup label="Services">
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Tour packages">
              {packages.map((p) => (
                <option key={p.slug} value={p.title}>
                  {p.title}
                </option>
              ))}
            </optgroup>
            {defaultInterest &&
              !services.some((s) => s.title === defaultInterest) &&
              !packages.some((p) => p.title === defaultInterest) && (
                <option value={defaultInterest}>{defaultInterest}</option>
              )}
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
            Your message <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="enq-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={fieldClass}
            placeholder="Tell us your route, dates or anything else we should know."
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
