"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<"information" | "shipping" | "payment" | "confirmation">("information");
  
  // Guest / Auto-fill simulation state
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [orderId] = useState(() => Math.floor(10000 + Math.random() * 90000));

  const subtotal = cart.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  const shippingCost = subtotal >= 1000 ? 0 : shippingMethod === "express" ? 75 : 45;
  const estimatedTax = Math.round(subtotal * 0.0825);
  const total = subtotal + shippingCost + estimatedTax;

  const handleSimulateAutoFill = () => {
    setEmail("eleanor.vance@luxuryateliers.com");
    setFirstName("Eleanor");
    setLastName("Vance");
    setAddress("742 Evergreen Terrace, Suite 400");
    setCity("San Francisco");
    setZip("94108");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
    clearCart();
  };

  if (cart.length === 0 && step !== "confirmation") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#E8ECF0] flex items-center justify-center text-2xl text-[#44403C] mx-auto">
          ✦
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Your Atelier Bag is Empty</h1>
        <p className="text-xs text-[#44403C] max-w-md mx-auto leading-relaxed tracking-wide">
          Please select at least one solid gold piece from our catalog to proceed with checkout reservation.
        </p>
        <div>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C9A66B] transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 bg-[#1C1917] text-[#C9A66B] rounded-full mx-auto flex items-center justify-center text-3xl shadow-xl">
          ✓
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-semibold">Atelier Order Confirmed</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1917]">Thank You, {firstName || "Valued Patron"}</h1>
          <p className="text-sm text-[#44403C] max-w-lg mx-auto leading-relaxed">
            Your reservation <strong className="text-[#1C1917] font-semibold">#AUR-{orderId}</strong> has been securely transmitted to our master jewelers. A discreet confirmation and tracking dossier have been sent to <strong className="text-[#1C1917] font-semibold">{email || "your email"}</strong>.
          </p>
        </div>

        <div className="bg-[#FAFAF9] p-8 border border-[#D6D3D1] max-w-lg mx-auto text-left space-y-4">
          <h3 className="font-serif text-lg border-b border-[#E8ECF0] pb-2 uppercase tracking-wider">Atelier Shipping Dossier</h3>
          <div className="text-xs space-y-1 text-[#44403C]">
            <p><strong>Recipient:</strong> {firstName} {lastName}</p>
            <p><strong>Destination:</strong> {address}, {city} {zip}</p>
            <p><strong>Courier Method:</strong> Armored Courier & Signature Verification</p>
          </div>
        </div>

        <div>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#C9A66B] transition-all shadow-lg"
          >
            Return to Atelier Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between border-b border-[#D6D3D1] pb-4">
        <Link href="/shop" className="text-xs uppercase tracking-widest text-[#44403C] hover:text-[#1C1917]">
          ← Back to Shop
        </Link>
        <div className="flex gap-4 text-xs uppercase tracking-widest font-semibold">
          <span className={step === "information" ? "text-[#1C1917]" : "text-gray-400"}>1. Information</span>
          <span className="text-gray-300">/</span>
          <span className={step === "shipping" ? "text-[#1C1917]" : "text-gray-400"}>2. Shipping</span>
          <span className="text-gray-300">/</span>
          <span className={step === "payment" ? "text-[#1C1917]" : "text-gray-400"}>3. Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Guest Checkout & Auto-fill Simulation Bar */}
          <div className="bg-[#FAFAF9] p-4 border border-[#D6D3D1] flex justify-between items-center">
            <div className="text-xs">
              <span className="font-semibold block text-[#1C1917] uppercase tracking-wider">Speedy Patron Checkout</span>
              <span className="text-gray-500">Simulate returning client credentials with saved shipping vault.</span>
            </div>
            <button
              type="button"
              onClick={handleSimulateAutoFill}
              className="px-4 py-2 bg-[#E8ECF0] hover:bg-[#1C1917] hover:text-[#FFFFFF] text-[10px] uppercase tracking-widest transition-colors font-semibold"
            >
              Auto-Fill Vault
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {step === "information" && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-2xl text-[#1C1917]">Contact & Delivery Coordinates</h3>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Email Address (For Dossier Tracking)</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">First Name</label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Last Name</label>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Postal Code</label>
                    <input
                      required
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-[#FAFAF9] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!email || !firstName || !address) alert("Please fill in contact and address details.");
                    else setStep("shipping");
                  }}
                  className="w-full py-4 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C9A66B] transition-colors shadow-md"
                >
                  Continue to Shipping Courier
                </button>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-2xl text-[#1C1917]">Select Armored Courier Service</h3>
                
                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      shippingMethod === "standard" ? "border-[#1C1917] bg-[#FAFAF9] shadow-sm" : "border-[#D6D3D1]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={shippingMethod === "standard"} readOnly className="accent-[#1C1917]" />
                      <div>
                        <span className="text-xs uppercase font-semibold block text-[#1C1917]">Insured Standard Courier</span>
                        <span className="text-[11px] text-gray-500">2–3 business days • Signature required</span>
                      </div>
                    </div>
                    <span className="font-semibold text-xs">{subtotal >= 1000 ? "FREE" : "$45"}</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("express")}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      shippingMethod === "express" ? "border-[#1C1917] bg-[#FAFAF9] shadow-sm" : "border-[#D6D3D1]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={shippingMethod === "express"} readOnly className="accent-[#1C1917]" />
                      <div>
                        <span className="text-xs uppercase font-semibold block text-[#1C1917]">Overnight Armored Express</span>
                        <span className="text-[11px] text-gray-500">Next morning delivery by noon</span>
                      </div>
                    </div>
                    <span className="font-semibold text-xs">$75</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("information")}
                    className="w-1/3 py-4 border border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-widest font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="w-2/3 py-4 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C9A66B] transition-colors shadow-md"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-2xl text-[#1C1917]">Secure Vault Payment</h3>
                
                <div className="bg-[#FAFAF9] p-6 border border-[#D6D3D1] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#1C1917]">Credit Card / Concierge Pay</span>
                    <span className="text-xs text-[#C9A66B] font-semibold">🔒 256-Bit TLS Encrypted</span>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• ••••"
                      className="w-full bg-[#F8F3EA] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Expiration</label>
                      <input type="text" placeholder="MM / YY" className="w-full bg-[#F8F3EA] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#44403C] mb-1">Security Code (CVV)</label>
                      <input type="text" placeholder="CVV" className="w-full bg-[#F8F3EA] border border-[#D6D3D1] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="w-1/3 py-4 border border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-widest font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-4 bg-[#1C1917] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C9A66B] transition-colors shadow-xl"
                  >
                    Authorize Payment (${total.toLocaleString()})
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAFAF9] p-6 border border-[#D6D3D1] space-y-6 sticky top-28">
            <h3 className="font-serif text-xl uppercase tracking-wider text-[#1C1917] border-b border-[#E8ECF0] pb-3">
              Order Reservation Summary
            </h3>

            <div className="space-y-4 max-h-80 overflow-y-auto divide-y divide-[#E8ECF0]">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex justify-between items-center text-xs">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-14 bg-[#F8F3EA] border border-[#D6D3D1] flex-shrink-0">
                      <img src={item.product.images[0]?.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <strong className="block text-[#1C1917] font-medium">{item.product.name}</strong>
                      <span className="text-[10px] text-gray-500 uppercase">{item.selectedPurity} • Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.unitPriceUSD * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-[#D6D3D1] text-[#44403C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Courier</span>
                <span>{shippingCost === 0 ? "COMPLIMENTARY" : `$${shippingCost}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Luxury Duty / Tax</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between font-serif text-lg font-bold text-[#1C1917] pt-4 border-t border-[#D6D3D1]">
              <span>Total Investment</span>
              <span className="text-[#C9A66B]">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
