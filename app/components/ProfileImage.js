"use client";
import Image from "next/image";
import { useContext } from 'react'
import { myContext } from "../context/context";


export default function ProfileImage() {
    const { user } = useContext(myContext);


    if(!user) return;

    return (
        <div className="flex flex-col items-center w-max">
            <Image
                src={user?.image || "/images/avatar.svg"}
                alt={user?.name || "Profile Picture"}
                width={35}
                height={35}
                className="rounded-full object-cover"
            />
        </div>
    );
}
