import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductCondition } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a numeric price into Naira format: ₦XX,XXX.XX (or integer if decimal is empty)
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Returns Tailwind class combinations for different product conditions
 */
export function getConditionStyles(condition: ProductCondition) {
  switch (condition) {
    case "NEW_WITH_TAGS":
      return {
        label: "Brand New",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
      };
    case "LIKE_NEW":
      return {
        label: "Like New",
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50",
      };
    case "GENTLY_USED":
      return {
        label: "Gently Used",
        badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
      };
    case "FAIR":
      return {
        label: "Fair",
        badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:border-zinc-700",
      };
    default:
      return {
        label: condition,
        badge: "bg-zinc-100 text-zinc-700 border-zinc-200",
      };
  }
}
