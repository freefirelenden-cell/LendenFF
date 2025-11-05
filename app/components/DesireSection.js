import { Trophy, Star, Target, Gamepad2 } from "lucide-react";

export default function DesireSection() {
  const points = [
    {
      icon: <Trophy size={30} className="text-[var(--color-brand-yellow)]" />,
      title: "Instantly Upgrade Your Rank",
      desc: "Start playing at Diamond or Heroic level — no grind, just glory.",
    },
    {
      icon: <Star size={30} className="text-[var(--color-brand-yellow)]" />,
      title: "Exclusive Skins & Bundles",
      desc: "Show off rare items that most players can only dream of.",
    },
    {
      icon: <Target size={30} className="text-[var(--color-brand-yellow)]" />,
      title: "Stand Out in Every Match",
      desc: "Gain respect and recognition — become the pro in your squad.",
    },
    {
      icon: <Gamepad2 size={30} className="text-[var(--color-brand-yellow)]" />,
      title: "Ready to Play Anytime",
      desc: "All accounts are battle-ready with Gmail verification done.",
    },
  ];

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 mt-12 rounded-3xl shadow-xl border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[var(--color-brand-yellow)] mb-8">
          Unlock Your Gaming Dream
        </h2>

        <p className="max-w-2xl mx-auto text-[var(--color-link)] mb-12">
          Skip the grind — own a premium Free Fire account and jump straight
          into action. Feel the power, style, and confidence of a pro player.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-[var(--color-bg)] rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-md hover:scale-105 hover:border-[var(--color-brand-gold)] transition-all duration-300"
            >
              {item.icon}
              <h3 className="mt-4 font-semibold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-link)] mt-2 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <a
          href="/accounts"
          className="inline-block mt-12 bg-[var(--color-brand-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-brand-gold)] transition-transform hover:scale-105"
        >
          Browse Premium Accounts
        </a>
      </div>
    </section>
  );
}
