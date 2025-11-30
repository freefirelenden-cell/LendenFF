"use client";

import { useRouter } from "next/navigation";
import { myContext } from "../context/context";
import { useContext } from "react"


export default function SignInButton({ className = "" }) {
    const { isSignedIn, signIn, signOut } = useContext(myContext)
    const router = useRouter()


    const handleClick = () =>{
        if(!isSignedIn){
            router.push("/")
            signIn("google")
        }else{
             signOut()
        }
    }

    return (
        <div className={`flex flex-col items-center w-max ${className}`}>

            <button
                onClick={handleClick}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
                {!isSignedIn ? "SignIn" : "SignOut"}
            </button>
        </div>
    );
}
