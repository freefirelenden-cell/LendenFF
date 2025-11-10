"use client"
import { useEffect, useState } from "react";
import { myContext } from "./context"
// import { getAccounts, getNewest } from "@/lib/apiClient";
// import { usePathname } from "next/navigation";

export default function DataProvider({ children }) {

//   const pathname = usePathname();
//   const [user, setUser] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isSignedIn, setIsSignedIn] = useState(false)
//   const [accounts, setAccounts] = useState([])
  const [featured, setFeatured] = useState([]);
  const [featuredIsLoaded, setFeaturedIsLoaded] = useState(false)
//   const [userCreatedAccounts, setUserCreatedAccounts] = useState([])
//   const [isLoadedUserCreatedAccounts, setIsLoadedUserCreatedAccounts] = useState(false)



  // useEffect(() => {
    // if (!pathname.startsWith("/accounts")) return;
  //   getAccounts()
  //     .then(data => {
  //       setAccounts(data)})
  //     .catch(err => console.log(err))
  // }, []);


  // useEffect(() => {
  //   getNewest(6)
  //     .then(data =>{ 
  //       setFeaturedIsLoaded(true)
  //       setFeatured(data)})
  //     .catch(err => console.log(err))
  // }, [])

  

// useEffect(() => {
//   if (!isLoaded || !user) return;
//   if (!pathname.startsWith("/dashboard")) return;
//   if (userCreatedAccounts.length > 0) return; // 👈 already loaded, skip re-fetch

//   getAccounts(user.id)
//     .then(data=>{
//       setUserCreatedAccounts(data)
//       setIsLoadedUserCreatedAccounts(true)
//     })
//     .catch(console.error);
// }, [pathname, isLoaded, user]);


  return (
    <myContext.Provider
      value={{
        // accounts, 
        featured,
        featuredIsLoaded,
        // userCreatedAccounts,
        // isLoadedUserCreatedAccounts,
        // user, isLoaded, isSignedIn
      }}>
      {children}
    </myContext.Provider>
  )
}
