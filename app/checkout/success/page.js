"use client"
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase</p>
        <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
        
        <div className="space-y-3">
          <Link 
            href="/dashboard/orders"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            View My Orders
          </Link>
          <Link 
            href="/accounts"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}