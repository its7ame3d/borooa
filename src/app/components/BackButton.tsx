"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
    >
      العودة
    </button>
  );
}
