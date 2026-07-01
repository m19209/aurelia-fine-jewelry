# Research & Architectural Decisions: Aurelia Fine Jewelry

## 1. Hero Video & Performance Optimization
- **Decision**: Use an HTML5 `<video>` element with `autoPlay`, `loop`, `muted`, `playsInline`, and an explicit poster image fallback.
- **Rationale**: Meets Constitution Principle 3 for rapid initial LCP while delivering the luxurious 10-second slow-rotating macro video required by the PDF brief.
- **Accessibility Overlay**: Add a custom floating control block in the bottom-right of the hero section enabling users to pause/play the animation at will, respecting `prefers-reduced-motion`.

## 2. Product Imagery Strategy (No Human Parts)
- **Decision**: Generate studio-grade AI product photography mockups depicting solid gold rings and necklaces floating mid-air or resting on ivory silk, marble display blocks, and dark emerald reflective surfaces.
- **Rationale**: Rigorously adheres to Constitution Principle 1 and PDF Section 2 photography rules (no hands, fingers, necks, or busts ever).

## 3. Multi-Faceted Filtering & Instant Search
- **Decision**: Implement client-side filtering via React state/context or URL search parameters (`?category=rings&purity=18k&sort=newest`).
- **Rationale**: Provides instant 0ms latency responses for shoppers browsing a curated catalog of fine jewelry without page reloads.

## 4. Typography & Styling Integration
- **Decision**: Embed Google Fonts for `Cormorant Garamond` (serif headings) and `Montserrat` (clean sans-serif body) integrated cleanly into Tailwind CSS design tokens.
- **Rationale**: Directly executes UI UX Pro Max design system outputs and PDF aesthetic specifications.
