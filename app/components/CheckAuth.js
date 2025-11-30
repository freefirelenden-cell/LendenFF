"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CheckAuth({ children }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

   


     if (status !== "loading"){
         if (pathname.startsWith("/dashboard") && !session) {
             redirect("/api/auth/signin");
         }
         if (pathname.startsWith("/checkout") && !session) {
             redirect("/api/auth/signin");
         }

     }

    return <>{children}</>
}
