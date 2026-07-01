# Constitution — Aurelia Fine Jewelry Store

## Core Governance & Non-Negotiable Principles

### 1. PRODUCT IMAGERY
Every product image and video shows the jewelry only. No hands, fingers, necks, or any human body part — ever, including future catalog additions. Studio product photography only with macro close-ups, flat lays, or minimalist display-stand shots on creamy or softly gradient backgrounds matching the palette.

### 2. ACCESSIBILITY
WCAG 2.1 AA minimum compliance on every page. The hero video respects `prefers-reduced-motion` (falls back to a static poster image) and has a visible pause/play control. Touch targets must be at least 44x44px. Color contrast ratios must meet 4.5:1 minimum for normal text and 3:1 for large UI glyphs.

### 3. PERFORMANCE
Hero video is compressed (WebM/MP4 H.265) with a poster frame; below-the-fold assets lazy-load. Target Largest Contentful Paint (LCP) under 2.5s. Smooth micro-interactions (150-300ms) with zero layout shifts.

### 4. PAYMENTS & SECURITY
Checkout runs through a PCI-compliant processor (Stripe or equivalent flow). Card data never touches our own servers. Clean, secure guest checkout and order confirmation.

### 5. NO DARK PATTERNS
No forced account creation before checkout, no fees revealed only at the last step, and clear transparency across all pricing, shipping, and return policies.

### 6. CATALOG CONSISTENCY & AESTHETICS
Every product photo follows the exact same lighting, angle logic, and background treatment as the reference shots. Color palette adheres strictly to:
- Background: Creamy ivory / off-white (`#F8F3EA`)
- Primary accent: Warm champagne gold (`#C9A66B`)
- Secondary accent: Deep emerald (`#1F3B2C`) and Charcoal (`#201C18`)
- Typography: Cormorant Garamond / Playfair Display for headings paired with Inter / Montserrat for body.

## Governance & Versioning
- Version: 1.0.0
- Ratification Date: 2026-07-01
- Compliance: All feature specifications, implementation plans, and generated code must be verified against these 6 principles.
