import { ProductGrid } from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Fashion - Shoply",
  description: "Discover the latest trends in men’s fashion.",
};

export default function MensFashionPage() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Men&apos;s Fashion</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Explore a curated selection of men&apos;s clothing, accessories, and essentials.
        </p>
        <ProductGrid type="category" category="mensfashion" />
      </div>
    </section>
  );
}
