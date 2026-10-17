"use client";

import { useState } from "react";
import Image from "next/image";
import OrderModal, { type Locale } from "../../components/OrderModal";
import { COLORS, PRODUCTS, B2B_IMAGE, type ColorKey, type Product } from "./products";
import { COPY, type SeagrassCopy } from "./copy";

// The order modal and emails use Arabic craft values regardless of page language.
const CRAFT = "خوصيات";
const WHATSAPP_NUMBER = "966579385204";

const HERO = [
  { src: "/crafts/seagrass/tote-maroon.webp", className: "right-0 top-0 w-[58%] rotate-[-4deg]" },
  { src: "/crafts/seagrass/basket-green.webp", className: "left-0 top-[8%] w-[48%] rotate-[5deg]" },
  { src: "/crafts/seagrass/lidded-box-green.webp", className: "left-[14%] bottom-0 w-[44%] rotate-[-3deg]" },
  { src: "/crafts/seagrass/small-purple.webp", className: "right-[6%] bottom-[2%] w-[40%] rotate-[4deg]" },
];

const USE_IMAGES = [
  "/crafts/seagrass/basket-maroon.webp",
  "/crafts/seagrass/small-teal.webp",
  "/crafts/seagrass/tote-green.webp",
  "/crafts/seagrass/tray-yellow.webp",
];

function colorLabels(product: Product, locale: Locale, copy: SeagrassCopy) {
  return product.colors
    .map((c) => {
      const color = COLORS.find((x) => x.key === c);
      return locale === "en" ? color?.labelEn : color?.label;
    })
    .filter(Boolean)
    .join(copy.colorJoin);
}

