import Link from "next/link";
import { Mail, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        {/* Branding */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Shoply</h3>
          <p className="mb-4">Your destination for the latest trends.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-blue-500" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-pink-500" />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2">
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/new">New Arrivals</Link></li>
            <li><Link href="/sale">On Sale</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
          </ul>
        </div>

        {/* Company & Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 mb-4">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
          <form className="mt-4">
            <label htmlFor="email" className="sr-only">Subscribe</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pr-10 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 Shoply. All rights reserved.
      </div>
    </footer>
  );
}
