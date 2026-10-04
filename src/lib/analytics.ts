// Google Ads conversion ID (Account ID: 565-107-1715)
export const GOOGLE_ADS_ID = "AW-18087500309";
export const GOOGLE_ADS_CONVERSION_LABEL = "njCNCPH_m5EdEJW05bBD";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Fired when a customer completes the order request modal.
 * Reported as a GA4 lead event, and as a Google Ads conversion once
 * GOOGLE_ADS_ID / the conversion label below are filled in.
 */
export function trackOrderSubmitted({ craft, budget }: { craft: string | null; budget: string | null }) {
  trackEvent("generate_lead", { craft, budget });

  // Track Google Ads conversion (once conversion label is set)
  if (GOOGLE_ADS_CONVERSION_LABEL !== "CONVERSION_LABEL_PENDING") {
    trackEvent("conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}` });
  }
}
