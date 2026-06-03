"use client";

import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { formatNaira, getConditionStyles } from "@/lib/utils";

interface CartDrawerContentProps {
  onClose: () => void;
}

export default function CartDrawerContent({ onClose }: CartDrawerContentProps) {
  // Query our global Zustand store states and controls
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();

  // Empty state rendering
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4 shadow-2xs">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-zinc-800 text-base">Your bag is empty</h3>
        <p className="text-xs text-zinc-400 max-w-xs mt-1.5 leading-relaxed">
          Looks like you haven&apos;t added any pre-loved items to your shopping bag yet.
        </p>
        <Button 
          onClick={onClose} 
          className="mt-6 rounded-full h-10 px-6 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Scrollable list of cart items */}
      <div className="flex-1 overflow-y-auto py-4 pr-1 no-scrollbar flex flex-col gap-4">
        {items.map((item) => {
          const conditionStyle = getConditionStyles(item.condition);
          return (
            <div 
              key={item.id} 
              className="flex gap-3.5 p-3 rounded-xl border border-zinc-150 bg-zinc-50/30 shadow-2xs transition-all"
            >
              
              {/* Product Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg border border-zinc-200 overflow-hidden bg-zinc-50 shrink-0">
                <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
              </div>

              {/* Product details and actions */}
              <div className="flex-1 flex flex-col min-w-0">
                
                {/* Title and delete trigger */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-xs text-zinc-800 truncate leading-snug">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                    title="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Sizing & Condition Badge */}
                <div className="flex items-center gap-2 mt-1 mb-2">
                  {item.size && (
                    <span className="text-[9px] font-bold text-zinc-500 uppercase bg-zinc-100 border border-zinc-200 px-1 rounded">
                      Size: {item.size}
                    </span>
                  )}
                  <Badge variant="outline" className={`text-[8px] font-extrabold uppercase py-0 px-1.5 ${conditionStyle.badge}`}>
                    {conditionStyle.label}
                  </Badge>
                </div>

                {/* Arithmetic controls & item price display */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                  
                  {/* Quantity add/subtract button controls */}
                  <div className="flex items-center gap-1.5 border border-zinc-250 bg-white rounded-md p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-zinc-950 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-bold text-zinc-800 px-1 select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-zinc-950 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Pricing summaries (quantity * unit price) */}
                  <span className="text-xs font-black text-zinc-950">
                    {formatNaira(item.price * item.quantity)}
                  </span>

                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Persistent Bottom Checkout Summary Box */}
      <div className="border-t border-zinc-200 pt-5 mt-auto flex flex-col gap-4 bg-white">
        
        {/* Invoking Naira formatted summaries */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>Subtotal</span>
            <span className="text-zinc-800 font-extrabold">{formatNaira(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>Delivery Fees</span>
            <span className="text-emerald-600 font-extrabold uppercase text-[10px]">Discussed on Chat</span>
          </div>
          
          <Separator className="my-1.5 bg-zinc-150" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-zinc-900">Total Balance</span>
            <span className="text-base font-black text-zinc-950">{formatNaira(subtotal)}</span>
          </div>
        </div>

        {/* Shipping Form redirect buttons */}
        <Link href="/checkout" onClick={onClose} className="w-full">
          <Button className="w-full h-11 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs gap-1.5 shadow-sm uppercase tracking-wide">
            Checkout Details
          </Button>
        </Link>
        
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-800 text-[10px] font-bold uppercase tracking-wider text-center"
        >
          Keep browsing items
        </button>

      </div>

    </div>
  );
}
