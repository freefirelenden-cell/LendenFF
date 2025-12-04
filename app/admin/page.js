"use client";

import { useContext, useEffect, useState } from "react";
import { getAllSellers, getAccounts, updateAccount, updateUser } from "@/lib/apiClient";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { myContext } from "../context/context";
import { redirect } from "next/navigation";

export default function AdminPanel() {
  const { user, isLoadedUser } = useContext(myContext)
  const [sellers, setSellers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const sellerList = await getAllSellers();
        setSellers(sellerList.users);
        const accountList = await getAccounts();
        setAccounts(accountList.accounts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleSellerTrust = async (sellerId, currentStatus) => {
    setUpdating(true);
    try {
      await updateUser(sellerId, { isTrusted: !currentStatus });
      setSellers(prev => prev.map(s => s._id === sellerId ? { ...s, isTrusted: !currentStatus } : s));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const toggleAccountFeatured = async (accountId, currentStatus) => {
    setUpdating(true);
    try {
      await updateAccount(accountId, { isFeatured: !currentStatus });
      setAccounts(prev => prev.map(a => a._id === accountId ? { ...a, isFeatured: !currentStatus } : a));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || isLoadedUser) return <LoadingSpinner size="xl" showText text="Loading Admin Panel..." />;
  if(user?.role != "admin") {
    redirect('/')
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-brand-yellow)]">Admin Panel</h1>

      {/* Sellers Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Sellers</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Trusted</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(s => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.isTrusted ? "✅" : "❌"}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={updating}
                    onClick={() => toggleSellerTrust(s.authId, s.isTrusted)}
                  >
                    {s.isTrusted ? "Remove Blue Tick" : "Give Blue Tick"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Accounts Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Featured</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="border p-2">{a.title}</td>
                <td className="border p-2">Rs. {a.price}</td>
                <td className="border p-2">{a.isFeatured ? "⭐" : "—"}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
                    disabled={updating}
                    onClick={() => toggleAccountFeatured(a._id, a.isFeatured)}
                  >
                    {a.isFeatured ? "Remove Featured" : "Make Featured"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
