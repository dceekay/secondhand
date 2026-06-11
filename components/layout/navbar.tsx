"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
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

  const cartItems = useCartStore(
    (state) => state.items
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const [mounted, setMounted] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpenCartDrawer = () => {
      setIsCartOpen(true);
    };

    window.addEventListener(
      "open-cart-drawer",
      handleOpenCartDrawer
    );

    return () => {
      window.removeEventListener(
        "open-cart-drawer",
        handleOpenCartDrawer
      );
    };
  }, []);

  const cartCount = mounted
    ? cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      )
    : 0;

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Categories",
      href: "/products?filter=categories",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-zinc-900"
          >
            SecondHand
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <Link href="/products">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9"
            >
              <Search className="h-4 w-4" />
            </Button>
          </Link>

          {/* Cart Drawer */}
          <Sheet
            open={isCartOpen}
            onOpenChange={setIsCartOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full w-9 h-9"
              >
                <ShoppingBag className="h-4 w-4" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}

                <span className="sr-only">
                  Open Cart
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full max-w-sm bg-white p-6 flex flex-col"
            >
              <SheetHeader className="pb-4 border-b">
                <SheetTitle className="flex items-center gap-2 text-base font-black">
                  <ShoppingBag className="h-4 w-4" />
                  Your Shopping Bag
                </SheetTitle>
              </SheetHeader>

              <CartDrawerContent
                onClose={() =>
                  setIsCartOpen(false)
                }
              />
            </SheetContent>
          </Sheet>

          {/* Authentication Area */}
          {mounted && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="rounded-full"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>

                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">

                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="rounded-full"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/register">
                    <Button className="rounded-full bg-zinc-900 hover:bg-zinc-800">
                      Register
                    </Button>
                  </Link>

                </div>
              )}
            </>
          )}

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full w-9 h-9 border border-zinc-200"
            onClick={() =>
              setIsMobileMenuOpen(true)
            }
          >
            <Menu className="h-4 w-4" />
          </Button>

        </div>
      </div>

      <MobileMenu
  isOpen={isMobileMenuOpen}
  onClose={() => setIsMobileMenuOpen(false)}
  cartCount={cartCount}
  user={user}
  onLogout={logout}
  onOpenCart={() => {
    setIsCartOpen(true);
  }}
/>
    </header>
  );
}