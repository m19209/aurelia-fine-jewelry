"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAF9] shadow-2xl flex flex-col border-l border-[#D6D3D1]">
          
          {/* Header */}
          <div className="p-6 bg-[#F8F3EA] border-b border-[#D6D3D1] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl uppercase tracking-widest text-[#1C1917]">Shopping Atelier Bag</h2>
              <p className="text-[10px] uppercase tracking-wider text-[#44403C] mt-0.5">
                {cart.reduce((s, i) => s + i.quantity, 0)} items reserved
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#44403C] hover:text-[#1C1917] transition-colors"
              aria-label="Close cart drawer"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#1C1917] text-[#FFFFFF] px-6 py-3">
            <div className="flex justify-between text-[11px] uppercase tracking-wider mb-1.5 font-medium">
              <span>
                {amountNeeded === 0 ? "Unlocked: Complimentary Insured Courier" : `Add $${amountNeeded.toLocaleString()} for Free Insured Courier`}
              </span>
              <span>{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-white/20 h-1 rounded-none overflow-hidden">
              <div
                className="bg-[#C9A66B] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#E8ECF0]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8ECF0] flex items-center justify-center text-2xl text-[#44403C]">
                  ✦
                </div>
                <h3 className="font-serif text-xl text-[#1C1917]">Your Bag is Empty</h3>
                <p className="text-xs text-[#44403C] tracking-wide max-w-xs">
                  Discover timeless solid gold rings and fine necklaces handcrafted in our atelier.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-8 py-3 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C9A66B] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-6 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 bg-[#F8F3EA] flex-shrink-0 border border-[#D6D3D1]">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.sku}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm text-[#1C1917] hover:text-[#C9A66B] transition-colors font-medium leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 text-xs ml-2"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-[#44403C]">
                        <span className="bg-[#E8ECF0] px-1.5 py-0.5">{item.selectedPurity}</span>
                        {item.selectedSize && (
                          <span className="bg-[#E8ECF0] px-1.5 py-0.5">Size {item.selectedSize}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-[#D6D3D1]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="px-2.5 py-1 text-xs hover:bg-[#E8ECF0] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="px-2.5 py-1 text-xs hover:bg-[#E8ECF0] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-sm text-[#1C1917]">
                        ${(item.unitPriceUSD * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F8F3EA] border-t border-[#D6D3D1] space-y-4">
              <div className="space-y-1.5 text-xs text-[#44403C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1917]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? "FREE" : "$45"}</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-serif font-semibold text-[#1C1917] pt-2 border-t border-[#D6D3D1]">
                <span>Estimated Total</span>
                <span>
                  ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 45)).toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-3.5 bg-[#1C1917] hover:bg-[#C9A66B] text-[#FFFFFF] text-center text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Proceed to Checkout
              </Link>

              <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                🔒 256-Bit Encrypted Secure Checkout • Complimentary Returns
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
