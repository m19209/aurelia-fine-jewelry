# Data Model: Aurelia Fine Jewelry E-Commerce Platform

## 1. Product Schema (`Product`)
Every item in the catalog strictly conforms to this schema:
```typescript
export type Category = 'Rings' | 'Necklaces';
export type MetalPurity = '14k Gold' | '18k Gold' | '22k Gold';
export type JewelryStyle = 
  | 'Minimalist' | 'Stackable' | 'Statement' | 'Vintage' | 'Eternity' | 'Solitaire' | 'Gemstone Accent'
  | 'Delicate Pendant' | 'Fine Chain' | 'Layered Set' | 'Choker' | 'Personalized Initial';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  angle: 'Macro Detail' | 'Flat Lay Trio' | 'Floating Shot' | 'Reflective Surface' | 'Display Stand';
}

export interface Product {
  sku: string;
  name: string;
  category: Category;
  style: JewelryStyle[];
  metalPurity: MetalPurity[];
  weightGrams: number;
  gemstone?: string;
  priceUSD: number;
  ringSizes?: number[]; // e.g., [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
  images: ProductImage[];
  shortDescription: string;
  materialsAndCare: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}
```

## 2. Cart Item Schema (`CartItem`)
```typescript
export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedPurity: MetalPurity;
  selectedSize?: number;
  quantity: number;
  unitPriceUSD: number;
}
```

## 3. Order & Checkout Schema (`CheckoutState`)
```typescript
export interface ShippingAddress {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddressForLater: boolean;
}

export interface OrderSummary {
  subtotalUSD: number;
  estimatedShippingUSD: number;
  estimatedTaxUSD: number;
  totalUSD: number;
}
```
