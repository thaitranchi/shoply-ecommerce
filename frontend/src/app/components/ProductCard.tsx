"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/products/${id}`}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="overflow-hidden rounded-t-xl">
        <Image
          src={imgError ? "/fallback/product.jpg" : imageUrl}
          alt={name}
          width={500}
          height={500}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
