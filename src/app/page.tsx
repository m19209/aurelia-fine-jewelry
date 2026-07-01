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
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-medium">Critical Acclaim</span>
          <blockquote className="font-serif text-2xl sm:text-3xl italic text-[#1C1917] leading-relaxed">
            &ldquo;Aurelia proves that luxury doesn&apos;t require excess. Their solid gold ring silhouettes represent the pinnacle of modern minimalist jewelry design.&rdquo;
          </blockquote>
          <div className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] font-semibold">
            — VOGUE ATELIER ARCHIVES
          </div>
        </div>
      </section>

      {/* 7. Bespoke Sizing & Armored Shipping */}
      <section className="py-24 bg-[#F8F3EA] border-t border-[#D6D3D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Sizing Section */}
          <div id="sizing" className="bg-[#FAFAF9] p-8 sm:p-12 border border-[#D6D3D1] space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A66B] font-semibold block">
              Precision Fit
            </span>
            <h3 className="font-serif text-3xl text-[#1C1917]">Bespoke Ring Sizing</h3>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              Every ring created in our atelier is cast specifically to standard US sizes ranging from 4 to 9. Should you require custom half or quarter sizing, our master jewelers offer one complimentary resizing within 60 days of acquisition.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] hover:text-[#C9A66B] border-b border-[#1C1917] pb-1 transition-colors"
              >
                Find Your Sizing in Shop →
              </Link>
            </div>
          </div>

          {/* Shipping Section */}
          <div id="shipping" className="bg-[#FAFAF9] p-8 sm:p-12 border border-[#D6D3D1] space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A66B] font-semibold block">
              Discrete & Insured
            </span>
            <h3 className="font-serif text-3xl text-[#1C1917]">Armored Courier Delivery</h3>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              All domestic and international parcels are transported via private armored courier with full transit insurance. Delivery requires mandatory adult signature verification. Acquisitions exceeding $1,000 USD receive complimentary priority express transit.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#44403C] block font-medium">
                ✦ 14-Day Complimentary Atelier Returns
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Atelier FAQ Section */}
      <section id="faq" className="py-24 bg-[#FAFAF9] border-t border-[#D6D3D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-semibold">Knowledge Dossier</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#F8F3EA] border border-[#D6D3D1] space-y-3">
              <h4 className="font-serif text-lg text-[#1C1917] font-semibold">Why 100% Solid Gold?</h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Unlike gold vermeil or plated brass that deteriorates quickly, solid 14k, 18k, and 22k gold never oxidizes, discolors skin, or loses structural integrity. It is an enduring investment.
              </p>
            </div>

            <div className="p-6 bg-[#F8F3EA] border border-[#D6D3D1] space-y-3">
              <h4 className="font-serif text-lg text-[#1C1917] font-semibold">What is the difference between 14k, 18k, and 22k?</h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                14k offers exceptional scratch resistance suited for daily stacking. 18k provides the classic warm European luster, while 22k features rich royal gold richness crafted for heirloom preservation.
              </p>
            </div>

            <div className="p-6 bg-[#F8F3EA] border border-[#D6D3D1] space-y-3">
              <h4 className="font-serif text-lg text-[#1C1917] font-semibold">How do I clean solid gold jewelry?</h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Soak in lukewarm water with mild castile soap for 15 minutes, then gently brush with an ultra-soft natural bristle tool. Every purchase also includes lifetime atelier polishing.
              </p>
            </div>

            <div className="p-6 bg-[#F8F3EA] border border-[#D6D3D1] space-y-3">
              <h4 className="font-serif text-lg text-[#1C1917] font-semibold">Are your metals ethically sourced?</h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Yes. 100% of our gold is RJC-certified recycled gold refined in ethical facilities, ensuring zero mining destruction or human exploitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Direct Atelier Contact */}
      <section id="contact" className="py-24 bg-[#1C1917] text-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C9A66B] font-semibold">Private Concierge</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FFFFFF]">Connect with the Atelier</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              Whether arranging a private showroom viewing or collaborating on custom engravings, our private client directors are available at your service.
            </p>
            <div className="space-y-3 text-xs tracking-wider uppercase pt-4 border-t border-[#44403C]">
              <div><strong className="text-[#C9A66B]">Concierge Desk:</strong> concierge@aureliajewelry.com</div>
              <div><strong className="text-[#C9A66B]">Showroom Hours:</strong> Mon–Sat, 10am – 6pm EST</div>
              <div><strong className="text-[#C9A66B]">Paris Atelier:</strong> 14 Rue de la Paix, 75002 Paris</div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#201C18] p-8 border border-[#44403C]">
            <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry received. A Client Director will contact you within 4 business hours."); }} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Patron Name</label>
                <input required type="text" placeholder="Full Name" className="w-full bg-[#1C1917] border border-[#44403C] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C9A66B]" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email Address</label>
                <input required type="email" placeholder="client@domain.com" className="w-full bg-[#1C1917] border border-[#44403C] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C9A66B]" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Inquiry Nature</label>
                <textarea required rows={3} placeholder="Describe your inquiry or sizing request..." className="w-full bg-[#1C1917] border border-[#44403C] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C9A66B]" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#B89357] text-[#1C1917] text-xs uppercase tracking-[0.25em] font-bold transition-colors">
                Transmit Dossier
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
