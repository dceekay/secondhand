"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import ProductGrid from "@/components/products/product-grid";
import ProductFilters, { FilterState } from "@/components/products/product-filters";
import { MOCK_PRODUCTS } from "@/app/data/products";
import { ProductCondition } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Default filter values
const INITIAL_FILTERS: FilterState = {
  search: "",
  category: "All",
  priceMin: "",
  priceMax: "",
  conditions: [],
  sortBy: "latest",
};

function CatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Create filters state
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);

  // Sync URL search params with react filters state on page load
  useEffect(() => {
    const categoryQuery = searchParams.get("category") || "All";
    const searchQuery = searchParams.get("search") || "";
    
    setFilters((prev) => ({
      ...prev,
      category: categoryQuery,
      search: searchQuery === "focus" ? "" : searchQuery,
    }));
  }, [searchParams]);

  // Compute filtered & sorted products lists in real time
  useEffect(() => {
    let result = [...MOCK_PRODUCTS];

    // 1. Text Search Filter (Title / Brand / Description)
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      );
    }

    // 2. Category Tab Filter
    if (filters.category !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 3. Secondhand Condition Checkboxes Filter
    if (filters.conditions.length > 0) {
      result = result.filter((p) => filters.conditions.includes(p.condition));
    }

    // 4. Min Price Filter
    if (filters.priceMin) {
      const minVal = parseFloat(filters.priceMin);
      result = result.filter((p) => p.price >= minVal);
    }

    // 5. Max Price Filter
    if (filters.priceMax) {
      const maxVal = parseFloat(filters.priceMax);
      result = result.filter((p) => p.price <= maxVal);
    }

    // 6. Sorting Computations
    if (filters.sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price); // Price: Low to High
    } else if (filters.sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price); // Price: High to Low
    } else if (filters.sortBy === "scoreDesc") {
      result.sort((a, b) => b.conditionScore - a.conditionScore); // Best Condition Score First
    } else {
      // Default: Latest First (by mock createdAt date strings)
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredProducts(result);
  }, [filters]);

  // Reset helper
  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    // Clear URL parameters
    router.push("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title Header */}
      <div className="mb-8 pb-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">
            Catalog Search
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            {filteredProducts.length === 1 
              ? "Found 1 secondhand item." 
              : `Found ${filteredProducts.length} secondhand items.`}
          </p>
        </div>

        {/* Desktop Sorting Controls & Mobile Filters Trigger */}
        <div className="flex items-center gap-2">
          
          {/* Sorting Selector */}
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-700">
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="bg-transparent outline-hidden cursor-pointer"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="scoreDesc">Condition: Best First</option>
            </select>
          </div>

          {/* Mobile Sheet Filter Toggle (Visible on Small Viewports only) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden h-9 rounded-lg border-zinc-200 text-zinc-700 flex gap-1.5 font-bold"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-white p-6 overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-lg font-black tracking-tight text-zinc-900">
                  Filter Catalog
                </SheetTitle>
              </SheetHeader>
              <ProductFilters
                filters={filters}
                onChange={setFilters}
                onClear={handleClearFilters}
              />
            </SheetContent>
          </Sheet>

        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Column: Desktop Sticky Sidebar Filters */}
        <aside className="hidden md:block md:col-span-1 sticky top-24 self-start h-[calc(100vh-140px)] overflow-y-auto pr-4 no-scrollbar">
          <h2 className="text-base font-black tracking-tight text-zinc-800 mb-5">
            Refine Catalogue
          </h2>
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
          />
        </aside>

        {/* Right Column: Dynamic Products Staggered Grid */}
        <main className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </main>

      </div>
    </div>
  );
}

// Statically generated pages must wrap client hooks (like useSearchParams) in Suspense bounds
export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-xs font-bold text-zinc-400">
            Loading Pre-loved Catalogue...
          </div>
        }>
          <CatalogueContent />
        </Suspense>
      </main>
      <footer className="border-t border-zinc-150 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} SecondHand. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
