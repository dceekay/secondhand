"use client";

import Link from "next/link";
import { Eye, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatNaira, getConditionStyles } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Grab the cart addition method from our global state store
  const addItem = useCartStore((state) => state.addItem);
  
  // Obtain border and text color stylings matching the item's condition rating
  const conditionInfo = getConditionStyles(product.condition);

  // Handles adding an item to the shopping cart drawer safely
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents clicking the Add button from navigating to the details page
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.size,
      condition: product.condition,
      sellerPhone: product.seller.phone,
    });
    
    // Trigger a crisp light notification
    toast.success(`${product.title} added to bag!`, {
      description: `Seller: ${product.seller.name}`,
    });
  };

  return (
    <div className="group relative flex flex-col w-full h-full overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-2xs hover:shadow-md transition-all duration-300">
      
      {/* Product Image Section */}
      <Link href={`/product/${product.id}`} className="relative block w-full aspect-square overflow-hidden bg-zinc-50">
        
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          {/* Condition Tag */}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${conditionInfo.badge}`}>
            {conditionInfo.label}
          </span>
          
          {/* Condition Score Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/95 border border-zinc-200 text-zinc-700">
            Score: {product.conditionScore}/10
          </span>
        </div>

        {/* Brand Tag (Top-Right) */}
        {product.brand && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-zinc-900/80 text-white backdrop-blur-xs">
              {product.brand}
            </span>
          </div>
        )}

        {/* Action Overlay on Hover */}
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

        {/* Actual Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Info Section */}
      <div className="flex flex-col flex-1 p-4">
        
        {/* Category & Size */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
          <span>{product.category}</span>
          {product.size && (
            <span className="border border-zinc-200 px-1 py-0.2 rounded text-[9px] text-zinc-500 font-semibold">
              {product.size}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="block mb-1">
          <h3 className="font-bold text-sm text-zinc-800 hover:text-zinc-950 line-clamp-1 leading-snug transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Seller Info */}
        <div className="flex items-center gap-1 mb-3 text-xs">
          <span className="text-zinc-500 font-medium">
            By <span className="text-zinc-800 font-semibold">{product.seller.name}</span>
          </span>
          <div className="flex items-center text-amber-500 gap-0.5 ml-auto">
            <Star className="h-3 w-3 fill-amber-500" />
            <span className="font-bold text-[10px]">{product.seller.rating}</span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Price</p>
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
