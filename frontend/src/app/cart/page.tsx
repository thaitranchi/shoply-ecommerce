"use client";

import { useState } from "react";
import Image from "next/image";

const sampleCartItems = [
  {
    id: 1,
    name: "Men's Classic Hoodie",
    price: 49.99,
    quantity: 1,
    image: "/products/hoodie.jpg",
  },
  {
    id: 2,
    name: "Women's Denim Jacket",
    price: 79.99,
    quantity: 2,
    image: "/products/jacket.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="w-24 h-24 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      className="w-16 px-2 py-1 border rounded-lg text-center"
                      placeholder="Qty"
                      title="Quantity"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-medium text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 text-right">
            <p className="text-xl font-semibold mb-4">Total: ${total.toFixed(2)}</p>
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
