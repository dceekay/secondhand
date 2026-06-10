"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { toast } from "sonner";

interface WishlistButtonProps {
  product: Product;
}

export default function WishlistButton({
  product,
}: WishlistButtonProps) {
  const handleWishlist = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    toast.success("Added to wishlist", {
      description: product.title,
    });
  };

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={handleWishlist}
      className="h-9 w-9 rounded-full bg-white text-zinc-900 shadow-md hover:bg-zinc-100"
    >
      <Heart className="h-4 w-4" />
    </Button>
  );
}