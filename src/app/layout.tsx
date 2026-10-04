import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { GOOGLE_ADS_ID } from "@/lib/analytics";
import WhatsAppButton from "./components/WhatsAppButton";

const adelleSans = localFont({
  variable: "--font-adelle-sans",
  src: [
    { path: "./fonts/Adelle_Sans_ARA_Th.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Ut.woff2", weight: "200", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Lt.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Sb.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Eb.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Adelle_Sans_ARA_Hv.woff2", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: "اطلبي منتج يُصنع لك يدوياً من حرفيات بارعات: خزف وفخار، كروشيه، دمى، وخوصيات مخصصة.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "ar_SA",
    type: "website",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

const isGoogleAdsConfigured = !GOOGLE_ADS_ID.includes("XXXXXXXXX");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${adelleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {isGoogleAdsConfigured && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
