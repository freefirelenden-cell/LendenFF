"use client";
import Image from "next/image";
import LoadingSpinner from "./ui/LoadingSpinner";


export default function ProfileImage({  userData, isLoadedUserData,}) {

    if (!isLoadedUserData) {
        return (
            <LoadingSpinner size="sm" />
        );
    }

    return (
        <div className="flex flex-col items-center w-max">
                <Image
                    src={userData?.image || "/images/avatar.svg"}
                    alt={userData?.name || "Profile Picture"}
                    width={35}
                    height={35}
                    className="rounded-full object-cover"
                />
        </div>
    );
}
