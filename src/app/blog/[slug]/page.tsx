import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPostBySlug, formatPostDate } from "../posts";
import CraftOrderButton from "../../crafts/CraftOrderButton";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${SITE_NAME}`;

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${post.image}` }],
      locale: "ar_SA",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [`${SITE_URL}${post.image}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const others = POSTS.filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        inLanguage: "ar",
        image: `${SITE_URL}${post.image}`,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
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

      <main className="flex flex-1 flex-col items-center px-6 py-16 sm:px-12">
        <nav aria-label="breadcrumb" className="text-sm text-gray-400">
          <Link href="/" className="hover:text-pink-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-pink-600">
            المدونة
          </Link>
        </nav>

        <article className="mt-6 flex w-full max-w-2xl flex-col">
          <h1 className="text-center text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-center text-sm text-gray-400">
            {formatPostDate(post.date)} · {post.readingMinutes} دقائق للقراءة
          </p>

          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-12 text-right">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="mb-4 mt-10 text-2xl font-black text-gray-900">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="mb-4 flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-lg leading-8 text-gray-600">
                        <span className="mt-1 text-pink-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mb-4 text-lg leading-8 text-gray-600">
                  {block.text}
                </p>
              );
            })}
          </div>
        </article>

        <div className="mt-16 flex w-full flex-col items-center">
          <CraftOrderButton craft={post.craft} label="شاركينا فكرتك الآن" />
        </div>

        {others.length > 0 && (
          <div className="mt-16 w-full max-w-2xl border-t border-gray-100 pt-10 text-right">
            <h2 className="mb-6 text-2xl font-black text-gray-900">مقالات أخرى</h2>
            <div className="flex flex-col gap-4">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="text-lg font-bold text-gray-700 underline-offset-4 transition-colors hover:text-pink-600 hover:underline"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
