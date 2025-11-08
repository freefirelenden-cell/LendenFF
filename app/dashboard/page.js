"use client";

import { useContext } from "react";
import { BarChart2, Wallet, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { myContext } from "../context/context";
import LoadingSpinner from "../components/ui/LoadingSpinner";



export default function DashboardPage() {
  const { userCreatedAccounts, isLoadedUserCreatedAccounts, user } = useContext(myContext)





  if (!isLoadedUserCreatedAccounts) {
    return <LoadingSpinner size="xl" showText={true} text="Loading Dashboard..." />;
  }

  // 🧮 Summary Stats
  const total = userCreatedAccounts.length;
  const pending = userCreatedAccounts.filter((a) => a.status === "pending").length;
  const approved = userCreatedAccounts.filter((a) => a.status === "sold").length;
  const totalEarnings = userCreatedAccounts
    .filter((a) => a.status === "sold")
    .reduce((sum, a) => sum + Number(a.price || 0), 0);


  

  return (
    <section className="text-[var(--color-text)] space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)]">
          Welcome Back, {user?.firstName || "Seller"} 👋
        </h1>
        <Link
          href="/dashboard/accounts/new"
          className="bg-[#6c47ff] text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          + Add Account
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] flex flex-col items-center text-center">
          <BarChart2 className="text-[#6c47ff] mb-2" size={30} />
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-[var(--color-text-secondary)] text-sm">Total Accounts</p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] flex flex-col items-center text-center">
          <Clock className="text-yellow-400 mb-2" size={30} />
          <p className="text-3xl font-bold">{pending}</p>
          <p className="text-[var(--color-text-secondary)] text-sm">Pending Approvals</p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] flex flex-col items-center text-center">
          <CheckCircle2 className="text-green-400 mb-2" size={30} />
          <p className="text-3xl font-bold">{approved}</p>
          <p className="text-[var(--color-text-secondary)] text-sm">Approved Accounts</p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)] flex flex-col items-center text-center">
          <Wallet className="text-[#6c47ff] mb-2" size={30} />
          <p className="text-3xl font-bold">Rs {totalEarnings}</p>
          <p className="text-[var(--color-text-secondary)] text-sm">Total Earnings</p>
        </div>
      </div>

      {/* Account List */}
      <div className="bg-[var(--color-bg-secondary)] p-6 rounded-2xl border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-[var(--color-brand-yellow)] mb-4">
          Recent Accounts
        </h2>

        {userCreatedAccounts?.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-center py-8">
            You haven't added any accounts yet.
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-secondary)] text-left">
                <th className="py-2">Title</th>
                <th className="py-2">Rank</th>
                <th className="py-2">Price</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {userCreatedAccounts?.slice(0, 5).map((a) => (
                <tr
                  key={a._id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-hover)] transition"
                >
                  <td className="py-2 font-medium">
                    <Link
                      href={`/accounts/${a._id}`}
                      className="hover:text-[#6c47ff] transition"
                    >
                      {a.title}
                    </Link>
                  </td>
                  <td className="py-2">{a.rank}</td>
                  <td className="py-2">Rs {a.price}</td>
                  <td
                    className={`py-2 capitalize ${a.status === "pending"
                      ? "text-yellow-400"
                      : a.status === "approved"
                        ? "text-green-400"
                        : "text-[var(--color-text-secondary)]"
                      }`}
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
