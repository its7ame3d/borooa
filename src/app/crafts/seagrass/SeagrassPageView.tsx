import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CRAFTS, getCraftBySlug } from "../data";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import type { Locale } from "../../components/OrderModal";
import SeagrassLanding from "./SeagrassLanding";
import { PRODUCTS } from "./products";
import { FAQS_EN } from "./copy";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const craft = getCraftBySlug("seagrass")!;
const URLS = { ar: `${SITE_URL}/crafts/seagrass`, en: `${SITE_URL}/en/crafts/seagrass` };

const META = {
  ar: {
    title: craft.title,
    description: craft.description,
    keywords: craft.keywords,
    siteName: SITE_NAME,
    ogLocale: "ar_SA",
    name: craft.h1,
    imageAlt: craft.imageAlt,
  },
  en: {
    title: "Handwoven Palm-Leaf Baskets & Bags for Homes and Businesses | Borooa",
    description:
      "Baskets, bags and trays handwoven from palm fronds (khoos) by Saudi artisans, in the colors and sizes you choose. We take orders from individuals, companies, hotels and cafés.",
    keywords: [
      "palm leaf basket Saudi",
      "handwoven palm basket",
      "khoos basket",
      "Saudi handmade gifts",
      "corporate gifts Saudi Arabia",
      "hotel amenity baskets",
      "wholesale palm leaf baskets",
    ],
    siteName: "Borooa",
    ogLocale: "en_US",
    name: "Palm-leaf weaving, handmade in Saudi Arabia",
    imageAlt: "Handwoven maroon palm-leaf tote",
  },
};

export function seagrassMetadata(locale: Locale): Metadata {
  const m = META[locale];
  const image = `${SITE_URL}${craft.image}`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: URLS[locale],
      languages: { ar: URLS.ar, en: URLS.en, "x-default": URLS.ar },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: URLS[locale],
      siteName: m.siteName,
      images: [{ url: image, alt: m.imageAlt }],
      locale: m.ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [image] },
  };
}

export default function SeagrassPageView({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const m = META[locale];
  const faqs = en ? FAQS_EN : craft.faqs;
  const url = URLS[locale];

  const org = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: m.siteName, url: SITE_URL };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: m.title,
        description: m.description,
        inLanguage: locale,
        primaryImageOfPage: `${SITE_URL}${craft.image}`,
        hasPart: [
          { "@type": "WebPageElement", name: en ? "Handwoven palm-leaf baskets & bags" : "سلال وحقائب خوص منسوجة يدوياً", url: `${url}#collection` },
          { "@type": "WebPageElement", name: en ? "How palm-leaf weaving is made" : "كيف يُنسج الخوص", url: `${url}#how-its-made` },
          { "@type": "WebPageElement", name: en ? "Ways to use palm-leaf baskets" : "استخدامات سلال الخوص", url: `${url}#uses` },
          { "@type": "WebPageElement", name: en ? "For businesses & wholesale" : "للشركات والجملة", url: `${url}#b2b` },
          { "@type": "WebPageElement", name: en ? "FAQs" : "أسئلة شائعة", url: `${url}#faq` },
        ],
      },
      {
        "@type": "Service",
        name: m.name,
        serviceType: en ? "Custom handwoven palm-leaf products" : "منتجات خوص مخصصة منسوجة يدوياً",
        description: m.description,
        url,
        inLanguage: locale,
        provider: org,
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        audience: { "@type": "PeopleAudience" },
      },
      {
        "@type": "Service",
        name: en ? "Palm-leaf weaving for businesses, hotels & wholesale" : "خوصيات للشركات والفنادق والجملة",
        serviceType: en ? "Wholesale and corporate handwoven palm-leaf products" : "منتجات خوص بالجملة وللشركات",
        description: en
          ? "Handwoven palm-leaf baskets, trays and bags in custom quantities and colors for hotels, cafés, corporate gifts, retail packaging and events."
          : "سلال وصوانٍ وحقائب خوص منسوجة يدوياً بكميات وألوان حسب الطلب للفنادق والمقاهي وهدايا الشركات وتغليف المتاجر والمناسبات.",
        url: `${url}#b2b`,
        inLanguage: locale,
        provider: org,
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        audience: { "@type": "BusinessAudience" },
      },
      {
        "@type": "ImageGallery",
        name: en ? "Borooa handwoven palm-leaf baskets and bags" : "سلال وحقائب خوص يدوية من بروع",
        url: `${url}#collection`,
        image: PRODUCTS.flatMap((p) =>
          [p.image, p.topImage].filter(Boolean).map((src) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE_URL}${src}`,
            name: en ? p.nameEn : p.name,
            caption: en ? p.altEn : p.alt,
            creator: org,
            creditText: m.siteName,
            copyrightNotice: m.siteName,
          }))
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: en ? "Palm-leaf weaving" : craft.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white" dir={en ? "ltr" : "rtl"} lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="relative flex items-center justify-center border-b border-gray-100 px-6 py-5 sm:px-12">
        <div className="absolute start-6 sm:start-12">
          <BackButton label={en ? "Back" : "العودة"} />
        </div>
        <Link href="/">
          <Image src="/logo.svg" alt={m.siteName} width={72} height={36} className="h-9 w-auto" priority />
        </Link>
        <Link
          href={en ? "/crafts/seagrass" : "/en/crafts/seagrass"}
          hrefLang={en ? "ar" : "en"}
          lang={en ? "ar" : "en"}
          className="absolute end-6 rounded-full border border-gray-200 px-3 py-1 text-sm font-bold text-gray-700 transition-colors hover:border-gray-900 sm:end-12"
        >
          {en ? "العربية" : "English"}
        </Link>
      </nav>

      <main className="flex flex-1 flex-col">
        <SeagrassLanding faqs={faqs} locale={locale} />

        {!en && (
          <div className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-3 border-t border-gray-100 px-6 py-10">
            {CRAFTS.filter((c) => c.slug !== craft.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/crafts/${c.slug}`}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-pink-600 hover:text-pink-600"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
