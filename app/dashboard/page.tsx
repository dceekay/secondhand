"use client";

import Navbar from "@/components/layout/navbar";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-zinc-500 mb-8">
          Welcome back, {user?.name}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Orders
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Wishlist
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Cart Items
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}