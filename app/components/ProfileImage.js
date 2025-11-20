"use client";
import Image from "next/image";
import { useContext } from 'react'
import { myContext } from "../context/context";


export default function ProfileImage() {
    const { userData } = useContext(myContext);


    if(!userData) return;

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
