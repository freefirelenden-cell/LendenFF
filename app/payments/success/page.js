"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Yahan payment verification kar sakte ho
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4">Verifying payment...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your account purchase is complete.</p>
        <Link 
          href="/dashboard/accounts"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Go to My Accounts
        </Link>
      </div>
    </div>
  );
}