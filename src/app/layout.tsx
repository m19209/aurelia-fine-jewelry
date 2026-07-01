import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelia Fine Jewelry | Solid Gold Rings & Necklaces",
  description: "Explore clean, soft, and luxurious solid gold jewelry crafted with unmatched precision. Discover minimalist rings, statement necklaces, and eternal bands.",
  openGraph: {
    title: "Aurelia Fine Jewelry | Solid Gold Rings & Necklaces",
    description: "Premium solid gold rings and necklaces designed with timeless elegance.",
    url: "https://m19209.github.io/aurelia-fine-jewelry/",
    siteName: "Aurelia Fine Jewelry",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurelia Fine Gold Rings on Ivory Silk",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelia Fine Jewelry | Solid Gold Rings & Necklaces",
    description: "Premium solid gold rings and necklaces designed with timeless elegance.",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F3EA] text-[#1C1917]">
        <StoreProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
