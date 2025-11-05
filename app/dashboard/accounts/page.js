"use client";

import { useContext } from "react";
import Link from "next/link";
import { myContext } from "@/app/context/context";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function DashboardAccountsPage() {
  const {
    userCreatedAccounts,
    isLoadedUserCreatedAccounts
  } = useContext(myContext);
  


  if (!isLoadedUserCreatedAccounts) {
    return <LoadingSpinner size="xl" showText={true} text="Loading your accounts..." />;
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-brand-blue)]">Your Accounts</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">
              Manage all the accounts you’ve listed for sale.
            </p>
          </div>
          <Link
            href="/dashboard/accounts/new"
            className="bg-[var(--color-brand-yellow)] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[var(--color-brand-gold)] transition"
          >
            + Add New Account
          </Link>
        </header>

        {userCreatedAccounts.length === 0 ? (
          <div className="text-center text-[var(--color-text-secondary)] py-20">
            You haven’t listed any accounts yet.
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--color-border)] rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-[var(--color-bg-light)] border-b border-[var(--color-border)]">
                <tr className="text-left">
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Rank</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Created</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {userCreatedAccounts.map((acc) => (
                  <tr
                    key={acc._id}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-light)] transition"
                  >
                    <td className="py-3 px-4">{acc.title}</td>
                    <td className="py-3 px-4">{acc.rank}</td>
                    <td className="py-3 px-4 font-semibold text-[var(--color-brand-yellow)]">
                      Rs {acc.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${acc.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : acc.status === "sold"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {acc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(acc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/dashboard/accounts/${acc._id}`}
                        className="text-[var(--color-brand-blue)] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
