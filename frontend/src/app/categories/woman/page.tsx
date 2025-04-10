import { ProductGrid } from "@/app/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Fashion - Shoply",
  description: "Shop the latest styles and trends in women's fashion.",
};

export default function WomenFashionPage() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Women&apos;s Fashion</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Browse our exclusive collection of women&apos;s clothing, accessories, and more.
        </p>
        <ProductGrid type="category" category="woman" />
      </div>
    </section>
  );
}
