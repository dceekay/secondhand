"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartDrawerContent from "@/components/cart/cart-drawer";

export default function Navbar() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Avoid hydration mismatch for cart count (ensure SSR matches initial Client render)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to the custom 'open-cart-drawer' event dispatched from cards or mobile menu
  useEffect(() => {
    const handleOpenCartDrawer = () => {
      setIsCartOpen(true);
    };

    window.addEventListener("open-cart-drawer", handleOpenCartDrawer);
    return () => {
      window.removeEventListener("open-cart-drawer", handleOpenCartDrawer);
    };
  }, []);

  const cartCount = mounted
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/products?filter=categories" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-2xl font-black tracking-tighter text-zinc-900"
          >
            SecondHand
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-zinc-900 ${
                    isActive ? "text-zinc-900 font-bold" : "text-zinc-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search Button (Triggers catalog page) */}
          <Link href="/products?search=focus">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search catalog</span>
            </Button>
          </Link>

          {/* Shopping Cart Drawer (Using ui.shadcn.com Sheet) */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full w-9 h-9 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Open shopping cart</span>
              </Button>
            </SheetTrigger>
            
            {/* Slide-out cart drawer content */}
            <SheetContent 
              side="right" 
              className="w-full max-w-sm bg-white p-6 flex flex-col h-full border-l border-zinc-200"
            >
              <SheetHeader className="pb-4 border-b border-zinc-150 mb-4">
                <SheetTitle className="text-base font-black tracking-tight text-zinc-900 flex items-center gap-2">
                  <ShoppingBag className="h-4.5 w-4.5 text-zinc-800" />
                  Your Shopping Bag
                </SheetTitle>
              </SheetHeader>
              
              <CartDrawerContent onClose={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Action CTA: Sell Item (Desktop Only) */}
          <Link href="/products?sell=true" className="hidden md:block">
            <Button className="h-9 rounded-full px-4 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white gap-1.5 transition-all">
              <Plus className="h-3.5 w-3.5" />
              Sell Item
            </Button>
          </Link>

          {/* Mobile Hamburger Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full w-9 h-9 border border-zinc-200 hover:bg-zinc-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open mobile navigation</span>
          </Button>
        </div>
      </div>

      {/* Slide-out Mobile Menu overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={cartCount}
        onOpenCart={() => {
          setIsCartOpen(true);
        }}
      />
    </header>
  );
}
