import React from "react";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Explore Our Collections</h1>
          <p className="text-lg text-gray-600">
            Discover curated styles for men, women, and kids.
          </p>
        </header>
        {children}
      </div>
    </section>
  );
}
