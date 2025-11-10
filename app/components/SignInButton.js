"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">

            {!session ? (
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => signIn("google")}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        SignIn
                    </button>
                </div>
            ) : (
                <div className="flex items-center ">
                    {session.user?.image && (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || "Profile Picture"}
                            width={40} // Fixed width
                            height={40} // Fixed height
                            className="rounded-full object-cover"
                        />
                    )}
                    <button
                        onClick={() => signOut()}
                        className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Sign out
                    </button>
                </div>
            )}



        </main>
    );
}
