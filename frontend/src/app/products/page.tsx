import { ProductGrid } from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - Shoply",
  description: "Browse our full collection of high-quality, stylish products.",
};

export default function ProductPage() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
        <ProductGrid type="all" />
      </div>
    </section>
  );
}
