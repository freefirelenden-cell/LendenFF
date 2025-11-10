"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import SignInButton from "./SignInButton";
import ProfileImage from "./ProfileImage";


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const links = [
        { label: "Home", path: "/" },
        { label: "Accounts", path: "/accounts" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Dashboard", path: "/dashboard" },
    ]

    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    return (
        <nav className="bg-[var(--color-bg)] text-[var(--color-text)] sticky top-0 z-50 shadow-md border-b border-[var(--color-border)] transition-colors duration-300">
            <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                {/* 🔹 Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-[var(--color-brand-yellow)] to-[var(--color-brand-gold)] text-transparent bg-clip-text"
                >
                    FreeFireStore
                </Link>

                {/* 🔹 Desktop Menu */}
                <div className="hidden md:flex space-x-8 font-medium">
                    {links.map(({ label, path }) => (
                        <Link
                            key={label}
                            href={path}
                            className="text-[var(--color-link)] hover:text-[var(--color-hover)] transition-colors duration-200"
                        >
                            {label}
                        </Link>
                    ))}
                </div>


                {/* 🔹 Right Controls */}
                <div className="flex gap-2">
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-[var(--color-border)]/40 transition"
                        >
                            {darkMode ? (
                                <Sun className="text-[var(--color-brand-yellow)]" size={22} />
                            ) : (
                                <Moon className="text-[var(--color-brand-blue)]" size={22} />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden text-[var(--color-hover)] focus:outline-none p-[5px]"
                        >
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                        <ProfileImage/>
                    </div>


                </div>
            </div>

            {/* 🔹 Mobile Menu */}
                {open && (
                    <div className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] flex flex-col space-y-4 p-4">
                        {links.map(({ label, path }) => (
                            <Link
                                key={label}
                                href={path}
                                onClick={() => setOpen(false)}
                                className="text-[var(--color-link)] hover:text-[var(--color-hover)] transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                        <SignInButton/>
                    </div>
                )}

        </nav>
    );
}
