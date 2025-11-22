"use client"
import { useEffect, useState } from "react";
import { myContext } from "./context"
import {
    getNewest,
    getAccounts,
} from "@/lib/apiClient";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";





export default function DataProvider({ children }) {

    const pathname = usePathname();
    const { data: session, status } = useSession();
    const userData = session?.user
    const isLoadedUserData = status !== "loading"
    const isSignedIn = status === "authenticated";

    const [latestAccounts, setLatestAccounts] = useState([]);
    const [isLoadedLatestAccounts, setIsLoadedLatestAccounts] = useState(false)
    const [userCreatedAccounts, setUserCreatedAccounts] = useState([])
    const [isLoadedUserCreatedAccounts, setIsLoadedUserCreatedAccounts] = useState(false);






    useEffect(() => {
        if (pathname !== "/") return;
        getNewest(6)
            .then(data => {
                setIsLoadedLatestAccounts(true)
                setLatestAccounts(data)
            })
            .catch(err => console.log(err))
    }, [pathname])



    useEffect(() => {
        if (!isLoadedUserData || !userData) return;
        if (!pathname.startsWith("/dashboard")) return;
        if (userCreatedAccounts.length > 0) return; // 👈 already loaded, skip re-fetch

        getAccounts(userData.id)
            .then(data => {
                setUserCreatedAccounts(data)
                setIsLoadedUserCreatedAccounts(true)
            })
            .catch(console.error);
    }, [pathname, isLoadedUserCreatedAccounts, userData]);


    return (
        <myContext.Provider
            value={{
                latestAccounts,
                isLoadedLatestAccounts,
                userCreatedAccounts,
                isLoadedUserCreatedAccounts,
                userData,
                isLoadedUserData,
                isSignedIn,
                session,
                status,
                signIn,
                signOut,
            }}>
            {children}
        </myContext.Provider>
    )
}
