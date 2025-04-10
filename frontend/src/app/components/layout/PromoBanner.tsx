// components/layout/PromoBanner.tsx
"use client";

import { useState } from "react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-blue-600 text-white text-sm text-center py-2 px-4 flex justify-between items-center">
      <span>🚚 Free shipping on orders over $50!</span>
      <button
        onClick={() => setVisible(false)}
        className="text-white hover:text-gray-200 transition"
        aria-label="Close promo banner"
      >
        ✕
      </button>
    </div>
  );
}
