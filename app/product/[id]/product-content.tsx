"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Star, MessageSquare, Shield, Truck, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { formatNaira, getConditionStyles } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import ProductCard from "@/components/products/product-card";

interface ProductContentProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsContent({ product, relatedProducts }: ProductContentProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Obtain visual styling classes matching the item's condition rating
  const conditionInfo = getConditionStyles(product.condition);

  // Handles adding the item to the persisted Zustand cart
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.size,
      condition: product.condition,
      sellerPhone: product.seller.phone,
    });

    toast.success(`${product.title} added to bag!`, {
      description: `Seller: ${product.seller.name}`,
    });
  };

  // Dynamically launches a direct WhatsApp inquiry with the item's specific seller
  const handleWhatsAppInquiry = () => {
    const textMessage = `Hi ${product.seller.name}, I am highly interested in purchasing your pre-loved item listed on SecondHand:\n\n*Product*: ${product.title}\n*Price*: ${formatNaira(product.price)}\n*Size*: ${product.size || "N/A"}\n\nIs this item still available for pick-up or delivery?`;
    
    const encodedMessage = encodeURIComponent(textMessage);
    // Dynamic seller phone linking (e.g. wa.me/234XXXXXXXXX)
    const waUrl = `https://wa.me/${product.seller.phone}?text=${encodedMessage}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back button link */}
      <div className="mb-6">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        
        {/* Left Column: Image Gallery (Large View + Clickable Thumbnails) */}
        <div className="flex flex-col gap-3">
          {/* Large main display image */}
          <div className="relative aspect-square w-full rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50 shadow-2xs">
            <img
              src={product.images[activeImgIdx]}
              alt={product.title}
              className="object-cover w-full h-full transition-all duration-300"
            />
            
            {/* Condition badge floating overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${conditionInfo.badge} shadow-xs`}>
                {conditionInfo.label}
              </span>
            </div>
          </div>

          {/* Row of clickable thumbnail previews (Only visible if item has multiple images) */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-20 aspect-square rounded-lg overflow-hidden border bg-zinc-50 transition-all ${
                    activeImgIdx === idx 
                      ? "border-zinc-950 ring-1 ring-zinc-950 scale-95" 
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Product Info & Core Checkout CTAs */}
        <div className="flex flex-col">
          
          {/* Brand & Categories Tags */}
          <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
            <span>{product.category}</span>
            {product.brand && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="text-zinc-800 font-extrabold">{product.brand}</span>
              </>
            )}
          </div>

          {/* Main Title Heading */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
            {product.title}
          </h1>

          {/* Condition Score Metrics */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50">
              <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Condition Rating: {product.conditionScore}/10</span>
            </div>
            
            {product.size && (
              <div className="px-3 py-1 rounded-lg border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50">
                Size: <span className="font-extrabold">{product.size}</span>
              </div>
            )}
          </div>

          {/* Main Price Box */}
          <div className="p-4 rounded-xl border border-zinc-150 bg-zinc-50/50 mb-6">
            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-0.5">Listed Price</p>
            <p className="text-2xl sm:text-3xl font-black text-zinc-950">
              {formatNaira(product.price)}
            </p>
          </div>

          {/* Description Block */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Item Description</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          {/* Checkout / Bag Interaction Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-100 mb-8">
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-full font-bold bg-zinc-950 hover:bg-zinc-800 text-white flex gap-2 shadow-xs"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              Add to Shopping Bag
            </Button>
            
            <Button
              onClick={handleWhatsAppInquiry}
              variant="outline"
              className="flex-1 h-12 rounded-full font-bold border-zinc-300 hover:bg-zinc-55 text-zinc-800 flex gap-2"
            >
              <MessageSquare className="h-4.5 w-4.5 text-emerald-600 fill-emerald-600/10" />
              Instant WhatsApp Chat
            </Button>
          </div>

          {/* Local Checkout Warranties Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-zinc-150 mb-8 bg-white">
            <div className="flex items-start gap-2.5 text-xs text-zinc-500">
              <Shield className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-zinc-800">Circular Thrift Guarantee</p>
                <p className="mt-0.5 leading-normal">Full image honesty and condition scoring metrics verified before lists.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-zinc-500">
              <Truck className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-zinc-800">Dynamic Deliveries</p>
                <p className="mt-0.5 leading-normal">Discuss pickup, escrow, or dispatch shipping terms directly with each owner.</p>
              </div>
            </div>
          </div>

          {/* Seller Metadata Profile Card */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center gap-4">
            {product.seller.avatarUrl ? (
              <img
                src={product.seller.avatarUrl}
                alt=""
                className="w-12 h-12 rounded-full object-cover border border-zinc-250 bg-zinc-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border border-zinc-250 bg-zinc-200 flex items-center justify-center font-bold text-zinc-500">
                {product.seller.name[0]}
              </div>
            )}
            
            <div>
              <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Item Listed By</p>
              <p className="text-sm font-extrabold text-zinc-800 mt-0.5">{product.seller.name}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Joined: {product.seller.joinedDate}</p>
            </div>

            <div className="ml-auto flex flex-col items-end">
              <div className="flex items-center text-amber-500 gap-0.5">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="font-black text-xs">{product.seller.rating}</span>
              </div>
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">TRUSTED SELLER</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Catalog Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-zinc-100">
          <h2 className="text-xl font-black tracking-tight text-zinc-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
