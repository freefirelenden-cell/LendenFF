"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getAccountById, deleteAccount, deleteImage } from "@/lib/apiClient";
import { myContext } from "@/app/context/context";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import Progress from "@/app/components/ui/Progress";

export default function AccountDetailPage() {
  const { userData, isLoadedUserData } = useContext(myContext)
  const params = useParams();
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDeleteing, setIsDeleteing] = useState(false)

  // ✅ Fetch account details by ID
  useEffect(() => {
    if (!params?.id) return;
    getAccountById(params.id)
      .then((data) => {
        setAccount(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);


  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this account? This action cannot be undone.");
    if (!confirmed) return;
    setIsDeleteing(true)
    setProgress(25);

    try {
      await Promise.all(account.img.map(img => deleteImage(img)));
      setProgress(60);
      await deleteAccount(params?.id)
      setProgress(95)
      router.push("/dashboard/accounts")
    } catch (error) {
      console.log(error)
    }finally{
      setIsDeleteing(false)
    }
  };





  if (!isLoadedUserData || loading) {
    return <LoadingSpinner size="xl" showText={true} text="Loading account details..." />
  }
  if (!account) {
    return <div className={`w-full h-full flex justify-center items-center`}>Account not found ❌</div>
  }
   if (isDeleteing) {
    return  <Progress size="md" showText={true} text="Loading..." progress={progress} className="mb-4 py-20"/>
  }


  // ✅ Ownership check
  const isOwner = userData?.id === account.createdBy;
  const isSold = account.status !== "sold"

 
  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-10 px-4">
      <div className="max-w-4xl mx-auto border border-[var(--color-border)] rounded-2xl shadow-lg bg-[var(--color-bg)] p-8">
        {/* 🔹 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)]">
            {account.title}
          </h1>
          {isOwner && isSold && (
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => router.push(`/dashboard/accounts/${account._id}/edit`)}
                className="px-4 py-2 bg-[var(--color-brand-blue)] text-white rounded-lg hover:opacity-90 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Image Gallery */}
        {account.img?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {account.img.map((img, i) => (
              <div
                key={i}
                className="relative w-full h-48 rounded-xl overflow-hidden border border-[var(--color-border)]"
              >
                <Image
                  src={img.url}
                  alt={`account-img-${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)] mb-8">
            No images uploaded.
          </p>
        )}

        {/* 🔹 Info Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <InfoCard label="Rank" value={account.rank} />
          <InfoCard label="Level" value={account.stats.level} />
          <InfoCard label="Matches" value={account.stats.matches} />
          <InfoCard label="K/D Ratio" value={account.stats.kdr} />
          <InfoCard label="Badges" value={account.stats.badges} />
          <InfoCard label="Price (PKR)" value={`Rs. ${account.price}`} />
        </div>

        {/* 🔹 Description */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-[var(--color-brand-blue)]">
            Account Description
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {account.description}
          </p>
        </div>

        {/* 🔹 Seller Info */}
        <div className="border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-muted)]">
          <p>Seller ID: {account.userId}</p>
          <p>UID: {account.uid}</p>
          <p>Email: {account.email}</p>
          <p>
            Listed on:{" "}
            {new Date(account.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

// 🔹 Small reusable Info Card
function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] text-center">
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      <p className="text-lg font-semibold text-[var(--color-brand-yellow)]">
        {value}
      </p>
    </div>
  );
}
