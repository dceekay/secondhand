"use client";

import Link from "next/link";
import {
  Eye,
  ShoppingBag,
  Star,
  ShieldCheck,
} from "lucide-react";

import { Product } from "@/lib/types";
import { formatNaira, getConditionStyles } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const conditionInfo = getConditionStyles(product.condition);

  const handleAddToCart = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.size,
      condition: product.condition,
      sellerId: product.seller.id,
    });

    toast.success(
      `${product.title} added to cart!`,
      {
        description: `Seller: ${product.seller.name}`,
      }
    );
  };

  return (
    <div className="group relative flex flex-col w-full h-full overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-2xs hover:shadow-md transition-all duration-300">

      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="relative block w-full aspect-square overflow-hidden bg-zinc-50"
      >

        {/* Condition Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${conditionInfo.badge}`}
          >
            {conditionInfo.label}
          </span>

          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/95 border border-zinc-200 text-zinc-700">
            Score: {product.conditionScore}/10
          </span>

        </div>

        {/* Brand */}
        {product.brand && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-zinc-900/80 text-white backdrop-blur-xs">
              {product.brand}
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10">

          <Button
            size="icon"
            variant="secondary"
            className="w-9 h-9 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 shadow-md scale-95 group-hover:scale-100 transition-transform duration-200"
            asChild
          >
            <Link href={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="icon"
            className="w-9 h-9 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 shadow-md scale-95 group-hover:scale-100 transition-transform duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>

        </div>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">

        {/* Category + Size */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">

          <span>{product.category}</span>

          {product.size && (
            <span className="border border-zinc-200 px-1 py-0.5 rounded text-[9px] text-zinc-500 font-semibold">
              {product.size}
            </span>
          )}

        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.id}`}
          className="block mb-1"
        >
          <h3 className="font-bold text-sm text-zinc-800 hover:text-zinc-950 line-clamp-1 leading-snug transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Seller Info */}
        <div className="flex items-center gap-1 mb-3 text-xs">

          <span className="text-zinc-500 font-medium">
            By{" "}
            <Link
              href={`/sellers/${product.seller.id}`}
              className="text-zinc-800 font-semibold hover:text-zinc-950 hover:underline underline-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              {product.seller.name}
            </Link>
          </span>

          <div className="flex items-center gap-2 ml-auto">

            {product.seller.verified && (
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            )}

            <div className="flex items-center text-amber-500 gap-0.5">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="font-bold text-[10px]">
                {product.seller.rating}
              </span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">

          <div>
            <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">
              Price
            </p>

            <p className="text-sm sm:text-base font-extrabold text-zinc-950">
              {formatNaira(product.price)}
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="rounded-full h-7 px-3 text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800"
          >
            Add
          </Button>

        </div>

      </div>

    </div>
  );
}