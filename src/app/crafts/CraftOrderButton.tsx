"use client";

import { useState } from "react";
import OrderModal from "../components/OrderModal";

export default function CraftOrderButton({ craft, label }: { craft: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full max-w-sm rounded-xl bg-pink-600 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-pink-700"
      >
        {label}
      </button>
      <OrderModal open={open} initialCraft={craft} onClose={() => setOpen(false)} />
    </>
  );
}
