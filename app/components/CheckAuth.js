"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CheckAuth({ children }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

   

    const isProtected = pathname.startsWith("/dashboard");

     if (status !== "loading"){
         if (isProtected && !session) {
             redirect("/api/auth/signin");
         }

     }

    return <>{children}</>
}
