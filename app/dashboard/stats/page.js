"use client";

import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { myContext } from "@/app/context/context";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function StatsPage() {
  const { userCreatedAccounts, isLoadedUserCreatedAccounts, isLoadedUser } = useContext(myContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!isLoadedUser || !userCreatedAccounts) return;

    // 🧮 Stats Calculation from userCreatedAccounts
    const totalAccounts = userCreatedAccounts.length;
    const soldAccounts = userCreatedAccounts.filter(a => a.status === "sold").length;
    const pendingAccounts = userCreatedAccounts.filter(a => a.status === "pending").length;
    const totalRevenue = userCreatedAccounts
      .filter(a => a.status === "sold")
      .reduce((sum, a) => sum + Number(a.price || 0), 0);



    const monthlySalesMap = {};

    userCreatedAccounts.filter(a => a.status === "sold")
    .forEach(account => {
      const date = new Date(account.updatedAt);
      const month = date.getMonth(); // 0 for Jan, 1 for Feb ...
      monthlySalesMap[month] = (monthlySalesMap[month] || 0) + 1;
    });
    const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlySales = monthsNames.map((name, index) => ({
      month: name,
      sales: monthlySalesMap[index] || 0,
    }));

   

    setStats({
      totalAccounts,
      soldAccounts,
      pendingAccounts,
      totalRevenue,
      monthlySales,
    });

  }, [isLoadedUser, userCreatedAccounts]);


  
  if (!isLoadedUser || !stats || !isLoadedUserCreatedAccounts) {
    return <LoadingSpinner size="xl" showText={true} text="Loading stats..." />;
  }


  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--color-brand-yellow)]">
          Dashboard Analytics
        </h1>

        {/* 🔹 Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Accounts" value={stats.totalAccounts} />
          <StatCard label="Sold Accounts" value={stats.soldAccounts} />
          <StatCard label="Pending Accounts" value={stats.pendingAccounts} />
          <StatCard
            label="Total Revenue"
            value={`PKR ${stats.totalRevenue.toLocaleString()}`}
          />
        </div>

        {/* 🔹 Chart */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={stats.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
                <Bar dataKey="sales" fill="var(--color-brand-yellow)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🔹 Small reusable Stat Card
function StatCard({ label, value }) {
  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      <h3 className="text-2xl font-bold mt-2 text-[var(--color-brand-yellow)]">{value}</h3>
    </div>
  );
}
