"use client";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Success!</h1>
        <p className="text-gray-600">Order placed successfully</p>
        <Link href="/" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}