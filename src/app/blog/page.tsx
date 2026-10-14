import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import { POSTS, formatPostDate } from "./posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "المدونة | بروع";
const DESCRIPTION =
  "مقالات وأفكار عن الحرف اليدوية السعودية: خزف وفخار، كروشيه، دمى، وخوصيات، ونصائح لاختيار الهدية المناسبة.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: "ar_SA",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <nav className="relative flex items-center justify-center border-b border-gray-100 px-6 py-5 sm:px-12">
        <div className="absolute right-6 sm:right-12">
          <BackButton />
        </div>
        <Link href="/">
          <Image src="/logo.svg" alt={SITE_NAME} width={72} height={36} className="h-9 w-auto" priority />
        </Link>
      </nav>

      <main className="flex flex-1 flex-col items-center px-6 py-16 sm:px-12">
        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">المدونة</h1>
        <p className="mt-6 max-w-xl text-center text-xl leading-8 text-gray-500">
          أفكار ونصائح من عالم الحرف اليدوية
        </p>

        <div className="mt-16 grid w-full max-w-4xl gap-8 sm:grid-cols-2">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 transition-colors hover:border-pink-600"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 640px) 448px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 text-right">
                <span className="text-sm font-medium text-pink-600">{post.craft}</span>
                <h2 className="mt-2 text-xl font-black leading-snug text-gray-900 group-hover:text-pink-600">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-gray-500">{post.description}</p>
                <p className="mt-4 text-sm text-gray-400">
                  {formatPostDate(post.date)} · {post.readingMinutes} دقائق للقراءة
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
