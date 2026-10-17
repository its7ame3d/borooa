"use client";

import { useEffect, useState } from "react";
import { trackOrderSubmitted } from "@/lib/analytics";
import { compressImage } from "@/lib/compressImage";

// Rule: Always use English numerals (0-9) in all text/copy, even for Arabic content

// Values stay in Arabic so order emails are consistent; only the displayed labels are localized.
const CRAFTS = ["خزف وفخار", "كروشيه", "دمى", "خوصيات"];
const BUDGETS = ["100 - 300 ريال", "300 - 600 ريال", "أكثر من 600 ريال"];

export type Locale = "ar" | "en";

const STRINGS = {
  ar: {
    crafts: CRAFTS,
    budgets: BUDGETS,
    received: "تم استلام طلبك!",
    receivedText: "سنتواصل معك قريباً لتأكيد تفاصيل طلبك.",
    close: "إغلاق",
    step1Title: "تفاصيل الطلب",
    step2Title: "بيانات التواصل",
    step: (n: number) => `الخطوة ${n} من 2`,
    craftLabel: "نوع الحرفة",
    detailsLabel: "صف لنا تفاصيل الطلب الذي ترغب به",
    detailsPlaceholder: "مثال: أرغب بكوب فخاري بلون ترابي مكتوب عليه اسمي...",
    imagesLabel: "صور مرجعية (اختياري)",
    removeImage: "إزالة الصورة",
    processing: "جاري المعالجة",
    add: "إضافة",
    budgetLabel: "الميزانية المتوقعة",
    next: "التالي",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "اسمك",
    phoneLabel: "رقم الجوال",
    cityLabel: "المدينة (اختياري)",
    cityPlaceholder: "مدينتك",
    back: "رجوع",
    sending: "جاري الإرسال...",
    submit: "إرسال الطلب",
    genericError: "تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.",
    timeoutError: "استغرق الإرسال وقتاً طويلاً، يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
  },
  en: {
    crafts: ["Ceramics & pottery", "Crochet", "Dolls", "Palm-leaf weaving"],
    budgets: ["100 - 300 SAR", "300 - 600 SAR", "Over 600 SAR"],
    received: "We've received your request!",
    receivedText: "We'll be in touch shortly to confirm the details.",
    close: "Close",
    step1Title: "Request details",
    step2Title: "Contact details",
    step: (n: number) => `Step ${n} of 2`,
    craftLabel: "Craft",
    detailsLabel: "Tell us what you'd like made",
    detailsPlaceholder: "e.g. A medium basket in green with rope handles, for storing blankets...",
    imagesLabel: "Reference photos (optional)",
    removeImage: "Remove photo",
    processing: "Processing",
    add: "Add",
    budgetLabel: "Expected budget",
    next: "Next",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    phoneLabel: "Mobile number",
    cityLabel: "City (optional)",
    cityPlaceholder: "Your city",
    back: "Back",
    sending: "Sending...",
    submit: "Send request",
    genericError: "We couldn't send your request. Please try again.",
    timeoutError: "Sending took too long. Please check your connection and try again.",
  },
};

type Props = {
  open: boolean;
  initialCraft: string | null;
  initialDetails?: string;
  locale?: Locale;
  onClose: () => void;
};

export default function OrderModal({ open, initialCraft, initialDetails = "", locale = "ar", onClose }: Props) {
  const t = STRINGS[locale];
  const [step, setStep] = useState<1 | 2>(1);
  const [craft, setCraft] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setCraft(initialCraft);
      setDetails(initialDetails);
      setImages([]);
      setBudget(null);
      setName("");
      setPhone("");
      setCity("");
      setSubmitted(false);
      setSubmitting(false);
      setSubmitError(null);
      setCompressing(false);
    }
  }, [open, initialCraft, initialDetails]);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      const target = e.target as Element;
      const modalContent = target.closest("[data-modal-content]");
      const isScrollable = modalContent && modalContent.scrollHeight > modalContent.clientHeight;

      if (!modalContent || !isScrollable) {
        e.preventDefault();
      }
    };

    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventScroll);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [open]);

  const addImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setCompressing(true);
    try {
      const compressed = await Promise.all(Array.from(files).map(compressImage));
      setImages((prev) => [...prev, ...compressed].slice(0, 6));
    } finally {
      setCompressing(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (!open) return null;

  const canContinue = Boolean(craft && budget);
  const canSubmit = Boolean(name.trim() && phone.trim());

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.set("craft", craft || "");
      formData.set("budget", budget || "");
      formData.set("details", details);
      formData.set("name", name);
      formData.set("phone", phone);
      formData.set("city", city);
      images.forEach((file) => formData.append("images", file));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20_000);

      let res: Response;
      try {
        res = await fetch("/api/orders", { method: "POST", body: formData, signal: controller.signal });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error((locale === "ar" && data?.error) || t.genericError);
      }

      trackOrderSubmitted({ craft, budget });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setSubmitError(t.timeoutError);
      } else {
        setSubmitError(err instanceof Error ? err.message : t.genericError);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8" data-modal-content>
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <h2 className="text-2xl font-black text-gray-900">{t.received}</h2>
            <p className="mt-3 text-lg text-gray-500">{t.receivedText}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full max-w-xs rounded-xl bg-pink-600 py-3 font-bold text-white transition-colors hover:bg-pink-700"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                {step === 1 ? t.step1Title : t.step2Title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-400">{t.step(step)}</p>

            {step === 1 ? (
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">{t.craftLabel}</label>
                  <div className="flex flex-wrap gap-2">
                    {CRAFTS.map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCraft(c)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                          craft === c
                            ? "border-pink-600 bg-pink-50 text-pink-600"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {t.crafts[i]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">
                    {t.detailsLabel}
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    placeholder={t.detailsPlaceholder}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-start text-lg text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">
                    {t.imagesLabel}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {previews.map((src, i) => (
                      <div
                        key={src}
                        className="relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          aria-label={t.removeImage}
                          className="absolute top-1 end-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {images.length < 6 && (
                      <label
                        className={`flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-gray-400 transition-colors ${
                          compressing
                            ? "cursor-not-allowed border-gray-200 opacity-60"
                            : "cursor-pointer border-gray-300 hover:border-pink-600 hover:text-pink-600"
                        }`}
                      >
                        <span className="text-2xl leading-none">{compressing ? "⏳" : "+"}</span>
                        <span className="text-[10px]">{compressing ? t.processing : t.add}</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={compressing}
                          className="hidden"
                          onChange={(e) => addImages(e.target.files)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">{t.budgetLabel}</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b, i) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                          budget === b
                            ? "border-pink-600 bg-pink-50 text-pink-600"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {t.budgets[i]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep(2)}
                  className="mt-2 w-full rounded-xl bg-pink-600 py-3 font-bold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t.next}
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">{t.nameLabel}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-start text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-start text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">{t.cityLabel}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.cityPlaceholder}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-start text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                {submitError && (
                  <p className="-mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {submitError}
                  </p>
                )}

                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={submitting}
                    className="flex-1 rounded-xl border border-gray-200 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.back}
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmit}
                    className="flex-1 rounded-xl bg-pink-600 py-3 font-bold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {submitting ? t.sending : t.submit}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
