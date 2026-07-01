"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAFAF9] pt-20 pb-12 border-t border-[#44403C]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#44403C]/40">
        
        {/* Brand & Mission Column */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="font-serif text-3xl tracking-[0.25em] uppercase font-semibold text-[#FFFFFF] block">
            Aurelia
          </Link>
          <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
            Architectural solid gold jewelry designed with pure intention. Every ring and necklace is handcrafted in 100% solid recycled 14k, 18k, and 22k gold to last generations.
          </p>
          <div className="pt-2 flex gap-4 text-xs tracking-widest uppercase text-[#C9A66B]">
            <span>Atelier Paris</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>Tokyo</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFFF]">Atelier Catalog</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li><Link href="/shop" className="hover:text-[#C9A66B] transition-colors">All Collections</Link></li>
            <li><Link href="/shop" className="hover:text-[#C9A66B] transition-colors">Solid Gold Rings</Link></li>
            <li><Link href="/shop" className="hover:text-[#C9A66B] transition-colors">Fine Necklaces</Link></li>
            <li><Link href="/shop?sort=newest" className="hover:text-[#C9A66B] transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Patron Care */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFFF]">Patron Concierge</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li><Link href="/#craftsmanship" className="hover:text-[#C9A66B] transition-colors">Lifetime Gold Warranty</Link></li>
            <li><Link href="/#shipping" className="hover:text-[#C9A66B] transition-colors">Armored Courier & Returns</Link></li>
            <li><Link href="/#sizing" className="hover:text-[#C9A66B] transition-colors">Complimentary Ring Resizing</Link></li>
            <li><Link href="/#faq" className="hover:text-[#C9A66B] transition-colors">Atelier FAQ & Care</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFFF]">Join the Journal</h4>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Receive private access to new solid gold castings, seasonal archives, and bespoke atelier invitations.
          </p>
          {subscribed ? (
            <div className="p-3 bg-[#1F3B2C] text-white text-xs uppercase tracking-widest text-center border border-[#C9A66B]/40">
              Welcome to the Aurelia Circle
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="bg-[#201C18] border border-[#44403C] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A66B] flex-1"
              />
              <button
                type="submit"
                className="bg-[#C9A66B] hover:bg-[#B89357] text-[#1C1917] px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Compliance & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 uppercase tracking-wider gap-4">
        <p>© {new Date().getFullYear()} Aurelia Fine Jewelry Storefront. Crafted in strict adherence to Constitution Studio Principles.</p>
        <div className="flex gap-6">
          <span>RJC Certified Recycled Gold</span>
          <span>•</span>
          <span>Conflict-Free Atelier</span>
        </div>
      </div>
    </footer>
  );
}
