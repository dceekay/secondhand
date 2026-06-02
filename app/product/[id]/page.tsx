import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import { getProductById, MOCK_PRODUCTS } from "@/app/data/products";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDetailsContent from "./product-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Dynamically generate metadata for search engine optimization (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Item Not Found — SecondHand",
    };
  }

  return {
    title: `${product.title} — SecondHand Marketplace`,
    description: product.description,
  };
}

// Next.js static path generation (pre-renders details pages for immediate loading speeds)
export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Await the dynamic URL parameters promise (Next.js 16 convention)
  const { id } = await params;
  const product = getProductById(id);

  // Error handling: if a user types an invalid product ID in the browser URL
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4">
            <Info className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900">Pre-loved item not found</h1>
          <p className="text-xs text-zinc-500 max-w-xs mt-1.5 leading-relaxed">
            The item you are searching for might have been sold or removed by the seller.
          </p>
          <Link href="/products" className="mt-6">
            <Button className="rounded-full h-10 px-6 bg-zinc-950 hover:bg-zinc-800 text-white font-bold gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Button>
          </Link>
        </main>
        <footer className="border-t border-zinc-150 py-6 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} SecondHand. All rights reserved.
        </footer>
      </div>
    );
  }

  // Fetch up to 3 related products in the same category (excluding current item)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === product.category.toLowerCase() && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Render Client-Side Interactive Details Component */}
      <main className="flex-1 bg-white">
        <ProductDetailsContent product={product} relatedProducts={relatedProducts} />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-150 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} SecondHand. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
