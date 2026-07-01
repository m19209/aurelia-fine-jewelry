"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, MetalPurity } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import RingSizeGuide from "@/components/product/RingSizeGuide";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const sku = params?.sku as string;
  
  const product = PRODUCTS.find((p) => p.sku === sku) || PRODUCTS[0];
  const { addToCart, wishlist, toggleWishlist } = useStore();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedPurity, setSelectedPurity] = useState<MetalPurity>(product.metalPurity[0] || "14k Gold");
  const [selectedSize, setSelectedSize] = useState<number | undefined>(product.ringSizes ? product.ringSizes[2] : undefined);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "warranty">("details");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isFavorited = wishlist.includes(product.sku);

  let priceMultiplier = 1;
  if (selectedPurity === "18k Gold") priceMultiplier = 1.2;
  if (selectedPurity === "22k Gold") priceMultiplier = 1.45;
  const currentPrice = Math.round(product.priceUSD * priceMultiplier);

  const relatedProducts = PRODUCTS.filter((p) => p.sku !== product.sku && p.category === product.category).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#44403C] mb-8">
        <Link href="/" className="hover:text-[#1C1917]">Atelier</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#1C1917]">Shop</Link>
        <span>/</span>
        <span className="text-[#1C1917] font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Gallery (Thumbnails & Main Display) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px] flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImgIdx(idx)}
                className={`w-20 h-24 bg-[#F8F3EA] border transition-all ${
                  activeImgIdx === idx ? "border-[#1C1917] ring-1 ring-[#1C1917]" : "border-[#D6D3D1] opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Hero Shot */}
          <div className="flex-1 aspect-[4/5] bg-[#F8F3EA] border border-[#D6D3D1] relative overflow-hidden group">
            <img
              src={product.images[activeImgIdx]?.url}
              alt={product.images[activeImgIdx]?.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 bg-[#1C1917]/80 text-[#FFFFFF] text-[10px] uppercase tracking-widest px-3 py-1 backdrop-blur-md">
              Angle: {product.images[activeImgIdx]?.angle || "Atelier Angle"}
            </div>
          </div>
        </div>

        {/* Right Product Specifications & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A66B] font-semibold">{product.category}</span>
              <button
                onClick={() => toggleWishlist(product.sku)}
                className="text-xs uppercase tracking-widest text-[#44403C] hover:text-[#1C1917] flex items-center gap-1"
              >
                {isFavorited ? "♥ In Wishlist" : "♡ Save to Wishlist"}
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-1 leading-snug">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-3">
              <span className="font-serif text-2xl font-bold text-[#1C1917]">${currentPrice.toLocaleString()}</span>
              <div className="flex items-center text-xs text-[#C9A66B]">
                <span>★★★★★</span>
                <span className="text-[#44403C] ml-1 text-[11px]">({product.reviewCount} Verified Reviews)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#44403C] font-light leading-relaxed mt-4 border-t border-[#E8ECF0] pt-4">
              {product.shortDescription}
            </p>
          </div>

          {/* Purity & Size Selectors */}
          <div className="space-y-6 pt-4 border-t border-[#E8ECF0]">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-2">
                Metal Purity Selection
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.metalPurity.map((purity) => (
                  <button
                    key={purity}
                    onClick={() => setSelectedPurity(purity)}
                    className={`py-2.5 text-xs uppercase tracking-wider font-medium border transition-all ${
                      selectedPurity === purity
                        ? "bg-[#1C1917] text-[#FFFFFF] border-[#1C1917] shadow-md"
                        : "bg-[#FAFAF9] text-[#44403C] border-[#D6D3D1] hover:border-[#1C1917]"
                    }`}
                  >
                    {purity}
                  </button>
                ))}
              </div>
            </div>

            {product.ringSizes && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#1C1917]">Ring Size (US)</label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] uppercase tracking-widest text-[#C9A66B] hover:underline font-semibold"
                  >
                    ⚖ Find Your Size
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.ringSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-semibold border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-[#1C1917] text-[#FFFFFF] border-[#1C1917]"
                          : "bg-[#FAFAF9] text-[#44403C] border-[#D6D3D1] hover:border-[#1C1917]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag Button */}
            <button
              onClick={() => addToCart(product, selectedPurity, selectedSize)}
              className="w-full py-4 bg-[#1C1917] hover:bg-[#C9A66B] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-xl"
            >
              Add To Atelier Bag • ${currentPrice.toLocaleString()}
            </button>

            <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest text-gray-500 text-center pt-2">
              <span className="border border-[#E8ECF0] py-2 bg-[#FAFAF9]">🛡 Lifetime Warranty Included</span>
              <span className="border border-[#E8ECF0] py-2 bg-[#FAFAF9]">✈ Complimentary Insured Courier</span>
            </div>
          </div>

          {/* Detailed Tabs */}
          <div className="pt-6 border-t border-[#E8ECF0]">
            <div className="flex border-b border-[#D6D3D1] text-xs uppercase tracking-widest">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-2 mr-6 font-medium ${activeTab === "details" ? "border-b-2 border-[#1C1917] text-[#1C1917]" : "text-gray-400"}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-2 mr-6 font-medium ${activeTab === "care" ? "border-b-2 border-[#1C1917] text-[#1C1917]" : "text-gray-400"}`}
              >
                Materials & Care
              </button>
              <button
                onClick={() => setActiveTab("warranty")}
                className={`pb-2 font-medium ${activeTab === "warranty" ? "border-b-2 border-[#1C1917] text-[#1C1917]" : "text-gray-400"}`}
              >
                Sustainability
              </button>
            </div>

            <div className="py-4 text-xs text-[#44403C] leading-relaxed font-light">
              {activeTab === "details" && (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>SKU Code:</strong> {product.sku}</li>
                  <li><strong>Metal Weight:</strong> Approximately {product.weightGrams} grams</li>
                  {product.gemstone && <li><strong>Gemstone Spec:</strong> {product.gemstone}</li>}
                  <li><strong>Manufacturing:</strong> 100% Solid Gold (Never plated or vermeil)</li>
                </ul>
              )}
              {activeTab === "care" && <p>{product.materialsAndCare}</p>}
              {activeTab === "warranty" && (
                <p>
                  Aurelia strictly sources 100% certified recycled solid gold from conflict-free refineries adhering to the Responsible Jewellery Council (RJC) standards.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-[#D6D3D1]">
          <h3 className="font-serif text-3xl text-[#1C1917] mb-8 text-center">Complete the Ensemble</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.sku} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Ring Size Guide Modal */}
      <RingSizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectSize={(s) => setSelectedSize(s)}
      />
    </div>
  );
}
