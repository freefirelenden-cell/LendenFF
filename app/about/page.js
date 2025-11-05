import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 mt-16 rounded-3xl shadow-xl border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-[var(--color-brand-yellow)] mb-6">
            About FreeFireStore
          </h2>

          <p className="text-[var(--color-link)] mb-6 leading-relaxed">
            <strong>FreeFireStore</strong> is the trusted online marketplace for
            buying and selling verified <strong>Free Fire accounts</strong>. We
            created this platform for gamers who want to level up fast — without
            worrying about scams or unsafe trades.
          </p>

          <p className="text-[var(--color-link)] mb-6 leading-relaxed">
            Every account listed here is manually verified by our team. We
            ensure Gmail ownership proof, rank validation, and smooth, secure
            delivery — so you can focus on what matters most: <strong>winning matches</strong>.
          </p>

          <p className="text-[var(--color-link)] leading-relaxed">
            Our goal is to make Free Fire trading <strong>simple, transparent,</strong> 
            and <strong>100% secure</strong> for every player across the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">💎</span>
              <p className="text-sm text-[var(--color-link)]">Verified Sellers</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">⚡</span>
              <p className="text-sm text-[var(--color-link)]">Instant Delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">🛡️</span>
              <p className="text-sm text-[var(--color-link)]">Secure Transactions</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-banner.webp"
            alt="Free Fire gaming marketplace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    </section>
  );
}
