"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/keystatic-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      // Full reload so the middleware sees the new cookie
      window.location.href = "/keystatic";
    } else {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#0f1117] px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <Image src="/logo-light.png" alt="Kasaala" width={160} height={40}
            className="block dark:hidden h-10 w-auto" />
          <Image src="/logo-dark.png" alt="Kasaala" width={160} height={40}
            className="hidden dark:block h-10 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium
              text-neutral-700 dark:text-neutral-300 mb-1">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              required
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl border
                         border-neutral-300 dark:border-neutral-700
                         bg-white dark:bg-neutral-900
                         text-neutral-900 dark:text-neutral-100
                         focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {error && (
              <p className="mt-1.5 text-sm text-red-500">Incorrect password.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700
                       text-white font-semibold transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
