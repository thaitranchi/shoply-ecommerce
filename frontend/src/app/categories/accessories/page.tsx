import { ProductGrid } from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessories - Shoply",
  description: "Browse trendy and essential accessories to elevate your style.",
};

export default function AccessoriesPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Accessories</h2>
      <p className="text-center text-gray-500 mb-8">
        Discover bags, hats, jewelry, and more to complement your outfits.
      </p>
      <ProductGrid type="accessories" />
    </>
  );
}
