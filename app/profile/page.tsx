"use client";

import Navbar from "@/components/layout/navbar";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="rounded-xl border bg-white p-6">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-500">
                Name
              </p>

              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Email
              </p>

              <p className="font-semibold">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Role
              </p>

              <p className="font-semibold capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}