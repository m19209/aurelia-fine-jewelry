import React from "react";
import { PRODUCTS } from "@/data/products";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    sku: product.sku,
  }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
