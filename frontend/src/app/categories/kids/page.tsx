import { Metadata } from "next";
import { ProductGrid } from "@/app/components/ProductGrid"; 

export const metadata: Metadata = {
  title: "Kids Collection - Shoply",
  description: "Shop clothing and accessories for kids.",
};

export default function KidsCategoryPage() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Kids Collection</h1>
        <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover fun and comfortable clothing for your little ones. Shop the latest styles in kidswear today.
        </p>
        <ProductGrid type="kids" />
      </div>
    </section>
  );
}
