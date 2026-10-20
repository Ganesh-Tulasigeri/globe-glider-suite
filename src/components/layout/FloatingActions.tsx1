import { MessageCircle, Phone } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/contact";

/** Floating WhatsApp / call buttons. Each is hidden when not configured. */
export function FloatingActions() {
  const wa = whatsappLink();
  const tel = telLink();
  if (!wa && !tel) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 print:hidden">
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with us on WhatsApp"
          className="inline-flex items-center justify-center rounded-full bg-success p-3.5 text-success-foreground shadow-lift transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
      {tel && (
        <a
          href={tel}
          aria-label="Call us"
          className="inline-flex items-center justify-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-lift transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
