import { ShieldCheck, Zap, MailCheck, Headphones } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <MailCheck size={28} className="text-[var(--color-brand-yellow)]" />,
      title: "Gmail Verified",
      desc: "All accounts are Gmail-linked and verified for safe transfer.",
    },
    {
      icon: <ShieldCheck size={28} className="text-[var(--color-brand-yellow)]" />,
      title: "Secure Transfers",
      desc: "Protected process with step-by-step verification.",
    },
    {
      icon: <Zap size={28} className="text-[var(--color-brand-yellow)]" />,
      title: "Instant Delivery",
      desc: "Get your account details within minutes after payment.",
    },
    {
      icon: <Headphones size={28} className="text-[var(--color-brand-yellow)]" />,
      title: "24/7 Support",
      desc: "Friendly help whenever you need assistance.",
    },
  ];

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-16 rounded-2xl mt-12 shadow-lg border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-[var(--color-brand-yellow)] mb-10">
          Why Gamers Trust Us
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-brand-gold)] hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              {badge.icon}
              <h3 className="mt-4 font-semibold text-[var(--color-text)]">
                {badge.title}
              </h3>
              <p className="text-sm text-[var(--color-link)] mt-2 leading-snug">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
