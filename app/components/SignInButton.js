"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function SignInButton({ className = "" }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <LoadingSpinner size="sm" />
        );
    }

    return (
        <div className={`flex flex-col items-center w-max ${className}`}>

            {!session ? (
                <button
                    onClick={() => signIn("google")}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                >
                    SignIn
                </button>
            ) : (
                <button
                    onClick={() => signOut()}
                    className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                    SignOut
                </button>

            )}



        </div>
    );
}
