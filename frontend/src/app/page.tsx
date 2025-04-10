// app/page.tsx (Next.js 13+ with App Router)
import { Button } from "@/app/components/ui/Button";
import { HeroCarousel } from "@/app/components/HeroCarousel";
import { ProductGrid } from "@/app/components/ProductGrid";
import { Testimonials } from "@/app/components/Testimonials";
import { NewsletterForm } from "@/app/components/NewsletterForm";
import { FeaturedCategories } from "@/app/components/FeaturedCategories";

const mockBestSellers = [
  {
    id: "1",
    name: "Slim Jeans",
    price: 59.99,
    imageUrl: "/products/slim-jeans.jpg",
  },
  {
    id: "2",
    name: "White Tee",
    price: 19.99,
    imageUrl: "/products/white-tee.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start">
      {/* Hero Banner with Carousel */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
          <FeaturedCategories />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Best Sellers</h2>
            <ProductGrid products={mockBestSellers} />
          </div>
      </section>

      {/* Seasonal Collection or Campaign */}
      <section className="w-full py-12 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Spring Collection 2025</h2>
          <p className="mb-6 text-lg text-gray-700">
            Discover vibrant styles and exclusive designs tailored for the new season.
          </p>
          <Button variant="default" size="lg">Explore Now</Button>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
          <Testimonials />
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
