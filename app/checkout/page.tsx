import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import CheckoutContent from "./checkout-content";

export const metadata: Metadata = {
  title: "Checkout — SecondHand Marketplace",
  description: "Secure your secondhand purchases in Nigeria directly via WhatsApp checkout.",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Interactive Checkout Grid */}
      <main className="flex-1 bg-white">
        <CheckoutContent />
      </main>

      {/* Basic Footer */}
      <footer className="border-t border-zinc-150 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} SecondHand. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
