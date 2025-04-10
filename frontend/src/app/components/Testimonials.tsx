// components/testimonials.tsx
"use client";
import Image from "next/image";

const testimonials = [
  {
    name: "Anna Nguyen",
    title: "Verified Customer",
    quote:
      "Shoply has completely changed how I shop online. The experience is seamless, and the quality is top-notch!",
    avatar: "/avatars/anna.jpg",
  },
  {
    name: "Michael Tran",
    title: "Repeat Buyer",
    quote:
      "I love the fast delivery and responsive customer service. Highly recommended!",
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Linh Le",
    title: "Fashion Enthusiast",
    quote:
      "The styles are always on-trend, and I appreciate the eco-conscious packaging. Shoply gets it right!",
    avatar: "/avatars/linh.jpg",
  },
];

export function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={t.avatar}
              alt={t.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
              onError={(e) => (e.currentTarget.src = "/placeholder-avatar.jpg")}
            />
            <div>
              <p className="font-semibold text-lg">{t.name}</p>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
          <p className="text-gray-700 italic">“{t.quote}”</p>
        </div>
      ))}
    </div>
  );
}