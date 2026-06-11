"use client";

import Link from "next/link";
import {
  X,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  onOpenCart: () => void;

  user?: {
    name: string;
  } | null;

  onLogout?: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  cartCount,
  onOpenCart,
  user,
  onLogout,
}: MobileMenuProps) {
  const menuLinks = [
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full max-w-xs bg-white border-l border-zinc-200 shadow-2xl p-6 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
              <span className="text-xl font-bold tracking-tight text-zinc-900">
                Menu
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 border border-zinc-200"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-5 py-8">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: idx * 0.05,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between text-lg font-medium text-zinc-800 hover:text-zinc-950 group"
                  >
                    <span>{link.name}</span>

                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-zinc-500" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto flex flex-col gap-4 border-t border-zinc-100 pt-6">

              {/* Cart */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-between h-12 rounded-full border-zinc-300"
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
              >
                <span className="flex items-center gap-2 font-medium">
                  <ShoppingBag className="h-5 w-5 text-zinc-600" />
                  My Cart
                </span>

                {cartCount > 0 ? (
                  <span className="bg-zinc-950 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {cartCount}
                  </span>
                ) : (
                  <span className="text-sm text-zinc-400">
                    Empty
                  </span>
                )}
              </Button>

              {/* Auth Buttons */}
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-full"
                    >
                      Profile
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="w-full h-12 rounded-full"
                    onClick={() => {
                      onLogout?.();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-full"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link
                    href="/register"
                    onClick={onClose}
                    className="w-full"
                  >
                    <Button className="w-full h-12 rounded-full bg-zinc-950 hover:bg-zinc-800">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}