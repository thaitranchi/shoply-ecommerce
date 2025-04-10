import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories - Shoply",
  description: "Explore all product categories in one place.",
};

const categories = [
  {
    name: "Men",
    href: "/categories/men",
    image: "/categories/men.jpg",
  },
  {
    name: "Women",
    href: "/categories/woman",
    image: "/categories/woman.jpg",
  },
  {
    name: "Kids",
    href: "/categories/kids",
    image: "/categories/kids.jpg",
  },
  {
    name: "Accessories",
    href: "/categories/accessories",
    image: "/categories/accessories.jpg",
  },
  {
    name: "Sale",
    href: "/categories/sale",
    image: "/categories/sale.jpg",
  },
];

export default function CategoriesPage() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Shop by Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative block rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={600}
                height={400}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition" />
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
