import { ProductGrid } from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sale - Shoply",
  description: "Get the best deals on selected products. Limited time only!",
};

export default function SalePage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
        🔥 On Sale Now
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Save big on best-selling items. While supplies last.
      </p>
      <ProductGrid type="sale" />
    </>
  );
}
