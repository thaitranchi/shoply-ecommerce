import { ProductCard } from "./ProductCard";
import type { Product } from "@/app/types/product";

interface ProductGridProps {
  products?: Product[]; // Optional để hỗ trợ fallback
  type?: string; // Add the 'type' prop to the interface
  category?: string; // Add the optional 'category' property
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  if (!products.length) {
    return (
      <p className="text-center text-gray-500 w-full py-10">
        No products available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {products.map((product) => (
        <div
          key={product.id}
          className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <ProductCard {...product} imageUrl={product.imageUrl || "/default-image.jpg"} />
        </div>
      ))}
    </div>
  );
}
