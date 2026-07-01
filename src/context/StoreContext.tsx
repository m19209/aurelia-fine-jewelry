"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, MetalPurity, Category } from "@/data/products";

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedPurity: MetalPurity;
  selectedSize?: number;
  quantity: number;
  unitPriceUSD: number;
}

export interface FilterState {
  category: Category | 'All';
  styles: string[];
  purities: MetalPurity[];
  maxPrice: number;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popularity';
  searchQuery: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, purity: MetalPurity, size?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[]; // array of product SKUs
  toggleWishlist: (sku: string) => void;
  isInWishlist: (sku: string) => boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const initialFilters: FilterState = {
  category: 'All',
  styles: [],
  purities: [],
  maxPrice: 3500,
  sortBy: 'popularity',
  searchQuery: ''
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("aurelia_cart");
        const savedWishlist = localStorage.getItem("aurelia_wishlist");
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to load store state from localStorage", e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem("aurelia_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("aurelia_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, purity: MetalPurity, size?: number) => {
    // Calculate price adjustment based on purity
    let priceMultiplier = 1;
    if (purity === "18k Gold") priceMultiplier = 1.2;
    if (purity === "22k Gold") priceMultiplier = 1.45;
    const unitPriceUSD = Math.round(product.priceUSD * priceMultiplier);

    const cartItemId = `${product.sku}-${purity}-${size || 'nosize'}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { cartItemId, product, selectedPurity: purity, selectedSize: size, quantity: 1, unitPriceUSD }];
      }
    });
    setIsCartOpen(true);
    console.log(`[Analytics Event] ADD_TO_CART: SKU=${product.sku}, Purity=${purity}, Price=$${unitPriceUSD}`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (sku: string) => {
    setWishlist((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const isInWishlist = (sku: string) => wishlist.includes(sku);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        filters,
        setFilters,
        resetFilters,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
