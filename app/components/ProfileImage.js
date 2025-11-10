"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import SignInButton from "./SignInButton";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function ProfileImage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <LoadingSpinner size="sm" />
        );
    }

    return (
        <div className="flex flex-col items-center w-max">
            {session?.user?.image ? (
                <Image
                    src={session.user.image}
                    alt={session.user.name || "Profile Picture"}
                    width={35} // Fixed width
                    height={35} // Fixed height
                    className="rounded-full object-cover"
                />
            ) : (
                <SignInButton />
            )}

        </div>
    );
}
