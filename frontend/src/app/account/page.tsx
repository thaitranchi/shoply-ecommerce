"use client";

import { useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, New York, NY",
  });

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">My Account</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                value={user.name}
                placeholder="Enter your full name"
                className="mt-1 w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={user.email}
                title="Email Address"
                className="mt-1 w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-600">Shipping Address</label>
              <textarea
                value={user.address}
                title="Shipping Address"
                placeholder="Enter your shipping address"
                className="mt-1 w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setUser({ ...user, address: e.target.value })
                }
              />
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
              Update Profile
            </button>
          </div>
        </div>

        {/* Orders Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <ul className="space-y-3">
            <li className="border rounded-lg px-4 py-3 flex justify-between items-center">
              <span>Order #1045</span>
              <span className="text-sm text-gray-500">Mar 20, 2025</span>
            </li>
            <li className="border rounded-lg px-4 py-3 flex justify-between items-center">
              <span>Order #1032</span>
              <span className="text-sm text-gray-500">Feb 14, 2025</span>
            </li>
            <li className="border rounded-lg px-4 py-3 flex justify-between items-center">
              <span>Order #1019</span>
              <span className="text-sm text-gray-500">Jan 5, 2025</span>
            </li>
          </ul>
          <button className="mt-4 w-full text-sm text-blue-600 hover:underline">
            View All Orders
          </button>
        </div>
      </div>
    </section>
  );
}
