'use client'
import Link from "next/link";
import AccountCard from "./AccountCard";
import { useContext } from "react";
import { myContext } from "../context/context";
import LoadingSpinner from "./ui/LoadingSpinner";


export default function HomeSection() {
  const { latestAccounts, isLoadedLatestAccounts } = useContext(myContext)

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 transition-colors duration-300">
      {/* 🦸 Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[var(--color-brand-yellow)] mb-4">
          Find Your Perfect Free Fire Account 🔥
        </h1>
        <p className="text-[var(--color-link)] max-w-2xl mx-auto mb-6">
          Verified, safe, and instant — explore top Free Fire accounts trusted by
          1000+ gamers worldwide.
        </p>
        <Link
          href="/accounts"
          className="inline-block bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] hover:scale-105 transition-transform"
        >
          Browse All Accounts
        </Link>
      </div>

      {/* 🎮 Featured Accounts */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[var(--color-brand-yellow)] mb-10 text-center">
          Featured Accounts
        </h2>


        {isLoadedLatestAccounts ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestAccounts?.map((account) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="xl" />
          </div>
        )}

        {/* 🔘 Explore More Button */}
        <div className="text-center mt-12">
          <Link
            href="/accounts"
            className="inline-block bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] hover:scale-105 transition-transform"
          >
            Explore More Accounts →
          </Link>
        </div>
      </div>
    </section>
  );
}
