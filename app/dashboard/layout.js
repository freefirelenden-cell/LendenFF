"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, PlusCircle, Settings, User, BarChart2, Home } from "lucide-react";
import { myContext } from "../context/context";
import { useContext } from 'react'
import { useRouter } from "next/navigation";



export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { signOut } = useContext(myContext);
  const router = useRouter()

  const links = [
    { name: "Overview", href: "/dashboard", icon: <Home size={18} /> },
    { name: "My Accounts", href: "/dashboard/accounts", icon: <User size={18} /> },
    { name: "Add Account", href: "/dashboard/accounts/new", icon: <PlusCircle size={18} /> },
    { name: "Analytics", href: "/dashboard/stats", icon: <BarChart2 size={18} /> },
  ];


  const handleLogout = async () => {
  try {
    await signOut();
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">

      {/* 🌙 Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-brand-yellow)] mb-8 tracking-wide">
          Seller Panel
        </h2>

        <nav className="flex-1 space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition
                ${active
                    ? "bg-[#6c47ff] text-white"
                    : "hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)]"
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* 📱 Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex justify-around py-3 z-50">
        {links.slice(0, 4).map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center text-sm ${active ? "text-[#6c47ff]" : "text-[var(--color-text-secondary)]"
                }`}
            >
              {link.icon}
              <span className="text-[10px]">{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* 🧭 Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="hidden md:flex justify-between items-center px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <h1 className="text-xl font-semibold text-[var(--color-brand-yellow)]">
            Dashboard
          </h1>

        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
