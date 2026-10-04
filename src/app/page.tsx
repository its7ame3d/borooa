"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderModal from "./components/OrderModal";
import Footer from "./components/Footer";

const categories = [
  { src: "/categories/khoos.jpg", alt: "أعمال الكروشيه", title: "اطلبي دمية", craft: "دمى", slug: "dolls" },
  {
    src: "/categories/ceramics.jpg",
    alt: "أكواب السيراميك",
    title: "اطلبي كوب فخاري",
    craft: "خزف وفخار",
    slug: "ceramics",
  },
  {
    src: "/categories/crochet.jpg",
    alt: "مربعات الكروشيه",
    title: "اطلبي كروشيه",
    craft: "كروشيه",
    slug: "crochet",
  },
  {
    src: "/categories/khoosiyat.jpg",
    alt: "سلة خوص",
    title: "اطلبي خوصيات",
    craft: "خوصيات",
    slug: "seagrass",
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialCraft, setInitialCraft] = useState<string | null>(null);

  const openModal = (craft: string | null) => {
    setInitialCraft(craft);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      <nav className="flex items-center justify-center border-b border-gray-100 px-6 py-5 sm:px-12">
        <Image src="/logo.svg" alt="بروع" width={72} height={36} className="h-9 w-auto" priority />
      </nav>

      <main className="flex flex-1 flex-col items-center px-6 py-24 text-center sm:px-12">
        <h1 className="text-5xl font-black leading-tight text-gray-900 sm:text-6xl">
          امتلكي فنّك
        </h1>
        <p className="mt-6 max-w-xl text-[2rem] leading-8 text-gray-500">
          اطلبي منتج يُصنع لك يدوياً من حرفيات بارعات
        </p>
        <button
          type="button"
          onClick={() => openModal(null)}
          className="mt-10 w-full max-w-lg rounded-xl bg-pink-600 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-pink-700"
        >
          صممي طلبك الآن
        </button>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {categories.map((category) => (
            <div key={category.src}>
              <Link
                href={`/crafts/${category.slug}`}
                className="relative block aspect-square overflow-hidden rounded-2xl border border-gray-200"
              >
                <Image
                  src={category.src}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </Link>
              <button
                type="button"
                onClick={() => openModal(category.craft)}
                className="mt-3 text-base font-bold text-gray-900 underline underline-offset-4"
              >
                {category.title}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <OrderModal open={modalOpen} initialCraft={initialCraft} onClose={() => setModalOpen(false)} />
    </div>
  );
}