function ProductCard({
  product,
  featured,
  locale,
  copy,
  onOrder,
}: {
  product: Product;
  featured: boolean;
  locale: Locale;
  copy: SeagrassCopy;
  onOrder: (p: Product) => void;
}) {
  const colors = colorLabels(product, locale, copy);
  const name = locale === "en" ? product.nameEn : product.name;
  const alt = locale === "en" ? product.altEn : product.alt;
  const sizes = featured ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

  return (
    <div className={`group flex flex-col ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}>
      <div className="relative flex-1 overflow-hidden rounded-3xl bg-[#F5EEE3]">
        <div className={`relative w-full ${featured ? "aspect-square sm:aspect-auto sm:h-full sm:min-h-[28rem]" : "aspect-square"}`}>
          <Image
            src={product.image}
            alt={alt}
            fill
            sizes={sizes}
            className={`object-contain p-6 mix-blend-multiply transition duration-500 group-hover:scale-105 ${
              product.topImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {product.topImage && (
            <Image
              src={product.topImage}
              alt={`${alt}${copy.topSuffix}`}
              fill
              sizes={sizes}
              className="object-contain p-6 opacity-0 mix-blend-multiply transition duration-500 group-hover:opacity-100"
            />
          )}
        </div>
        <span className="absolute start-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-gray-700 backdrop-blur">
          {locale === "en" ? product.collectionEn : product.collection}
        </span>
      </div>
      <div className="mt-3 flex flex-col items-start gap-3 px-1">
        <div>
          <h3 className="font-bold leading-snug text-gray-900">{name}</h3>
          {colors && <p className="mt-0.5 text-sm text-gray-500">{colors}</p>}
        </div>
        <button
          type="button"
          onClick={() => onOrder(product)}
          className="w-full shrink-0 rounded-full border border-gray-900 px-4 py-1.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:w-auto"
        >
          {copy.orderLike}
        </button>
      </div>
    </div>
  );
}

export default function SeagrassLanding({
  faqs,
  locale = "ar",
}: {
  faqs: { q: string; a: string }[];
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const [modal, setModal] = useState<{ open: boolean; details: string }>({ open: false, details: "" });
  const [color, setColor] = useState<ColorKey | "all">("all");

  const openOrder = (details = "") => setModal({ open: true, details });
  const orderLike = (p: Product) =>
    openOrder(copy.prefill(locale === "en" ? p.nameEn : p.name, colorLabels(p, locale, copy)));

  const visible = color === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.colors.includes(color));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F5EEE3]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-12 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-start">
            <p className="text-sm font-bold tracking-wide text-pink-600">{copy.eyebrow}</p>
            <h1 className={`mt-4 text-4xl font-black leading-tight text-gray-900 ${locale === "en" ? "sm:text-5xl" : "sm:text-6xl"}`}>
              {copy.h1[0]}
              <br />
              {copy.h1[1]}
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-xl leading-9 text-gray-600 lg:mx-0">{copy.sub}</p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => openOrder()}
                className="w-full whitespace-nowrap rounded-xl bg-pink-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-pink-700 sm:w-auto"
              >
                {copy.ctaOrder}
              </button>
              <a
                href="#b2b"
                className="w-full whitespace-nowrap rounded-xl border-2 border-gray-900 px-8 py-[14px] text-center text-lg font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:w-auto"
              >
                {copy.ctaB2B}
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600 lg:justify-start">
              {copy.trust.map((t) => (
                <li key={t}>✓ {t}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-lg">
            {HERO.map((img, i) => (
              <div
                key={img.src}
                className={`absolute aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-105 ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={copy.heroAlts[i]}
                  fill
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-contain p-4"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection with color filter */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">{copy.galleryTitle}</h2>
          <p className="mt-4 max-w-xl text-lg text-gray-500">{copy.gallerySub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label={copy.filterLabel}>
            <button
              type="button"
              onClick={() => setColor("all")}
              aria-pressed={color === "all"}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                color === "all" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {copy.all}
            </button>
            {COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setColor(c.key)}
                aria-pressed={color === c.key}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                  color === c.key ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                <span className="h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ backgroundColor: c.swatch }} />
                {locale === "en" ? c.labelEn : c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              featured={color === "all" && (i === 0 || i === 7)}
              locale={locale}
              copy={copy}
              onOrder={orderLike}
            />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gray-400">
          <span className="hidden sm:inline">{copy.hintDesktop}</span>
          <span className="sm:hidden">{copy.hintMobile}</span>
        </p>
      </section>

      {/* Craft details */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-12 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl bg-white">
            <Image
              src="/crafts/seagrass/basket-purple-top.webp"
              alt={copy.detailsAlt}
              fill
              sizes="(min-width: 1024px) 448px, 100vw"
              className="object-contain p-6"
            />
          </div>
          <div className="text-start">
            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">{copy.detailsTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">{copy.detailsText}</p>
          </div>
        </div>
      </section>

      {/* Home uses (B2C) */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-12">
        <h2 className="text-center text-3xl font-black text-gray-900 sm:text-4xl">{copy.usesTitle}</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.uses.map((u, i) => (
            <div key={u.title} className="flex flex-col overflow-hidden rounded-3xl border border-gray-100">
              <div className="relative aspect-[4/3] bg-[#F5EEE3]">
                <Image
                  src={USE_IMAGES[i]}
                  alt={u.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-5 mix-blend-multiply"
                />
              </div>
              <div className="p-5 text-start">
                <h3 className="text-lg font-bold text-gray-900">{u.title}</h3>
                <p className="mt-2 text-gray-600">{u.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => openOrder()}
            className="w-full max-w-sm rounded-xl bg-pink-600 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-pink-700"
          >
            {copy.orderNow}
          </button>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b" className="scroll-mt-6 bg-[#16302B] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-start">
              <p className="text-sm font-bold tracking-wide text-pink-400">{copy.b2bEyebrow}</p>
              <h2 className={`mt-4 text-3xl font-black leading-tight ${locale === "en" ? "sm:text-4xl" : "sm:text-5xl"}`}>
                {copy.b2bTitle[0]}
                {locale === "en" ? " " : <br />}
                {copy.b2bTitle[1]}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/70">{copy.b2bText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded-xl bg-[#25D366] px-8 py-4 text-center text-lg font-bold text-gray-900 transition-opacity hover:opacity-90"
                >
                  {copy.whatsappLabel}
                </a>
                <a
                  href={`mailto:hello@borooa.com?subject=${encodeURIComponent(copy.emailSubject)}`}
                  className="rounded-xl border-2 border-white/30 px-8 py-[14px] text-center text-lg font-bold transition-colors hover:border-white"
                  dir="ltr"
                >
                  hello@borooa.com
                </a>
              </div>
            </div>
            <figure className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-[#F5EEE3]">
              <Image
                src={B2B_IMAGE.src}
                alt={locale === "en" ? B2B_IMAGE.altEn : B2B_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                className="object-contain p-6 mix-blend-multiply"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 text-start text-sm font-bold text-gray-800 backdrop-blur">
                {copy.b2bCaption}
              </figcaption>
            </figure>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {copy.sectors.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-start">
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-center text-2xl font-black">{copy.stepsTitle}</h3>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {copy.steps.map((s, i) => (
                <li key={s.title} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-lg font-black">
                    {i + 1}
                  </span>
                  <h4 className="mt-4 font-bold">{s.title}</h4>
                  <p className="mt-2 text-sm text-white/60">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-2xl px-6 py-20 text-start sm:px-0">
        <h2 className="mb-8 text-center text-3xl font-black text-gray-900">{copy.faqTitle}</h2>
        <div className="flex flex-col divide-y divide-gray-100">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                {faq.q}
                <span className="text-xl text-pink-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl bg-pink-600 px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-black sm:text-4xl">{copy.finalTitle}</h2>
          <p className="mt-4 max-w-md text-lg text-white/85">{copy.finalText}</p>
          <button
            type="button"
            onClick={() => openOrder()}
            className="mt-8 w-full max-w-xs rounded-xl bg-white px-10 py-4 text-lg font-bold text-pink-600 transition-colors hover:bg-pink-50"
          >
            {copy.orderNow}
          </button>
        </div>
      </section>

      <OrderModal
        open={modal.open}
        initialCraft={CRAFT}
        initialDetails={modal.details}
        locale={locale}
        onClose={() => setModal({ open: false, details: "" })}
      />
    </>
  );
}
