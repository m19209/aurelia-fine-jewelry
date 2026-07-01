"use client";

import React, { Suspense } from "react";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3EA] text-xs uppercase tracking-[0.2em] text-[#44403C]">
        Loading Atelier Catalog...
      </div>
    }>
      <ProductGrid />
    </Suspense>
  );
}
