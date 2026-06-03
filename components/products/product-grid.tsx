"use client";

import { Product } from "@/lib/types";
import ProductCard from "./product-card";
import { motion, Variants } from "framer-motion";
import { Info } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

// Framer motion variants to stagger product card entrances sequentially
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Adds a minor stagger delay of 50ms between items
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProductGrid({ products }: ProductGridProps) {
  // Empty state handling if no search or filter query matches the products array
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-zinc-200 rounded-2xl text-center bg-zinc-50 transition-all">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 mb-3">
          <Info className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold text-zinc-800">No items found</h3>
        <p className="text-xs text-zinc-500 max-w-xs mt-1 leading-relaxed">
          We couldn&apos;t find any pre-loved products matching your active filters. Try clearing some selections.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
