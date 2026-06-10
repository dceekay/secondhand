"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
} from "lucide-react";

import { Product } from "@/lib/types";
import { formatNaira, getConditionStyles } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import WishlistButton from "@/components/wishlist/wishlist-button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const conditionInfo = getConditionStyles(
    product.condition
  );

  const handleAddToCart = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

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
      `${product.title} added to cart`,
      {
        description: `Seller: ${product.seller.name}`,
      }
    );
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:shadow-lg">
      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100"
      >
        {/* Condition Badges */}
        <div className="pointer-events-none absolute top-3 left-3 z-20 flex flex-col gap-1">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${conditionInfo.badge}`}
          >
            {conditionInfo.label}
          </span>

          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/95 px-2 py-0.5 text-[9px] font-bold text-zinc-700">
            Score {product.conditionScore}/10
          </span>
        </div>

        {/* Brand Badge */}
        {product.brand && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex rounded-md bg-zinc-900/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
              {product.brand}
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Wishlist */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <WishlistButton product={product} />
          </div>

          {/* Add To Cart */}
          <Button
            size="icon"
            onClick={handleAddToCart}
            className="h-9 w-9 rounded-full bg-zinc-950 text-white shadow-md hover:bg-zinc-800"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category + Size */}
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          <span>{product.category}</span>

          {product.size && (
            <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-500">
              {product.size}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.id}`}
          className="mb-2 block"
        >
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-800 transition-colors hover:text-zinc-950">
            {product.title}
          </h3>
        </Link>

        {/* Seller Info */}
        <div className="mb-4 flex items-center gap-2 text-xs">
          <span className="text-zinc-500">
            By{" "}
            <Link
              href={`/sellers/${product.seller.id}`}
              className="font-semibold text-zinc-800 hover:text-zinc-950 hover:underline underline-offset-2"
            >
              {product.seller.name}
            </Link>
          </span>

          <div className="ml-auto flex items-center gap-2">
            {product.seller.verified && (
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            )}

            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-[10px] font-bold">
                {product.seller.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-100 pt-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Price
            </p>

            <p className="text-base font-extrabold text-zinc-950">
              {formatNaira(product.price)}
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="h-8 rounded-full bg-zinc-900 px-4 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-zinc-800"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}