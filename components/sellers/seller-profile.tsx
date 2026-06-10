"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";

import { Product, Seller } from "@/lib/types";
import ProductGrid from "@/components/products/product-grid";

interface SellerProfileProps {
  seller: Seller;
  products: Product[];
}

export default function SellerProfile({
  seller,
  products,
}: SellerProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">

        <div className="flex flex-col md:flex-row gap-6">

          <div className="shrink-0">
            {seller.avatarUrl ? (
              <Image
                src={seller.avatarUrl}
                alt={seller.name}
                width={96}
                height={96}
                className="rounded-full object-cover border border-zinc-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-zinc-200 flex items-center justify-center font-black text-3xl text-zinc-700">
                {seller.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-3xl font-black tracking-tight text-zinc-900">
                {seller.name}
              </h1>

              {seller.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Seller
                </span>
              )}

            </div>

            <div className="flex flex-wrap gap-5 mt-4 text-sm text-zinc-500">

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>{seller.rating} Rating</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{seller.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>{products.length} Active Listings</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{seller.joinedDate}</span>
              </div>

            </div>

            {seller.bio && (
              <p className="mt-5 text-sm text-zinc-600 max-w-2xl leading-relaxed">
                {seller.bio}
              </p>
            )}

          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
              Total Sales
            </p>

            <p className="text-4xl font-black text-zinc-950 mt-1">
              {seller.totalSales ?? 0}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-12">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">
              Listings by {seller.name}
            </h2>

            <p className="text-sm text-zinc-500">
              All active items currently available from this seller.
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-bold text-zinc-700 hover:text-zinc-950"
          >
            Browse All Products
          </Link>

        </div>

        <ProductGrid products={products} />

      </div>

    </div>
  );
}