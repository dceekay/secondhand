"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Send, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatNaira } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CartItem, OrderDetails } from "@/lib/types";

// Dynamic structure to group cart items by the seller's phone
interface GroupedOrder {
  sellerPhone: string;
  sellerName: string;
  items: CartItem[];
  subtotal: number;
}

export default function CheckoutContent() {
  const { items, clearCart } = useCartStore();

  // Form states to collect shipping address in Nigeria
  const [shippingDetails, setShippingDetails] = useState<OrderDetails>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    deliveryNotes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dispatchedSellers, setDispatchedSellers] = useState<string[]>([]);

  // If cart is empty, render a helpful placeholder redirect screen
  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 mx-auto mb-4">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900">Your shopping bag is empty</h1>
        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
          Add some quality pre-loved fashion, sneakers, or gadgets from the catalog before checking out.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button className="rounded-full h-10 px-6 bg-zinc-950 hover:bg-zinc-800 text-white font-bold gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  // Group cart items by seller phone number (so a separate WhatsApp chat is launched for each seller!)
  const groupedOrders: GroupedOrder[] = items.reduce((acc: GroupedOrder[], item: CartItem) => {
    // Attempt to locate an existing seller group in our accumulator array
    const existingGroup = acc.find((g) => g.sellerPhone === item.sellerPhone);

    if (existingGroup) {
      existingGroup.items.push(item);
      existingGroup.subtotal += item.price * item.quantity;
    } else {
      // Find the product's seller name from the cart item description (or fallback)
      acc.push({
        sellerPhone: item.sellerPhone,
        sellerName: item.sellerPhone === "2348031234567" ? "Damilola K." :
                    item.sellerPhone === "2348123456789" ? "Chioma A." :
                    item.sellerPhone === "2347065432109" ? "Tunde E." : "Nneka O.",
        items: [item],
        subtotal: item.price * item.quantity,
      });
    }
    return acc;
  }, []);

  const totalCartBalance = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Form input change handlers
  const handleInputChange = (field: keyof OrderDetails, val: string) => {
    setShippingDetails({ ...shippingDetails, [field]: val });
  };

  // Validates if the shipping form fields are properly filled
  const isFormValid = () => {
    return (
      shippingDetails.fullName.trim() !== "" &&
      shippingDetails.phone.trim() !== "" &&
      shippingDetails.address.trim() !== "" &&
      shippingDetails.city.trim() !== ""
    );
  };

  // Triggers the direct WhatsApp chat for a specific seller group
  const handleCheckoutSeller = (group: GroupedOrder) => {
    if (!isFormValid()) {
      toast.error("Please fill in all shipping details first!");
      return;
    }

    // Format item details as a clean, highly professional plaintext invoice list
    const itemDetailsText = group.items
      .map(
        (item) =>
          `• ${item.title} (Qty: ${item.quantity}${item.size ? `, Size: ${item.size}` : ""}) — *${formatNaira(item.price * item.quantity)}*`
      )
      .join("\n");

    // Construct invoice message details
    const textMessage = 
      `🇳🇬 *SECONDHAND MARKETPLACE ORDER INVOICE*\n\n` +
      `Hello *${group.sellerName}*,\n` +
      `I want to buy these pre-loved items you listed on SecondHand:\n\n` +
      `${itemDetailsText}\n\n` +
      `*ORDER SUBTOTAL*: ${formatNaira(group.subtotal)}\n` +
      `*(Delivery/shipping fees to be discussed on chat)*\n\n` +
      `👉 *DELIVERY DETAILS*:\n` +
      `• *Name*: ${shippingDetails.fullName}\n` +
      `• *Phone*: ${shippingDetails.phone}\n` +
      `• *Shipping Address*: ${shippingDetails.address}, ${shippingDetails.city}\n` +
      `${shippingDetails.deliveryNotes ? `• *Notes*: ${shippingDetails.deliveryNotes}\n` : ""}\n` +
      `Please confirm item availability and let me know your dynamic delivery shipping options! Thanks.`;

    // Encode to URL characters
    const encodedMessage = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/${group.sellerPhone}?text=${encodedMessage}`;

    // Mark seller order as dispatched
    setDispatchedSellers((prev) => [...prev, group.sellerPhone]);

    // Open WhatsApp in new browser tab
    window.open(waUrl, "_blank");

    toast.success(`Redirecting to WhatsApp chat with ${group.sellerName}!`, {
      description: "Send the pre-formatted invoice message to finalize payment.",
    });

    // If all sellers in the cart have been pinged, mark the whole checkout completed!
    if (dispatchedSellers.length + 1 === groupedOrders.length) {
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  // Checkout Success view screen
  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-2xs">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900">Checkout Dispatch Complete!</h1>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-sm mx-auto">
          WhatsApp order messages have been generated. Please follow up directly with the sellers in their chats to arrange delivery and offline payments (Naira bank transfer or cash).
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button
            onClick={() => {
              clearCart(); // Clean up state
              window.location.href = "/";
            }}
            className="w-full h-11 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs"
          >
            Clear Shopping Bag & Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bag
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 mb-8 pb-4 border-b border-zinc-100">
        Cart Checkout
      </h1>

      {/* Two-Column split checkout view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Shipping Form inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white">
            <h2 className="text-base font-bold text-zinc-900 mb-5">
              1. Delivery Shipping Information
            </h2>
            
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  required
                  value={shippingDetails.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-lg border border-zinc-250 bg-white outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Contact Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 08031234567"
                  required
                  value={shippingDetails.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-lg border border-zinc-250 bg-white outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House number, street name..."
                  required
                  value={shippingDetails.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-lg border border-zinc-250 bg-white outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  City / State <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ikeja, Lagos"
                  required
                  value={shippingDetails.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-lg border border-zinc-250 bg-white outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Delivery Notes / Instructions (Optional)
                </label>
                <textarea
                  placeholder="e.g. Call before coming, drop at gatehouse..."
                  value={shippingDetails.deliveryNotes}
                  onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                  className="w-full h-20 px-3.5 py-2.5 text-xs font-semibold rounded-lg border border-zinc-250 bg-white outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400 resize-none"
                />
              </div>

            </div>
          </div>

          {/* Guarantees panel */}
          <div className="p-4 rounded-xl border border-zinc-150 bg-zinc-50 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-600">
              <p className="font-bold text-zinc-800">SecondHand Circular Checkout Model</p>
              <p className="mt-1 leading-normal">
                Because items are sold by different pre-loved sellers, we partition checkout invoices per seller phone dynamically. No online credit card detail entries required!
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Split Orders summary list */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white">
            <h2 className="text-base font-bold text-zinc-900 mb-5">
              2. Review Split Orders ({groupedOrders.length})
            </h2>

            {/* Loop through cart grouped by seller phone numbers */}
            <div className="flex flex-col gap-6">
              {groupedOrders.map((group, idx) => {
                const isDispatched = dispatchedSellers.includes(group.sellerPhone);
                return (
                  <div 
                    key={group.sellerPhone} 
                    className={`p-4 rounded-xl border transition-all ${
                      isDispatched 
                        ? "bg-zinc-50/50 border-zinc-200 opacity-60" 
                        : "bg-white border-zinc-150"
                    }`}
                  >
                    
                    {/* Seller header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                        Order {idx + 1} of {groupedOrders.length}
                      </span>
                      <span className="text-xs font-bold text-zinc-800">
                        Seller: <span className="font-extrabold">{group.sellerName}</span>
                      </span>
                    </div>

                    {/* Grouped items review lists */}
                    <div className="flex flex-col gap-2.5 mb-4">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs gap-3">
                          <span className="text-zinc-600 font-semibold min-w-0 truncate">
                            {item.title} <span className="text-[10px] text-zinc-400">x{item.quantity}</span>
                          </span>
                          <span className="text-zinc-900 font-bold shrink-0">
                            {formatNaira(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator className="mb-3.5 bg-zinc-100" />

                    {/* Seller Subtotal */}
                    <div className="flex justify-between items-center text-xs font-bold text-zinc-800 mb-4">
                      <span>Order Subtotal</span>
                      <span className="font-extrabold">{formatNaira(group.subtotal)}</span>
                    </div>

                    {/* WhatsApp Checkout Button dynamically linked */}
                    {isDispatched ? (
                      <div className="w-full h-10 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-100">
                        <CheckCircle2 className="h-4 w-4" />
                        Invoice Chat Established
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleCheckoutSeller(group)}
                        disabled={!isFormValid()}
                        className="w-full h-10 rounded-lg text-white font-bold text-xs bg-zinc-950 hover:bg-zinc-800 flex gap-2 disabled:opacity-50"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send Order to {group.sellerName}
                      </Button>
                    )}

                  </div>
                );
              })}
            </div>

            <Separator className="my-6 bg-zinc-150" />

            {/* Total Balance reviews */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-black text-zinc-900 block">Total Shopping Balance</span>
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                  ({items.reduce((a, c) => a + c.quantity, 0)} items)
                </span>
              </div>
              <span className="text-xl font-black text-zinc-950">{formatNaira(totalCartBalance)}</span>
            </div>

            {/* Info warning */}
            {!isFormValid() && (
              <p className="mt-4 text-[10px] text-zinc-400 text-center leading-normal italic flex items-center gap-1 justify-center">
                <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                Fill delivery details in Step 1 to unlock the order buttons!
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
