import Image from "next/image";
import Link from "next/link";
import { CRAFTS } from "../crafts/data";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center sm:flex-row sm:items-start sm:justify-between sm:text-right">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Image src="/logo.svg" alt="بروع" width={72} height={36} className="h-9 w-auto invert" />
          <p className="max-w-xs text-sm leading-6 text-gray-400">
            منصة تربطك بحرفيات سعوديات لصناعة قطعة مخصصة بالكامل حسب رغبتك.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-bold text-gray-300">روابط سريعة</h3>
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
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-bold text-gray-300">تواصلي معنا</h3>
          <a href="mailto:hello@borooa.com" className="text-sm text-gray-400 hover:text-white" dir="ltr">
            hello@borooa.com
          </a>
          <a
            href="https://instagram.com/borooa.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white"
          >
            انستقرام
          </a>
          <a
            href="https://wa.me/966579385204"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white"
          >
            واتساب
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} بروع. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
