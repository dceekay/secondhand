"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";

export default function LoginForm() {
  const router = useRouter();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      login(
        data.user,
        data.token
      );

      toast.success(
        "Welcome back"
      );

      router.push("/");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="w-full h-11 border rounded-lg px-3"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
        className="w-full h-11 border rounded-lg px-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-black text-white rounded-lg"
      >
        {loading
          ? "Signing In..."
          : "Login"}
      </button>
    </form>
  );
}