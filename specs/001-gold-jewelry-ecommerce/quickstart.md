# Quickstart Guide & Validation Scenarios: Aurelia Fine Jewelry

## Prerequisites & Local Setup
1. Node.js v20+ installed locally.
2. Navigate to project root: `/Users/mac/.gemini/antigravity/scratch/aurelia-jewelry`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your web browser.

## Validation Scenarios

### Scenario 1: Hero Video & Constitution Principle 1 Verification
- **Test**: Verify that the homepage hero video auto-plays smoothly, displays macro slow-rotating gold rings/necklaces on creamy backgrounds without any human hands or parts, and includes an active pause control.
- **Expected Outcome**: Clicking the pause toggle stops the video immediately; no human limbs/models exist anywhere on the page.

### Scenario 2: Shop Grid Multi-Faceted Filtering & Sorting
- **Test**: Navigate to `/shop`. Select `Category: Rings`, `Style: Stackable`, and `Metal Purity: 18k Gold`. Change sorting to `Price: Low to High`.
- **Expected Outcome**: Grid updates instantly with zero page reload, displaying only stackable 18k gold rings sorted ascending by USD price.

### Scenario 3: Product Detail Page & Interactive Sizing Modal
- **Test**: Click on any product card (e.g., "Aurelia Eternity Solitaire Ring"). Switch between the 4 studio image angles. Click the "Ring Size Guide" button.
- **Expected Outcome**: Sizing guide modal opens smoothly with circumference conversion table and exchange policy notes.

### Scenario 4: Slide-Over Cart & Guest Checkout Flow
- **Test**: Select Ring Size 6, 18k Gold, and click "Add to Bag". Open the slide-over cart drawer and click "Proceed to Checkout". Enter simulated guest shipping info and submit.
- **Expected Outcome**: Order confirmation screen displays with itemized subtotal, estimated tax, and estimated shipping without requiring user account creation.
