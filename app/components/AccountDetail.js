"use client"
import ImageSlider from "@/app/components/Slider";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import PaymentOptions from "@/app/components/PaymentOptions";
import { getAccountById, getUserById } from "@/lib/apiClient";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function AccountDetail({ params }) {
  const [account, setAccount] = useState({})
  const [seller, setSeller] = useState({})
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const { id } = use(params)

  useEffect(() => {
    async function loadData() {
      try {
        const acc = await getAccountById(id);
        const { user } = await getUserById(acc.createdBy)
        setAccount(acc);
        setSeller(user);
      } catch (error) {
        console.error("Error loading account:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className={`min-h-screen flex items-center justify-center text-[var(--color-text-secondary)] bg-[var(--color-bg)]`}>
      <LoadingSpinner size="xl" showText={true} text="Loading account data..." />
    </div>
  }

  if (!account) {
    return <div className={`min-h-screen flex items-center justify-center text-[var(--color-text-secondary)] bg-[var(--color-bg)]`}>
      ⚠️ Account not found.
    </div>
  }

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/accounts"
          className="inline-block mb-6 text-[var(--color-brand-blue)] hover:underline"
        >
          ← Back to Listings
        </Link>

        <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl shadow-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative w-full h-72 sm:h-96">
            <ImageSlider images={account.img} alt={account.title} />
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)] mb-2">
              {account.title}
            </h1>

            <p className="text-[var(--color-link)] mb-6 italic ">{account.rank}</p>

            <p className="text-[var(--color-text)] mb-6 leading-relaxed font-semibold flex items-center gap-2">
              <Link
                href={`/seller/${seller?.clerkId}`}
                className="flex items-center gap-2 hover:text-[var(--color-brand-yellow)] transition"
              >
                <img
                  src={seller?.image}
                  alt={seller?.name || "Seller"}
                  className="w-[40px] h-[40px] rounded-full border border-[var(--color-border)] hover:scale-105 transition-transform"
                />
                <span>{seller?.name}</span>
              </Link>
            </p>

            <p className="text-[var(--color-text)] mb-6 leading-relaxed font-semibold">
              UID: {account.uid}
            </p>
            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
              {account.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-center">
                <p className="text-[var(--color-brand-yellow)] font-semibold text-lg">
                  {account.stats?.level}
                </p>
                <p className="text-[var(--color-text)] text-sm">Level</p>
              </div>
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-center">
                <p className="text-[var(--color-brand-yellow)] font-semibold text-lg">
                  {account.stats?.matches}
                </p>
                <p className="text-[var(--color-text)] text-sm">Matches</p>
              </div>
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-center">
                <p className="text-[var(--color-brand-yellow)] font-semibold text-lg">
                  {account.stats?.kdr}
                </p>
                <p className="text-[var(--color-text)] text-sm">K/D Ratio</p>
              </div>
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-center">
                <p className="text-[var(--color-brand-yellow)] font-semibold text-lg">
                  {account.stats?.badges}
                </p>
                <p className="text-[var(--color-text)] text-sm">Badges</p>
              </div>
            </div>

            {/* Price & Buy Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-2xl font-bold text-[var(--color-brand-yellow)]">
                Rs. {account.price}
              </p>

              <button 
                onClick={() => setShowPayment(true)}
                className="bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] transition-transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentOptions 
          account={account} 
          onClose={() => setShowPayment(false)} 
        />
      )}
    </section>
  );
}