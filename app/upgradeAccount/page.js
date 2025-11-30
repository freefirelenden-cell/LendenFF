"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { myContext } from "../context/context";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";



export default function UpgradeAccountPage() {
  const { update } = useSession();
  const { user } = useContext(myContext);
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);


  // Set initial phone when user is loaded
  useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    if (phone.length != 11) {
      setLoading(false)
      alert("Number must contain only 11 digits")
      return
    }
    const res = await fetch(`/api/auth/user/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, role: "seller" }),
    });

    setLoading(false);
    if (res.ok) {
      await update();

      alert("Seller account upgraded successfully!");
      router.push("/dashboard");
    }


  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-12">
      <div className="w-full max-w-lg bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[var(--color-brand-yellow)] mb-4">
          Upgrade Your Account to Seller
        </h1>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6 leading-relaxed">
          Apna Easypaisa ya JazzCash wala number enter karein.
          Hum OTP verify nahi karte.
          Number daalne ke baad please confirm kar lein,
          kyun ke agar number galat hua toh zimmedari hamari nahi hogi.
        </p>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Easypaisa/JazzCash Account Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XX-XXXXXXX"
              minLength={11}
              maxLength={11}
              className="no-arrow w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
              required
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--color-brand-yellow)] text-black font-semibold rounded-xl hover:bg-[var(--color-brand-gold)] transition"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
