"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface WishlistStore {
  items: Product[];

  addItem: (product: Product) => void;

  removeItem: (productId: string) => void;

  isWishlisted: (productId: string) => boolean;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.some(
          (item) => item.id === product.id
        );

        if (exists) return;

        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        })),

      isWishlisted: (productId) =>
        get().items.some(
          (item) => item.id === productId
        ),

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "secondhand-wishlist-storage",
    }
  )
);