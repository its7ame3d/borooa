import Image from "next/image";
import Link from "next/link";
import { CRAFTS } from "../crafts/data";
import type { Locale } from "./OrderModal";

const SOCIAL = {
  instagram: "https://instagram.com/borooa.sa",
  whatsapp: "https://wa.me/966579385204",
  email: "hello@borooa.com",
};

export default function Footer({ locale = "ar" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <footer className="bg-black px-6 py-16 text-white sm:px-12" dir={en ? "ltr" : "rtl"} lang={locale}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center sm:flex-row sm:items-start sm:justify-between sm:text-start">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Image src="/logo.svg" alt={en ? "Borooa" : "بروع"} width={72} height={36} className="h-9 w-auto invert" />
          <p className="max-w-xs text-sm leading-6 text-gray-400">
            {en
              ? "Connecting you with Saudi artisans to make a piece that's fully customized to you."
              : "منصة تربطك بحرفيات سعوديات لصناعة قطعة مخصصة بالكامل حسب رغبتك."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-bold text-gray-300">{en ? "Quick links" : "روابط سريعة"}</h3>
          {en ? (
            <>
              <Link href="/en/crafts/seagrass" className="text-sm text-gray-400 hover:text-white">
                Palm-leaf weaving
              </Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white" lang="ar">
                العربية
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                الرئيسية
              </Link>
              {CRAFTS.map((craft) => (
                <Link
                  key={craft.slug}
                  href={`/crafts/${craft.slug}`}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {craft.name}
                </Link>
              ))}
              <Link href="/blog" className="text-sm text-gray-400 hover:text-white">
                المدونة
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-bold text-gray-300">{en ? "Contact us" : "تواصلي معنا"}</h3>
          <a href={`mailto:${SOCIAL.email}`} className="text-sm text-gray-400 hover:text-white" dir="ltr">
            {SOCIAL.email}
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">
            {en ? "Instagram" : "انستقرام"}
          </a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">
            {en ? "WhatsApp" : "واتساب"}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {en ? "Borooa. All rights reserved." : "بروع. جميع الحقوق محفوظة."}
      </div>
    </footer>
  );
}
