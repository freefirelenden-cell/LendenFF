import Link from "next/link";
import ListCards from "./ListCards";


export default function HomeSection() {


  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 transition-colors duration-300">
      {/* 🦸 Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[var(--color-brand-yellow)] mb-4">
          Find Your Perfect Free Fire Account 🔥
        </h1>
        <p className="text-[var(--color-link)] max-w-2xl mx-auto mb-6">
          Verified, safe, and instant — explore top Free Fire accounts trusted by
          1000+ gamers worldwide.
        </p>
        <Link
          href="/accounts"
          prefetch={false}
          className="inline-block bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] hover:scale-105 transition-transform"
        >
          Browse All Accounts
        </Link>
      </div>

      {/* 🎮 Featured Accounts */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[var(--color-brand-yellow)] mb-10 text-center">
          Featured Accounts
        </h2>


        <ListCards limit={6} isPagination={false} />

        {/* 🔘 Explore More Button */}
        <div className="text-center mt-12">
          <Link
            href="/accounts"
            prefetch={false}
            className="inline-block bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] hover:scale-105 transition-transform"
          >
            Explore More Accounts →
          </Link>
        </div>
      </div>
    </section>
  );
}
