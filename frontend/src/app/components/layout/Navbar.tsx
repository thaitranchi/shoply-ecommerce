// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PromoBanner } from "./PromoBanner";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <PromoBanner />

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-cropped.svg"
              alt="Shoply Logo"
              width={90}
              height={90}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="hover:text-gray-800">🛒</Link>
            <Link href="/account" className="hover:text-gray-800">👤</Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col items-end space-y-4 pt-6 text-gray-700 font-medium">
              <li><Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
              <li><Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link></li>
              <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
              <li><Link href="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart</Link></li>
              <li><Link href="/account" onClick={() => setMenuOpen(false)}>👤 Account</Link></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
