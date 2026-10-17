import Image from "next/image";
import Link from "next/link";
import { CRAFTS } from "../crafts/data";
import type { Locale } from "./OrderModal";

const SOCIAL = {
  instagram: "https://instagram.com/borooa.sa",
  whatsapp: "https://wa.me/966579385204",
  email: "hello@borooa.com",
};

const CR_NUMBER = "7049871358";

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
              <Link href="/en/crafts/khoos" className="text-sm text-gray-400 hover:text-white">
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

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-6 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/ministry-of-commerce-white.svg"
            alt={en ? "Ministry of Commerce" : "وزارة التجارة"}
            width={44}
            height={45}
            className="h-11 w-auto"
          />
          <div className="text-start text-xs leading-5">
            <p className="text-gray-400">{en ? "Commercial Registration No." : "السجل التجاري"}</p>
            <p className="font-bold tracking-wide text-gray-200" dir="ltr">
              {CR_NUMBER}
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {en ? "Borooa. All rights reserved." : "بروع. جميع الحقوق محفوظة."}
        </p>
      </div>
    </footer>
  );
}
