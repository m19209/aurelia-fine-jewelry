"use client";

import React, { useRef } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const featuredProducts = PRODUCTS.filter((p) => p.isBestSeller || p.isNewArrival);

  return (
    <section className="py-20 bg-[#F8F3EA] overflow-hidden border-t border-[#E8ECF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-semibold block mb-2">
              Atelier Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917]">
              Curated Sculptures in Solid Gold
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 border border-[#1C1917] bg-[#FAFAF9] hover:bg-[#1C1917] hover:text-[#FFFFFF] transition-colors flex items-center justify-center text-lg"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 border border-[#1C1917] bg-[#FAFAF9] hover:bg-[#1C1917] hover:text-[#FFFFFF] transition-colors flex items-center justify-center text-lg"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.sku}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] snap-start flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
