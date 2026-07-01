"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, MetalPurity } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedPurity, setSelectedPurity] = useState<MetalPurity>(
    product.metalPurity[0] || "14k Gold"
  );
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = wishlist.includes(product.sku);

  // Calculate live price based on metal purity selection
  let priceMultiplier = 1;
  if (selectedPurity === "18k Gold") priceMultiplier = 1.2;
  if (selectedPurity === "22k Gold") priceMultiplier = 1.45;
  const currentPrice = Math.round(product.priceUSD * priceMultiplier);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedPurity, product.ringSizes ? product.ringSizes[2] : undefined);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIdx(0);
      }}
      className="group relative bg-[#FAFAF9] border border-[#E8ECF0] hover:border-[#C9A66B]/50 transition-all duration-500 rounded-none overflow-hidden shadow-sm hover:shadow-2xl flex flex-col justify-between"
    >
      {/* Top Badges & Wishlist Action */}
      <div className="relative w-full aspect-[4/5] bg-[#F8F3EA] overflow-hidden">
        <Link href={`/product/${product.sku}`} className="block w-full h-full">
          <img
            src={product.images[activeImageIdx]?.url || product.images[0]?.url}
            alt={product.images[activeImageIdx]?.alt || product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-[#1C1917]/90 text-[#FFFFFF] text-[9px] uppercase tracking-[0.2em] font-medium backdrop-blur-md">
              New Atelier
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="px-2.5 py-1 bg-[#C9A66B]/90 text-[#FFFFFF] text-[9px] uppercase tracking-[0.2em] font-medium backdrop-blur-md">
              Iconic
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.sku);
          }}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#FAFAF9]/80 hover:bg-[#FFFFFF] border border-[#D6D3D1]/50 backdrop-blur-md flex items-center justify-center text-[#1C1917] transition-all duration-200 shadow-sm"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isFavorited ? "text-[#C9A66B] scale-110 fill-[#C9A66B]" : "text-[#1C1917]"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill={isFavorited ? "currentColor" : "none"}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Hover Angle Navigation Arrows */}
        {product.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAFAF9]/90 hover:bg-[#1C1917] hover:text-white flex items-center justify-center shadow-md transition-all duration-200"
              aria-label="Previous image angle"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAFAF9]/90 hover:bg-[#1C1917] hover:text-white flex items-center justify-center shadow-md transition-all duration-200"
              aria-label="Next image angle"
            >
              →
            </button>
          </>
        )}

        {/* Image Angle Indicator Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1 bg-[#1C1917]/40 backdrop-blur-sm rounded-full">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeImageIdx ? "bg-[#C9A66B] w-3" : "bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content & Interactive Selectors */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.15em] text-[#44403C] mb-1">
            <span>{product.category}</span>
            <span className="text-[#C9A66B] font-medium">{product.images[activeImageIdx]?.angle || "Atelier Angle"}</span>
          </div>
          <Link href={`/product/${product.sku}`}>
            <h3 className="font-serif text-lg text-[#1C1917] group-hover:text-[#C9A66B] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#44403C] line-clamp-2 mt-1.5 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Interactive Purity Selector Pills */}
        <div className="pt-2 border-t border-[#E8ECF0]/80">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="text-gray-400 uppercase tracking-wider text-[9px]">Select Purity:</span>
            <span className="font-semibold text-sm text-[#1C1917]">${currentPrice.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {product.metalPurity.map((purity) => (
              <button
                key={purity}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedPurity(purity);
                }}
                className={`py-1 text-[10px] uppercase tracking-wider font-medium border transition-all duration-200 ${
                  selectedPurity === purity
                    ? "bg-[#1C1917] text-[#FFFFFF] border-[#1C1917] shadow-sm"
                    : "bg-[#F8F3EA] text-[#44403C] border-[#D6D3D1] hover:border-[#C9A66B]"
                }`}
              >
                {purity.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Add to Bag CTA (Magic UI Shimmer Effect) */}
        <button
          onClick={handleQuickAdd}
          disabled={!product.inStock}
          className="w-full py-2.5 bg-[#1C1917] hover:bg-[#C9A66B] text-[#FFFFFF] text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
        >
          <span className="relative z-10">{product.inStock ? "Quick Add To Bag" : "Reserved Out of Stock"}</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
