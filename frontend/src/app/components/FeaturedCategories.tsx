// components/featured-categories.tsx
"use client";

import Image from "next/image";

const categories = [
  {
    name: "Men's Fashion",
    image: "/categories/mens-fashion.jpg",
  },
  {
    name: "Women's Fashion",
    image: "/categories/womens-fashion.jpg",
  },
  {
    name: "Accessories",
    image: "/categories/accessories.jpg",
  },
  {
    name: "Footwear",
    image: "/categories/footwear.jpg",
  },
];

export function FeaturedCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.name}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/fallback/category.jpg";
            }}
          />
          <div className="p-4 text-center font-medium">{category.name}</div>
        </div>
      ))}
    </div>
  );
}
