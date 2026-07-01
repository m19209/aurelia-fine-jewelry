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
  ringSizes?: number[];
  images: ProductImage[];
  shortDescription: string;
  materialsAndCare: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    sku: "AUR-R-001",
    name: "Lumière Solitaire Eternity Ring",
    category: "Rings",
    style: ["Solitaire", "Eternity", "Minimalist"],
    metalPurity: ["14k Gold", "18k Gold", "22k Gold"],
    weightGrams: 4.2,
    gemstone: "Lab-Grown Diamond VVS1",
    priceUSD: 1450,
    ringSizes: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
    images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
        alt: "Lumière Solitaire Ring extreme close-up on ivory silk",
        angle: "Macro Detail"
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85",
        alt: "Flat lay of Lumière gold ring on warm marble",
        angle: "Flat Lay Trio"
      },
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold ring resting on dark emerald glossy surface",
        angle: "Reflective Surface"
      },
      {
        id: "img-4",
        url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=1000&q=85",
        alt: "Lumière Solitaire Ring on geometric display stand",
        angle: "Display Stand"
      }
    ],
    shortDescription: "An exquisite fusion of minimalist solid gold architecture and brilliant eternity faceting. Designed to catch soft warm highlights from every angle.",
    materialsAndCare: "Crafted in 100% solid recycled gold. Hypoallergenic and tarnish-resistant. Clean gently with warm water, mild dish soap, and a soft microfiber cloth.",
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 124
  },
  {
    sku: "AUR-R-002",
    name: "Celestial Stackable Band Trio",
    category: "Rings",
    style: ["Stackable", "Minimalist"],
    metalPurity: ["14k Gold", "18k Gold"],
    weightGrams: 3.8,
    priceUSD: 890,
    ringSizes: [4, 5, 6, 7, 8, 9],
    images: [
      {
        id: "img-201",
        url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85",
        alt: "Top-down flat lay of three gold stackable bands on cream stone",
        angle: "Flat Lay Trio"
      },
      {
        id: "img-202",
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
        alt: "Stackable bands macro detail showing mirror polish",
        angle: "Macro Detail"
      },
      {
        id: "img-203",
        url: "https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=1000&q=85",
        alt: "Stackable bands on reflective dark background",
        angle: "Reflective Surface"
      },
      {
        id: "img-204",
        url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=1000&q=85",
        alt: "Stackable bands arranged on ivory pedestal",
        angle: "Display Stand"
      }
    ],
    shortDescription: "Three slender, hand-finished bands designed to be worn together or scattered across fingers for understated everyday luxury.",
    materialsAndCare: "Solid 14k or 18k yellow gold. Safe for daily wear, showering, and exercising. Store separately in our plush velvet pouch.",
    isBestSeller: true,
    isNewArrival: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 89
  },
  {
    sku: "AUR-N-001",
    name: "Elysian Floating Drop Pendant",
    category: "Necklaces",
    style: ["Delicate Pendant", "Fine Chain", "Minimalist"],
    metalPurity: ["18k Gold", "22k Gold"],
    weightGrams: 5.6,
    gemstone: "Natural Champagne Diamond",
    priceUSD: 1850,
    images: [
      {
        id: "img-301",
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
        alt: "Floating gold necklace against smooth cream-to-champagne gradient",
        angle: "Floating Shot"
      },
      {
        id: "img-302",
        url: "https://images.unsplash.com/photo-1611591471483-ed3045a556fc?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold pendant draped over geometric ceramic stand",
        angle: "Display Stand"
      },
      {
        id: "img-303",
        url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85",
        alt: "Extreme close-up of delicate fine gold chain clasp",
        angle: "Macro Detail"
      },
      {
        id: "img-304",
        url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold pendant flat lay on ivory marble",
        angle: "Flat Lay Trio"
      }
    ],
    shortDescription: "A pure solid gold teardrop pendant suspended mid-air on an ultra-fine 18-inch adjustable diamond-cut trace chain.",
    materialsAndCare: "Solid 18k or 22k gold chain and pendant. Features an adjustable sliding sphere clasp for customized drop lengths.",
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    rating: 5.0,
    reviewCount: 156
  },
  {
    sku: "AUR-N-002",
    name: "Sovereign Layered Herringbone Set",
    category: "Necklaces",
    style: ["Layered Set", "Statement"],
    metalPurity: ["14k Gold", "18k Gold"],
    weightGrams: 14.2,
    priceUSD: 2400,
    images: [
      {
        id: "img-401",
        url: "https://images.unsplash.com/photo-1611591471483-ed3045a556fc?auto=format&fit=crop&w=1000&q=85",
        alt: "Dual layered gold herringbone chains on cream acrylic stand",
        angle: "Display Stand"
      },
      {
        id: "img-402",
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
        alt: "Floating shot of herringbone chain capturing soft studio light",
        angle: "Floating Shot"
      },
      {
        id: "img-403",
        url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85",
        alt: "Flat lay of herringbone set on warm travertine block",
        angle: "Flat Lay Trio"
      },
      {
        id: "img-404",
        url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85",
        alt: "Macro detail of herringbone weave flexibility",
        angle: "Macro Detail"
      }
    ],
    shortDescription: "A statement pairing of a 3mm fluid liquid gold herringbone collar and a complementary 18-inch box chain.",
    materialsAndCare: "Solid gold. Store flat in the provided structured box to preserve the fluid alignment of the herringbone links.",
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    sku: "AUR-R-003",
    name: "Imperia Vintage Signet Ring",
    category: "Rings",
    style: ["Vintage", "Statement"],
    metalPurity: ["18k Gold", "22k Gold"],
    weightGrams: 8.5,
    priceUSD: 1950,
    ringSizes: [5, 6, 7, 8, 9],
    images: [
      {
        id: "img-501",
        url: "https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold signet ring on dark emerald mirror surface",
        angle: "Reflective Surface"
      },
      {
        id: "img-502",
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
        alt: "Signet face brushed gold macro texture",
        angle: "Macro Detail"
      },
      {
        id: "img-503",
        url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85",
        alt: "Flat lay of vintage signet ring beside dried baby's breath",
        angle: "Flat Lay Trio"
      },
      {
        id: "img-504",
        url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=1000&q=85",
        alt: "Signet ring mounted on minimalist ceramic display stand",
        angle: "Display Stand"
      }
    ],
    shortDescription: "Inspired by antique heirlooms, featuring a softly brushed matte face with high-polished bevels crafted in heavyweight solid gold.",
    materialsAndCare: "Substantial solid 18k or 22k gold. Natural patina develops gracefully over time or can be restored with polishing cloth.",
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 31
  },
  {
    sku: "AUR-N-003",
    name: "Aethel Initial Monogram Pendant",
    category: "Necklaces",
    style: ["Personalized Initial", "Delicate Pendant"],
    metalPurity: ["14k Gold", "18k Gold"],
    weightGrams: 4.1,
    priceUSD: 1100,
    images: [
      {
        id: "img-601",
        url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold initial pendant macro shot on silk background",
        angle: "Macro Detail"
      },
      {
        id: "img-602",
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
        alt: "Floating shot of monogram pendant against champagne gradient",
        angle: "Floating Shot"
      },
      {
        id: "img-603",
        url: "https://images.unsplash.com/photo-1611591471483-ed3045a556fc?auto=format&fit=crop&w=1000&q=85",
        alt: "Initial pendant on neutral display pedestal",
        angle: "Display Stand"
      },
      {
        id: "img-604",
        url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85",
        alt: "Flat lay trio of initial pendant and fine chain",
        angle: "Flat Lay Trio"
      }
    ],
    shortDescription: "A bespoke sculpted gold initial resting on a delicate cable chain. Sculpted with modern serif curves that catch the light effortlessly.",
    materialsAndCare: "Solid gold craftsmanship. Includes complimentary lifetime clasp inspection and ultrasonic cleaning.",
    isBestSeller: false,
    isNewArrival: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 68
  }
];
