"use client"
import { useEffect, useState } from "react";
import { myContext } from "./context"
import {
    getAccounts,
} from "@/lib/apiClient";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";





export default function DataProvider({ children }) {

    const pathname = usePathname();
    const { data: session, status } = useSession();
    const user = session?.user
    const isLoadedUser = status !== "loading"
    const isSignedIn = status === "authenticated";
    const isUserExistInDB = session?.user.isUserExistInDB

 
    const [userCreatedAccounts, setUserCreatedAccounts] = useState([])
    const [isLoadedUserCreatedAccounts, setIsLoadedUserCreatedAccounts] = useState(false);



    useEffect(() => {
        if (!isLoadedUser || !user) return;
        if (!pathname.startsWith("/dashboard") && !isSignedIn) return;

        getAccounts(user.id, "", "")
            .then(data => {
                setUserCreatedAccounts(data.accounts)
                setIsLoadedUserCreatedAccounts(true)
            })
            .catch(console.error);
    }, [pathname, isLoadedUserCreatedAccounts, user]);


    return (
        <myContext.Provider
            value={{
                userCreatedAccounts,
                isLoadedUserCreatedAccounts,
                user,
                isLoadedUser,
                isSignedIn,
                session,
                status,
                signIn,
                signOut,
                isUserExistInDB,
            }}>
            {children}
        </myContext.Provider>
    )
}
