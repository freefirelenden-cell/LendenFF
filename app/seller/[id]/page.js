'use client'


import { getAccounts, getUserById } from "@/lib/apiClient";
import AccountCard from "@/app/components/AccountCard";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import Image from "next/image";

export default function SellerPage({ params }) {
    const [accounts, setAccounts] = useState([])
    const [sellerLabel, setSellerLabel] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = use(params)


    useEffect(() => {
        async function load() {
            try {
                const seller = await getUserById(id);
                setSellerLabel(seller.user);
                const acc = await getAccounts(id);
                setAccounts(acc.accounts);
            } catch (err) {
                console.error("Error loading seller or accounts:", err);
            } finally {
                setLoading(false);
            }
        }
        load()
    }, [id])



    if (loading) {
        return <div className="h-[80vh] flex justify-center">
            <LoadingSpinner size="xl" showText={true} />
        </div>
    }


    return (
        <section className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen py-16 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <Link href="/accounts" className="text-[var(--color-brand-blue)] hover:underline mb-6 inline-block">
                    ← Back to Listings
                </Link>

                <header className="mb-8">

                    <div className="flex items-center gap-1">
                        <Image
                            src={sellerLabel.image}
                            alt={sellerLabel.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                            unoptimized={false}
                        />                        <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)]">
                            {sellerLabel.name}
                        </h1>
                    </div>
                    <p className="text-[var(--color-link)] mt-2">
                        {accounts.length} listing{accounts.length !== 1 ? "s" : ""} found
                    </p>
                </header>

                {accounts.length === 0 ? (
                    <div className="py-20 text-center text-[var(--color-text-secondary)]">
                        No accounts found for this seller.
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {accounts.map((acc) => (
                            // AccountCard expects certain props; adapt as needed
                            <AccountCard
                                key={acc._id || acc.id}
                                account={acc}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>

    );
}
