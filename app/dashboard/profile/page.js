"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { myContext } from "@/app/context/context";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { user, isLoaded } = useContext(myContext);

  if (!isLoaded) {
    return <LoadingSpinner size="xl" showText={true} />;
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto border border-[var(--color-border)] rounded-2xl shadow-lg bg-[var(--color-bg)] p-8">
        {/* 🔹 Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[var(--color-brand-blue)] shadow-md">

            <Image
              src={user.image || "/images/avatar.png"}
              alt={user.name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />

          </div>

          <div>
            <h1 className="text-3xl font-bold text-[var(--color-brand-blue)] mb-2">
              {user.name}
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Seller ID: <span className="font-mono">{user.id}</span>
            </p>
            <p className="text-[var(--color-text-secondary)]">{user.email}</p>
          </div>
        </div>

        {/* 🔹 Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)]">
            <p className="text-sm text-[var(--color-text-secondary)]">Total Accounts</p>
            <p className="text-2xl font-semibold text-[var(--color-brand-blue)]">
              {user.totalAccounts || 0}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)]">
            <p className="text-sm text-[var(--color-text-secondary)]">Total Earnings</p>
            <p className="text-2xl font-semibold text-[var(--color-brand-blue)]">
              Rs. {user.totalEarnings || 0}
            </p>
          </div>
        </div>

        {/* 🔹 About / Bio */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-[var(--color-brand-blue)]">
            About Seller
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {user.bio || "No bio added yet. You can add your seller info in settings."}
          </p>
        </div>

        {/* 🔹 Joined Date */}
        <div className="mt-6 text-sm text-[var(--color-text-muted)]">
          Joined on{" "}
          {new Date(user.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </section>
  );
}
