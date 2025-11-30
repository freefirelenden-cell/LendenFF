"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SignInButton from "./SignInButton";
import ProfileImage from "./ProfileImage";
import { myContext } from "../context/context";
import { useContext } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user } = useContext(myContext)


    const links = [
        { label: "Home", path: "/" },
        { label: "Accounts", path: "/accounts" },
        { label: "About", path: "/about" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "UpgradeAccount", path: "/upgradeAccount" },
    ];




    function NavLinks({ links }) {
        return links.map(({ label, path }) => {
            if (path == "/dashboard" && user?.role != "seller") return;
            if (path == "/upgradeAccount" && user?.role != "user") return;
            return <Link
                key={label}
                href={path}
                className="text-[var(--color-link)] hover:text-[var(--color-hover)] transition-colors duration-200"
            >
                {label}
            </Link>
        });
    }




    return (
        <nav className="bg-[var(--color-bg)] text-[var(--color-text)] sticky top-0 z-50 shadow-md border-b border-[var(--color-border)] transition-colors duration-300">
            <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                {/* 🔹 Logo */}
                <Link
                    href="/"
                    prefetch={false}
                    className="text-2xl font-extrabold bg-gradient-to-r from-[var(--color-brand-yellow)] to-[var(--color-brand-gold)] text-transparent bg-clip-text"
                >
                    LendenFF
                </Link>

                {/* 🔹 Desktop Menu */}
                <div className="hidden md:flex space-x-8 font-medium">
                    <NavLinks links={links} />
                </div>


                {/* 🔹 Right Controls */}
                <div className="flex gap-2">
                    <div className="flex items-center gap-4">


                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden text-[var(--color-hover)] focus:outline-none p-[5px]"
                        >
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        <SignInButton />
                        <ProfileImage />

                    </div>


                </div>
            </div>

            {/* 🔹 Mobile Menu */}
            <div
                className={`
        md:hidden overflow-hidden 
        bg-[var(--color-bg)] border-t border-[var(--color-border)]
        flex flex-col space-y-4 p-4
        transition-all duration-[1000ms] ease-in-out
        ${open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 p-0"}
    `}
            >
                <NavLinks links={links} />
            </div>



        </nav>
    );
}
