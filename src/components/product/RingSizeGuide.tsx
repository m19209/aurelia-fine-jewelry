"use client";

import React, { useState, useEffect } from "react";

interface RingSizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
}

const SIZE_CONVERSIONS = [
  { us: 4, uk: "H", eu: 46.5, mm: 14.9 },
  { us: 4.5, uk: "I", eu: 47.8, mm: 15.3 },
  { us: 5, uk: "J 1/2", eu: 49.3, mm: 15.7 },
  { us: 5.5, uk: "K 1/2", eu: 50.6, mm: 16.1 },
  { us: 6, uk: "L 1/2", eu: 51.9, mm: 16.5 },
  { us: 6.5, uk: "M 1/2", eu: 53.1, mm: 16.9 },
  { us: 7, uk: "O", eu: 54.4, mm: 17.3 },
  { us: 7.5, uk: "P", eu: 55.7, mm: 17.7 },
  { us: 8, uk: "Q", eu: 57.0, mm: 18.1 },
  { us: 8.5, uk: "Q 1/2", eu: 58.3, mm: 18.5 },
  { us: 9, uk: "R 1/2", eu: 59.5, mm: 18.9 },
];

export default function RingSizeGuide({ isOpen, onClose, onSelectSize }: RingSizeGuideProps) {
  const [activeTab, setActiveTab] = useState<"estimator" | "conversion">("estimator");
  const [sliderMm, setSliderMm] = useState<number>(16.5);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (isOpen) document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Find closest US size for slider diameter
  const closestSize = SIZE_CONVERSIONS.reduce((prev, curr) =>
    Math.abs(curr.mm - sliderMm) < Math.abs(prev.mm - sliderMm) ? curr : prev
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAFAF9] w-full max-w-2xl border border-[#D6D3D1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#F8F3EA] border-b border-[#D6D3D1] flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-semibold">Bespoke Precision</span>
            <h3 className="font-serif text-2xl text-[#1C1917]">Interactive Ring Size Guide</h3>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black">✕</button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D6D3D1] bg-[#E8ECF0]">
          <button
            onClick={() => setActiveTab("estimator")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "estimator" ? "bg-[#FAFAF9] text-[#1C1917] border-t-2 border-[#1C1917]" : "text-[#44403C]"
            }`}
          >
            Interactive Millimeter Estimator
          </button>
          <button
            onClick={() => setActiveTab("conversion")}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "conversion" ? "bg-[#FAFAF9] text-[#1C1917] border-t-2 border-[#1C1917]" : "text-[#44403C]"
            }`}
          >
            International Chart & PDF
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === "estimator" ? (
            <div className="space-y-6 text-center">
              <p className="text-xs text-[#44403C] max-w-md mx-auto leading-relaxed">
                Take an existing ring that fits nicely. Measure the <strong className="text-[#1C1917] font-semibold">inner diameter</strong> in millimeters across the widest center point and adjust the slider below.
              </p>

              {/* Interactive Circle Visualization */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div
                  className="rounded-full border-4 border-[#C9A66B] flex items-center justify-center transition-all duration-200 shadow-inner bg-[#F8F3EA]"
                  style={{
                    width: `${sliderMm * 8}px`,
                    height: `${sliderMm * 8}px`,
                  }}
                >
                  <span className="font-serif text-sm font-semibold text-[#1C1917]">{sliderMm} mm</span>
                </div>
              </div>

              {/* Millimeter Slider */}
              <div className="max-w-md mx-auto space-y-2">
                <input
                  type="range"
                  min="14.5"
                  max="19.5"
                  step="0.1"
                  value={sliderMm}
                  onChange={(e) => setSliderMm(Number(e.target.value))}
                  className="w-full accent-[#1C1917]"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>14.5 mm (Size 3.5)</span>
                  <span>19.5 mm (Size 9.5)</span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="bg-[#F8F3EA] p-4 border border-[#D6D3D1] max-w-sm mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Recommended Atelier Size</span>
                <div className="font-serif text-3xl font-bold text-[#1C1917]">US Size {closestSize.us}</div>
                <div className="text-[11px] text-[#44403C]">
                  UK: {closestSize.uk} • EU: {closestSize.eu}
                </div>
                {onSelectSize && (
                  <button
                    onClick={() => {
                      onSelectSize(closestSize.us);
                      onClose();
                    }}
                    className="mt-3 w-full py-2 bg-[#1C1917] text-[#FFFFFF] text-[10px] uppercase tracking-widest hover:bg-[#C9A66B] transition-colors"
                  >
                    Select US Size {closestSize.us}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#F8F3EA] p-4 border border-[#D6D3D1]">
                <div className="text-xs">
                  <strong className="block text-[#1C1917] uppercase tracking-wider">Printable Ring Sizing PDF</strong>
                  <span className="text-gray-500">Includes exact 1:1 scale cut-out circles for accurate sizing at home.</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#1C1917] text-[#FFFFFF] text-[10px] uppercase tracking-widest hover:bg-[#C9A66B] transition-colors"
                >
                  Print Sizing Sheet
                </button>
              </div>

              {/* Conversion Table */}
              <div className="border border-[#D6D3D1] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#E8ECF0] text-[#1C1917] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3">US Size</th>
                      <th className="p-3">UK Size</th>
                      <th className="p-3">EU Size</th>
                      <th className="p-3">Diameter (mm)</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8ECF0]">
                    {SIZE_CONVERSIONS.map((row) => (
                      <tr key={row.us} className="hover:bg-[#F8F3EA] transition-colors">
                        <td className="p-3 font-semibold text-[#1C1917]">Size {row.us}</td>
                        <td className="p-3">{row.uk}</td>
                        <td className="p-3">{row.eu}</td>
                        <td className="p-3">{row.mm} mm</td>
                        <td className="p-3">
                          {onSelectSize && (
                            <button
                              onClick={() => {
                                onSelectSize(row.us);
                                onClose();
                              }}
                              className="text-[10px] uppercase text-[#C9A66B] font-semibold hover:underline"
                            >
                              Choose
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F3EA] border-t border-[#D6D3D1] text-center text-[11px] text-gray-500">
          Need complimentary ring resizing? Every Aurelia purchase includes one free resize within 60 days.
        </div>
      </div>
    </div>
  );
}
