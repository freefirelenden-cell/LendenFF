"use client";

import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { myContext } from "@/app/context/context";
import { getAccountById } from "@/lib/apiClient";
import { getOrderByAccountId } from "@/lib/payment";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function AccountDetailsPage() {
  const { user, isLoadedUser } = useContext(myContext)
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [isLoadedOrder, setIsLoadedOrder] = useState(false)
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)
  const [isShowingPassword, setIsShowingPassword] = useState(false)

  useEffect(() => {
    getOrderByAccountId(params.id)
      .then(data => {
        setOrder(data.order)
        setIsLoadedOrder(true)
      }).catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (!user || !order || user?.id != order?.buyerId) return
    getAccountById(order.accountId, true)
      .then(data => {
        setEmail(data.email);
        setPassword(data.password)
      })
      .catch(err => {
        console.error(err)
      })
  }, [user, order])









  if (!isLoadedUser || isLoadedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" showText={true} text="Loading checkout..." />
      </div>
    );
  }

  if (!order && isLoadedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
        </div>
      </div>
    );

  }

  if (user?.id != order?.buyerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Sorry you are not purchased this account</h1>
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Account Details
        </h1>

        {/* Gmail */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-1">Email (Gmail)</label>
          <div className="bg-gray-100 p-3 rounded-lg border text-gray-800 font-semibold">
            {email}
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-1">Password</label>
          <div className="bg-gray-100 p-3 rounded-lg border flex items-center justify-between">
            <span id="passField" className="text-gray-800 font-semibold">{isShowingPassword ? password : "********"}</span>

            <button
              onClick={() => setIsShowingPassword(prev => !prev)}
              className="text-blue-600 font-semibold hover:underline text-sm"
            >
              Show
            </button>
          </div>
        </div>

        {/* Seller Number */}
        <div className="mb-2">
          <label className="block text-gray-600 font-medium mb-1">Seller Number</label>
          <div className="bg-gray-100 p-3 rounded-lg border text-gray-800 font-semibold">
            {order?.sellerPhone}
          </div>
        </div>

      </div>
    </div>
  );
}
