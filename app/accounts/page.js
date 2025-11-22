"use client"
import { useState, useEffect } from "react";
import AccountCard from "../components/AccountCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getAccounts } from "@/lib/apiClient";
import Pagination from "../components/Pagination";

export default function AccountsPage() {

  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts(page);
  }, [page]);

  async function fetchAccounts(pageNum) {
    setLoading(true);

    const data = await getAccounts("", pageNum, 12);
    setAccounts(data.accounts);
    setTotal(data.totalCount);

    setLoading(false);
  }

  const totalPages = Math.ceil(total / 12);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {accounts.map(acc => (
            <AccountCard key={acc._id} account={acc} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!loading && 
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
          />
        }

      </div>
    </section>
  );
}




