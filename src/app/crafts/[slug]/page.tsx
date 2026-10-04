import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CRAFTS, getCraftBySlug } from "../data";
import CraftOrderButton from "../CraftOrderButton";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return CRAFTS.map((craft) => ({ slug: craft.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const craft = getCraftBySlug(slug);
  if (!craft) return {};

  const url = `${SITE_URL}/crafts/${craft.slug}`;

  return {
    title: craft.title,
    description: craft.description,
    keywords: craft.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: craft.title,
      description: craft.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${craft.image}` }],
      locale: "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: craft.title,
      description: craft.description,
      images: [`${SITE_URL}${craft.image}`],
    },
  };
}

export default async function CraftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const craft = getCraftBySlug(slug);
  if (!craft) notFound();

  const url = `${SITE_URL}/crafts/${craft.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: craft.h1,
        description: craft.description,
        url,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "SA",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: craft.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: craft.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="relative flex items-center justify-center border-b border-gray-100 px-6 py-5 sm:px-12">
        <div className="absolute right-6 sm:right-12">
          <BackButton />
        </div>
        <Link href="/">
          <Image src="/logo.svg" alt={SITE_NAME} width={72} height={36} className="h-9 w-auto" priority />
        </Link>
      </nav>

      <main className="flex flex-1 flex-col items-center px-6 py-16 text-center sm:px-12">
        <nav aria-label="breadcrumb" className="text-sm text-gray-400">
          <Link href="/" className="hover:text-pink-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{craft.name}</span>
        </nav>

        <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
          {craft.h1}
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-8 text-gray-500">{craft.intro}</p>

        <div className="mt-10">
          <CraftOrderButton craft={craft.name} label={`اطلبي ${craft.name}`} />
        </div>

        <div className="relative mt-16 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src={craft.image}
            alt={craft.imageAlt}
            fill
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid w-full max-w-2xl gap-6 text-right sm:grid-cols-2">
          {craft.highlights.map((h) => (
            <div key={h} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
              <span className="mt-1 text-pink-600">✓</span>
              <span className="text-gray-700">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl text-right">
          {craft.paragraphs.map((p) => (
            <p key={p} className="mb-4 text-lg leading-8 text-gray-600">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-16 w-full max-w-2xl text-right">
          <h2 className="mb-6 text-2xl font-black text-gray-900">أسئلة شائعة</h2>
          <div className="flex flex-col gap-6">
            {craft.faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-bold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <CraftOrderButton craft={craft.name} label={`اطلبي ${craft.name} الآن`} />
        </div>

        <div className="mt-16 flex w-full max-w-2xl flex-wrap justify-center gap-3 border-t border-gray-100 pt-10">
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
      </main>

      <Footer />
    </div>
  );
}
