"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          <form className="space-y-4">
            {["name", "email", "address", "city", "zip", "country"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 capitalize">{field}</label>
                <input
                  type="text"
                  value={form[field as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder={`Enter your ${field}`}
                  className="mt-1 w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Classic T-Shirt</span>
              <span>$25.00</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex justify-between font-bold border-t pt-4">
              <span>Total</span>
              <span>$30.00</span>
            </li>
          </ul>

          <button
            className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
            onClick={() => alert("Redirecting to payment gateway...")}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
  );
}
