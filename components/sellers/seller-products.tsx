import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import SellerProfile from "@/components/sellers/seller-profile";
import { MOCK_PRODUCTS } from "@/app/data/products";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const sellerIds = Array.from(
    new Set(MOCK_PRODUCTS.map((p) => p.seller.id))
  );

  return sellerIds.map((id) => ({
    id,
  }));
}

export default async function SellerPage({
  params,
}: PageProps) {
  const { id } = await params;

  const sellerProducts = MOCK_PRODUCTS.filter(
    (product) => product.seller.id === id
  );

  if (!sellerProducts.length) {
    notFound();
  }

  const seller = sellerProducts[0].seller;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <SellerProfile
          seller={seller}
          products={sellerProducts}
        />
      </main>
    </div>
  );
}