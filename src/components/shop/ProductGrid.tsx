"use client";

import React, { useMemo } from "react";
import { useStore, FilterState } from "@/context/StoreContext";
import { PRODUCTS, MetalPurity, Category, JewelryStyle } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function ProductGrid() {
  const { filters, setFilters, resetFilters } = useStore();

  const allStyles = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.style.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const purities: MetalPurity[] = ["14k Gold", "18k Gold", "22k Gold"];
  const categories: (Category | "All")[] = ["All", "Rings", "Necklaces"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) return false;
      
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        const matchStyle = product.style.some((s) => s.toLowerCase().includes(q));
        const matchPurity = product.metalPurity.some((m) => m.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchStyle && !matchPurity) return false;
      }

      // Styles filter
      if (filters.styles.length > 0) {
        const hasStyle = filters.styles.some((s) => product.style.includes(s as JewelryStyle));
        if (!hasStyle) return false;
      }

      // Purity filter
      if (filters.purities.length > 0) {
        const hasPurity = filters.purities.some((p) => product.metalPurity.includes(p));
        if (!hasPurity) return false;
      }

      // Max price
      if (product.priceUSD > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price_asc") return a.priceUSD - b.priceUSD;
      if (filters.sortBy === "price_desc") return b.priceUSD - a.priceUSD;
      if (filters.sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return b.rating - a.rating; // default popularity
    });
  }, [filters]);

  const toggleStyleFilter = (style: string) => {
    setFilters((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  };

  const togglePurityFilter = (purity: MetalPurity) => {
    setFilters((prev) => ({
      ...prev,
      purities: prev.purities.includes(purity)
        ? prev.purities.filter((p) => p !== purity)
        : [...prev.purities, purity],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Header & Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#D6D3D1] gap-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917]">
            {filters.category === "All" ? "Atelier Collection" : `Solid Gold ${filters.category}`}
          </h1>
          <p className="text-xs text-[#44403C] tracking-wider uppercase mt-2">
            Showing {filteredProducts.length} timeless pieces crafted in pure solid gold
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Category Tabs */}
          <div className="flex bg-[#E8ECF0] p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all ${
                  filters.category === cat
                    ? "bg-[#1C1917] text-[#FFFFFF] shadow-sm font-medium"
                    : "text-[#44403C] hover:text-[#1C1917]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState["sortBy"] }))}
            className="bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-2 text-xs uppercase tracking-widest text-[#1C1917] focus:outline-none focus:border-[#C9A66B]"
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="newest">Sort by: New Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Filters Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-8">
        
        {/* Filters Sidebar */}
        <aside className="space-y-8 bg-[#FAFAF9] p-6 border border-[#E8ECF0] h-fit">
          <div className="flex justify-between items-center pb-4 border-b border-[#E8ECF0]">
            <h3 className="font-serif text-lg tracking-wider uppercase text-[#1C1917]">Refine By</h3>
            <button
              onClick={resetFilters}
              className="text-[10px] uppercase tracking-widest text-[#C9A66B] hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Metal Purity Filter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3">Metal Purity</h4>
            <div className="space-y-2">
              {purities.map((p) => (
                <label key={p} className="flex items-center gap-3 text-xs text-[#44403C] cursor-pointer hover:text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={filters.purities.includes(p)}
                    onChange={() => togglePurityFilter(p)}
                    className="accent-[#1C1917] w-4 h-4 rounded-none border-[#D6D3D1]"
                  />
                  <span>{p} Solid Gold</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="uppercase tracking-widest font-semibold text-[#1C1917]">Max Price</span>
              <span className="font-medium text-[#C9A66B]">${filters.maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="3500"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#1C1917] bg-[#D6D3D1]"
            />
          </div>

          {/* Jewelry Style Filter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3">Atelier Style</h4>
            <div className="flex flex-wrap gap-2">
              {allStyles.map((style) => {
                const isSelected = filters.styles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyleFilter(style)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all border ${
                      isSelected
                        ? "bg-[#1C1917] text-[#FFFFFF] border-[#1C1917]"
                        : "bg-[#F8F3EA] text-[#44403C] border-[#D6D3D1] hover:border-[#1C1917]"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Product Cards Gallery */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAFAF9] border border-[#E8ECF0]">
              <h3 className="font-serif text-2xl text-[#1C1917]">No Pieces Match Your Criteria</h3>
              <p className="text-xs uppercase tracking-widest text-[#44403C] mt-2">
                Try resetting your filters or exploring another collection.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-3 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C9A66B] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
