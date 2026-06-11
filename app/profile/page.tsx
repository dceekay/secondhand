"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  if (!mounted) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-zinc-500">
                Name
              </p>
              <p className="font-semibold text-zinc-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Email
              </p>
              <p className="font-semibold text-zinc-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Role
              </p>
              <p className="font-semibold text-zinc-900 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}