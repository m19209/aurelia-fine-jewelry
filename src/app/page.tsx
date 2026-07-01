"use client";

import React from "react";
import Link from "next/link";
import HeroVideo from "@/components/home/HeroVideo";
import ProductCarousel from "@/components/home/ProductCarousel";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function HomePage() {
  const rings = PRODUCTS.filter((p) => p.category === "Rings").slice(0, 3);
  const necklaces = PRODUCTS.filter((p) => p.category === "Necklaces").slice(0, 3);

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Banner Component with Background Video Loop */}
      <HeroVideo />

      {/* 2. Interactive Product Carousel (Magic UI Inspired) */}
      <ProductCarousel />

      {/* 3. Editorial Split Feature: Solid Gold Rings */}
      <section className="py-24 bg-[#FAFAF9] border-t border-[#D6D3D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-semibold block mb-2">
                Minimalist Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917]">
                Solid Gold Rings
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.25em] text-[#1C1917] hover:text-[#C9A66B] font-semibold transition-colors mt-4 md:mt-0 border-b border-[#1C1917] pb-1"
            >
              Explore All Rings →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rings.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atelier Craftsmanship & Sustainability Section */}
      <section id="craftsmanship" className="py-28 bg-[#1C1917] text-[#FAFAF9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C9A66B] font-semibold">
              Uncompromising Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl leading-tight font-normal">
              100% Solid Gold. <br /><span className="italic text-[#C9A66B]">Zero Plating or Vermeil.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              In a landscape saturated with ephemeral hollow plating and gold vermeil that tarnishes in months, Aurelia stands firm. Every ring and necklace in our atelier is cast in solid 14k, 18k, or 22k gold.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#44403C]">
              <div>
                <h4 className="font-serif text-2xl text-[#C9A66B]">Recycled 18k</h4>
                <p className="text-xs text-gray-400 mt-1">Sourced from certified ethical refineries with zero conflict footprint.</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[#C9A66B]">Lifetime Care</h4>
                <p className="text-xs text-gray-400 mt-1">Complimentary annual polishing, clasp check, and ultrasonic restoration.</p>
              </div>
            </div>
          </div>

          <div className="aspect-square bg-[#201C18] border border-[#44403C]/50 p-4 relative">
            <img
              src="https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=1000&q=85"
              alt="Macro shot of solid gold reflection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[16px] border-[#1C1917]/40 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 5. Editorial Split Feature: Fine Necklaces */}
      <section className="py-24 bg-[#F8F3EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-semibold block mb-2">
                Delicate & Statement
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917]">
                Fine Gold Necklaces
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.25em] text-[#1C1917] hover:text-[#C9A66B] font-semibold transition-colors mt-4 md:mt-0 border-b border-[#1C1917] pb-1"
            >
              Explore All Necklaces →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {necklaces.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Press & Patron Testimonials */}
      <section id="journal" className="py-20 bg-[#FAFAF9] border-t border-[#D6D3D1]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Critical Acclaim</span>
          <blockquote className="font-serif text-2xl sm:text-3xl italic text-[#1C1917] leading-relaxed">
            &ldquo;Aurelia proves that luxury doesn&apos;t require excess. Their solid gold ring silhouettes represent the pinnacle of modern minimalist jewelry design.&rdquo;
          </blockquote>
          <div className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] font-semibold">
            — VOGUE ATELIER ARCHIVES
          </div>
        </div>
      </section>
    </div>
  );
}
