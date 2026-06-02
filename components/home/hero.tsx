"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Shirt, Smartphone, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Submits search to the products listing page with the query in URL params
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Navigates to products page with category preset in URL query params
  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const quickCategories = [
    { name: "Fashion", icon: Shirt, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Sneakers", icon: Compass, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { name: "Electronics", icon: Smartphone, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { name: "Home", icon: Home, color: "bg-rose-50 text-rose-600 border-rose-100" },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-zinc-50 border-b border-zinc-150">
      {/* Soft Decorative Background Accents */}
      <div className="absolute top-0 right-1/4 -translate-y-24 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-24 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Static Promo Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/5 text-zinc-800 mb-6 border border-zinc-200 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>Circular Economy Secondhand Hub</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-zinc-900">
            Buy & Sell Pre-loved <br />
            <span className="bg-linear-to-r from-amber-500 via-orange-600 to-rose-500 bg-clip-text text-transparent">
              Quality Goods
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
            Discover verified outfits, sneakers, and gadgets in Nigeria. Connect directly with individual sellers and complete your checkout via WhatsApp!
          </p>

          {/* Simple Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 w-full max-w-md flex items-center p-1 rounded-full border border-zinc-300 bg-white shadow-md focus-within:ring-2 focus-within:ring-zinc-950 transition-all"
          >
            <div className="pl-4 text-zinc-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search sneakers, clothing, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-2 pr-4 py-2.5 bg-transparent text-sm text-zinc-900 outline-hidden placeholder-zinc-400"
            />
            <Button
              type="submit"
              className="rounded-full h-10 px-5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              Search
            </Button>
          </form>

          {/* Quick Categories Bar */}
          <div className="mt-10 w-full">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Explore Categories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-xs font-bold text-zinc-700 transition-all shadow-2xs group"
                  >
                    <span className={`p-1 rounded-md ${cat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
