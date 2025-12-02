"use client"
import { getAccounts } from '@/lib/apiClient';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import LoadingSpinner from './ui/LoadingSpinner';
import AccountCard from './AccountCard';

export default function ListCards({
    id = "",
    isPagination = true,
    limit = 12,
}) {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAccounts(page);
    }, [page]);

    async function fetchAccounts(pageNum) {

        setLoading(true);
        const data = await getAccounts(id, pageNum, limit);
        setAccounts(data.accounts);
        setTotal(data.totalCount);
        setLoading(false);

    }

    const totalPages = Math.ceil(total / 12);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoadingSpinner size="xl" />
            </div>
        )
    }
    return (
        <section className="py-20">
            <div className="container mx-auto">

                {accounts.length == 0 ? (
                    <div className="py-20 text-center text-[var(--color-text-secondary)]">
                        Accounts not found
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {accounts.map(acc => (
                            <AccountCard key={acc._id} account={acc} />
                        ))}
                    </div>
                )}



                {loading && (
                    <div className="flex justify-center mt-6">
                        <LoadingSpinner size="lg" />
                    </div>
                )}

                {!loading && isPagination &&
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={(p) => setPage(p)}
                    />
                }

            </div>
        </section>
    )
}
