"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const togglePlayPause = () => {
    if (!videoRef.current || videoError) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => setVideoError(true));
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] bg-[#F8F3EA] overflow-hidden flex items-center justify-center">
      {/* Video Background (Strictly product-only macro shots) */}
      <div className="absolute inset-0 w-full h-full">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            poster="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-1000 motion-reduce:hidden"
          >
            {/* Stable royalty-free jewelry video sources */}
            <source src="https://videos.pexels.com/video-files/6045353/6045353-uhd_2560_1440_25fps.mp4" type="video/mp4" onError={() => setVideoError(true)} />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-golden-ring-with-diamonds-41484-large.mp4" type="video/mp4" onError={() => setVideoError(true)} />
            Your browser does not support HTML5 video.
          </video>
        )}

        {/* Fallback image when video errors or reduced motion is requested */}
        <img 
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85"
          alt="Aurelia Fine Gold Ring Macro Shot"
          className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-out scale-105 hover:scale-100 ${videoError ? "block animate-fadeIn" : "hidden motion-reduce:block"}`}
        />

        {/* Soft Cream-to-Champagne Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EA] via-[#F8F3EA]/30 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 mt-12">
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#44403C] font-semibold bg-[#FAFAF9]/80 px-4 py-1.5 border border-[#D6D3D1] backdrop-blur-sm">
          Solid Gold Craftsmanship
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider text-[#1C1917] font-normal leading-tight">
          Pure Architecture of <span className="italic font-light text-[#C9A66B]">Eternal Light</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#44403C] font-light tracking-wide leading-relaxed">
          Uncompromised 14k, 18k, and 22k solid gold rings and necklaces. Handcrafted without compromise for everyday distinction.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#1C1917] text-[#FFFFFF] hover:bg-[#C9A66B] transition-all duration-300 text-xs uppercase tracking-[0.25em] font-medium shadow-lg hover:shadow-xl"
          >
            Explore Collection
          </Link>
          <Link
            href="/#craftsmanship"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FFFFFF] transition-all duration-300 text-xs uppercase tracking-[0.25em] font-medium"
          >
            Our Atelier
          </Link>
        </div>
      </div>

      {/* WCAG Accessible Video Pause/Play Control Toggle */}
      {!videoError && (
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#FAFAF9]/80 hover:bg-[#FAFAF9] border border-[#D6D3D1] text-[#1C1917] text-[10px] uppercase tracking-widest backdrop-blur-md transition-all shadow-sm"
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#C9A66B] animate-pulse" />
                Pause Video
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                Play Video
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
