"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import ProductGrid from "@/components/products/product-grid";
import { MOCK_PRODUCTS, CATEGORIES } from "@/app/data/products";
import { ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);

  // Dynamically filter pre-loved items depending on the active category selected by tabs
  useEffect(() => {
    if (activeCategory === "All") {
      // For the homepage, we only display highly curated "featured" items
      setFilteredProducts(MOCK_PRODUCTS.filter((p) => p.featured === true));
    } else {
      setFilteredProducts(
        MOCK_PRODUCTS.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase() && p.featured === true
        )
      );
    }
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Animated Banner & Quick Categories */}
        <Hero />

        {/* Dynamic Curation Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 uppercase tracking-wider mb-3 border border-amber-200/20">
                Staff Picks
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
                Featured Pre-Loved Finds
              </h2>
              <p className="mt-1.5 text-zinc-500 text-xs sm:text-sm max-w-lg leading-relaxed">
                Hand-selected authenticated listings in excellent condition, ready for quick dynamic WhatsApp ordering in Nigeria.
              </p>
            </div>

            {/* Link to Dedicated Products Page */}
            <Link href="/products" className="hidden md:inline-block">
              <Button variant="ghost" className="rounded-full text-xs font-bold gap-1 hover:bg-zinc-100">
                Browse Full Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Interactive Category Tabs Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                    : "bg-zinc-55 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid showing filtered items */}
          <div className="min-h-[250px]">
            <ProductGrid products={filteredProducts} />
          </div>

          {/* Mobile Quick Catalog Redirect */}
          <div className="mt-10 text-center md:hidden">
            <Link href="/products" className="w-full inline-block">
              <Button className="w-full h-11 rounded-full font-bold bg-zinc-50 text-zinc-850 border border-zinc-200">
                Browse Full Catalog
              </Button>
            </Link>
          </div>
        </section>

        {/* Educational Circular Economy Guide */}
        <section id="how-it-works" className="py-20 bg-zinc-50 border-t border-zinc-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Circular Market Model
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 mt-2">
                How SecondHand Works
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                Connect pre-loved item buyers and sellers locally in three easy, friction-free steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-zinc-150 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-extrabold text-sm mb-4">
                  01
                </div>
                <h3 className="font-bold text-sm text-zinc-800">Explore Catalog</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Browse authentic listings, review condition ratings, size metrics, and select items that fit your personal style.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-zinc-150 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-extrabold text-sm mb-4">
                  02
                </div>
                <h3 className="font-bold text-sm text-zinc-800">Build Your Bag</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Add items to your persisted shopping bag. Control quantity sizes and review dynamic subtotal math before checkout.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-zinc-950 text-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-extrabold text-sm mb-4">
                  03
                </div>
                <h3 className="font-bold text-sm text-white">WhatsApp Checkout</h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Fill shipping forms. Click submit to dynamically generate details and instantly ping each item&apos;s seller over WhatsApp!
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-16 bg-white border-t border-zinc-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-6 rounded-2xl border border-zinc-150/80 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900">Condition Audited</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Full listing honesty with condition scores out of 10 and real, multi-angle actual product pictures.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-150/80 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Zap className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900">Zero Intermediary</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  No hidden credit card processing charges or middleman commissions. Buyers deal directly with item owners.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-150/80 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                  <Heart className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900">Sustainable Thrift</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Keep items in use for longer, reduce environmental clothing waste, and save massively on premium brands.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Basic Footer */}
      <footer className="border-t border-zinc-150 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} SecondHandCircular. Built as a functional frontend.</p>
          <p className="font-bold text-zinc-500">Naira Currency Format (₦)</p>
        </div>
      </footer>
    </div>
  );
}
