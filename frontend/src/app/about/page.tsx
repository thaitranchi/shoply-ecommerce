import { Heart, Star, Leaf, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          We&apos;re not just an ecommerce store — we&apos;re a lifestyle brand committed to quality, sustainability, and community.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Mission</h2>
        <p className="text-center text-gray-700 text-lg max-w-2xl mx-auto">
          At Shoply, our mission is to create seamless, enjoyable shopping experiences. From curated collections to conscious sourcing, we build for real people with real lives.
        </p>
      </div>

      {/* Our Values */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">Our Values</h2>
        <div className="flex flex-col items-center space-y-6">
          {[
            {
              icon: <Heart className="h-6 w-6 text-pink-500" />,
              label: "Customer-centric design",
            },
            {
              icon: <Star className="h-6 w-6 text-yellow-500" />,
              label: "Commitment to quality",
            },
            {
              icon: <Leaf className="h-6 w-6 text-green-500" />,
              label: "Ethical sourcing and sustainability",
            },
            {
              icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
              label: "Innovation in every detail",
            },
          ].map((value, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full shadow-sm">{value.icon}</div>
              <p className="text-lg text-gray-700 font-medium">{value.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
