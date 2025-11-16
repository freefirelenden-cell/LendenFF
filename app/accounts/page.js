"use client"
import { useContext } from "react";
import AccountCard from "../components/AccountCard";
import { myContext } from "../context/context.js";
import LoadingSpinner from "../components/ui/LoadingSpinner";



export default function AccountsPage() {
  const { accounts, isLoadedAccounts } = useContext(myContext);

  if (!isLoadedAccounts) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen py-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[var(--color-brand-yellow)] mb-10">
          Verified Free Fire Accounts
        </h1>

        <p className="text-center text-[var(--color-link)] max-w-2xl mx-auto mb-12">
          Browse through trusted, Gmail-verified Free Fire accounts.
          Instant delivery and secure transfer — built for gamers who value safety and quality.
        </p>

        {/* 🧱 Grid of Account Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {accounts?.map((account) => (
            <AccountCard key={account._id} account={account} />
          ))}
        </div>
      </div>
    </section>
  );
}
