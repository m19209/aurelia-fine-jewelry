"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const router = useRouter();
  const { cart, wishlist, setIsCartOpen, isSearchOpen, setIsSearchOpen, filters, setFilters } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    router.push("/shop");
  };

  const handleCategoryNav = (cat: 'Rings' | 'Necklaces' | 'All') => {
    setFilters(prev => ({ ...prev, category: cat }));
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/shop");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F3EA]/90 backdrop-blur-md border-b border-[#E8ECF0] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1917]">
            <div 
              className="relative group"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link href="/shop" className="hover:text-[#C9A66B] transition-colors py-2 flex items-center gap-1">
                Shop
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-[#FAFAF9] border border-[#D6D3D1] shadow-xl py-4 px-6 space-y-3 transition-all duration-200 animate-fadeIn">
                  <button 
                    onClick={() => handleCategoryNav('All')} 
                    className="block w-full text-left text-xs uppercase tracking-widest hover:text-[#C9A66B] transition-colors"
                  >
                    All Collections
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('Rings')} 
                    className="block w-full text-left text-xs uppercase tracking-widest hover:text-[#C9A66B] transition-colors"
                  >
                    Solid Gold Rings
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('Necklaces')} 
                    className="block w-full text-left text-xs uppercase tracking-widest hover:text-[#C9A66B] transition-colors"
                  >
                    Fine Necklaces
                  </button>
                  <Link 
                    href="/shop?sort=newest" 
                    onClick={() => setShopDropdownOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#C9A66B] transition-colors pt-2 border-t border-[#E8ECF0]"
                  >
                    New Arrivals
                  </Link>
                  <Link 
                    href="/shop?sort=popularity" 
                    onClick={() => setShopDropdownOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#C9A66B] transition-colors"
                  >
                    Best Sellers
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#craftsmanship" className="hover:text-[#C9A66B] transition-colors">About</Link>
            <Link href="/#journal" className="hover:text-[#C9A66B] transition-colors">Journal</Link>
            <Link href="/#contact" className="hover:text-[#C9A66B] transition-colors">Contact</Link>
          </nav>

          {/* Brand Logo (Center) */}
          <div className="flex-1 md:flex-initial text-center">
            <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-semibold uppercase text-[#1C1917] hover:opacity-80 transition-opacity">
              Aurelia
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 text-[#1C1917]">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 hover:text-[#C9A66B] transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account Icon */}
            <Link 
              href="/#account" 
              aria-label="User Account"
              className="p-2 hover:text-[#C9A66B] transition-colors hidden sm:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Wishlist Icon */}
            <Link 
              href="/#wishlist" 
              aria-label="Wishlist"
              className="p-2 relative hover:text-[#C9A66B] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A66B] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="p-2 relative hover:text-[#C9A66B] transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1C1917] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 md:hidden hover:text-[#C9A66B] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAF9] border-t border-[#D6D3D1] px-6 py-6 space-y-4">
            <button 
              onClick={() => handleCategoryNav('All')} 
              className="block w-full text-left uppercase text-sm tracking-widest py-2 border-b border-[#E8ECF0]"
            >
              Shop All
            </button>
            <button 
              onClick={() => handleCategoryNav('Rings')} 
              className="block w-full text-left uppercase text-sm tracking-widest py-2 border-b border-[#E8ECF0]"
            >
              Rings
            </button>
            <button 
              onClick={() => handleCategoryNav('Necklaces')} 
              className="block w-full text-left uppercase text-sm tracking-widest py-2 border-b border-[#E8ECF0]"
            >
              Necklaces
            </button>
            <Link 
              href="/#craftsmanship" 
              onClick={() => setMobileMenuOpen(false)}
              className="block uppercase text-sm tracking-widest py-2 border-b border-[#E8ECF0]"
            >
              About & Craftsmanship
            </Link>
            <Link 
              href="/#journal" 
              onClick={() => setMobileMenuOpen(false)}
              className="block uppercase text-sm tracking-widest py-2"
            >
              Journal
            </Link>
          </div>
        )}
      </header>

      {/* Instant Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1917]/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-[#FAFAF9] w-full max-w-2xl p-6 shadow-2xl border border-[#D6D3D1]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg tracking-widest uppercase">Search Catalog</h3>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-black p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Search rings, necklaces, 18k gold..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                autoFocus
                className="w-full bg-[#F8F3EA] border border-[#D6D3D1] px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#C9A66B]"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A66B] font-semibold text-xs tracking-wider uppercase"
              >
                Search
              </button>
            </form>
            {/* Quick Suggestions */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 tracking-wider uppercase mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Solitaire", "18k Gold", "Eternity", "Stackable", "Pendant"].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setFilters({ ...filters, searchQuery: tag });
                      setIsSearchOpen(false);
                      router.push("/shop");
                    }}
                    className="text-xs px-3 py-1 bg-[#E8ECF0] hover:bg-[#C9A66B] hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
