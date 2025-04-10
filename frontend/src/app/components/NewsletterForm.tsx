"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui/Button";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend or service like Mailchimp
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Subscribe to our newsletter</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Stay up to date with our latest offers, product drops, and news.
      </p>
      {submitted ? (
        <p className="text-green-600 text-center">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Button type="submit" variant="default">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
};