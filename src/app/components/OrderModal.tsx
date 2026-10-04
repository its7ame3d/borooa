"use client";

import { useEffect, useState } from "react";
import { trackOrderSubmitted } from "@/lib/analytics";
import { compressImage } from "@/lib/compressImage";

// Rule: Always use English numerals (0-9) in all text/copy, even for Arabic content

const CRAFTS = ["خزف وفخار", "كروشيه", "دمى", "خوصيات"];
const BUDGETS = ["أقل من 100 ريال", "100 - 300 ريال", "300 - 600 ريال", "أكثر من 600 ريال"];

type Props = {
  open: boolean;
  initialCraft: string | null;
  onClose: () => void;
};

export default function OrderModal({ open, initialCraft, onClose }: Props) {
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
      setDetails("");
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
  }, [open, initialCraft]);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-modal-content]")) {
        e.preventDefault();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventScroll);
    }
    return () => {
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
        throw new Error(data?.error || "تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.");
      }

      trackOrderSubmitted({ craft, budget });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setSubmitError("استغرق الإرسال وقتاً طويلاً، يرجى التحقق من اتصالك والمحاولة مرة أخرى.");
      } else {
        setSubmitError(err instanceof Error ? err.message : "تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8" data-modal-content>
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <h2 className="text-2xl font-black text-gray-900">تم استلام طلبك!</h2>
            <p className="mt-3 text-lg text-gray-500">سنتواصل معك قريباً لتأكيد تفاصيل طلبك.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full max-w-xs rounded-xl bg-pink-600 py-3 font-bold text-white transition-colors hover:bg-pink-700"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                {step === 1 ? "تفاصيل الطلب" : "بيانات التواصل"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-400">الخطوة {step} من 2</p>

            {step === 1 ? (
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">نوع الحرفة</label>
                  <div className="flex flex-wrap gap-2">
                    {CRAFTS.map((c) => (
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
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">
                    صفي لنا تفاصيل الطلب الذي ترغبين به
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    placeholder="مثال: أرغب بكوب فخاري بلون ترابي مكتوب عليه اسمي..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-lg text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">
                    صور مرجعية (اختياري)
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
                          aria-label="إزالة الصورة"
                          className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
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
                        <span className="text-[10px]">{compressing ? "جاري المعالجة" : "إضافة"}</span>
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
                  <label className="mb-3 block text-sm font-bold text-gray-900">الميزانية المتوقعة</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
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
                        {b}
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
                  التالي
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">الاسم الكامل</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">رقم الجوال</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-900">المدينة (اختياري)</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مدينتك"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-base text-gray-900 placeholder:text-gray-400 focus:border-pink-600 focus:outline-none"
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
                    رجوع
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmit}
                    className="flex-1 rounded-xl bg-pink-600 py-3 font-bold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
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
