import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 mt-16 rounded-3xl shadow-xl text-center border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-[var(--color-brand-yellow)] mb-6">
          Ready to Join the Free Fire Marketplace?
        </h2>

        <p className="text-[var(--color-link)] max-w-2xl mx-auto mb-12">
          Buy verified Free Fire accounts instantly or sell your own safely — all in one trusted platform built for gamers like you.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/accounts"
            className="bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] hover:scale-105 transition-transform duration-300"
          >
            🔥 Browse Accounts
          </Link>

          <Link
            href="/dashboard/accounts/new"
            className="bg-[var(--color-bg)] border border-[var(--color-brand-yellow)] text-[var(--color-brand-yellow)] font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-yellow)] hover:text-black hover:scale-105 transition-transform duration-300"
          >
            💼 Sell Your Account
          </Link>
        </div>

        <p className="text-[var(--color-link)] text-sm mt-10">
          100% secure • Trusted by <span className="text-[var(--color-brand-gold)] font-semibold">1000+</span> gamers worldwide
        </p>
      </div>
    </section>
  );
}
